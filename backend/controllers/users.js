const db = require("../models");
const Users = db.users;
const sequelize = db.sequelize;
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const fs = require('fs');

// LOGIN USER (POST)
exports.loginUser = (req, res) => {
  Users.findOne({
      where: { email: req.body.email }, // search for user with same email address in db
  })
  .then(user => {
      // if user not found in db
      if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // if user found
      // compare hashes to check if they come from the same string (password)
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
          // if they don't match
          if(!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          // if they match
          res.status(200).json({ // return
              userId: user.userId,
              admin: user.admin,
              token: jwt.sign(
                  { userId: user.id },
                  "RANDOM_TOKEN_SECRET",
                  { expiresIn: '24h' }
              )
          });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));

  async () => {
      await sequelize.close();
  };
};

// CREATE USER (POST)
exports.createUser = (req, res) => {
  //Hachage du mot de passe
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      //Création du nouvel utilisateur
      Users.create({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imageURL: req.body.imageURL,
        password: hash
      })
        .then(() => {
          res.status(201).json({
            message: "Utilisateur créé !",
          });
        })
        .catch((error) =>
          res.status(400).json({
            error,
            message: "Adresse mail déjà utilisée"
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error: "erreur",
      })
    );
};

// FIND ALL USERS (GET)
exports.getAllUsers = async (req, res, next) => {
  const currentUserId = req.userId;
  const currentUsers = await sequelize.query ("SELECT * FROM users WHERE id=? AND admin=1", {replacements : [currentUserId] , type: QueryTypes.SELECT});
  if (currentUsers.length == 0) return res.status(401).json({message: 'Accès interdit'});
  Users.findAll().then(
    (users) => {
      res.status(200).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// FIND  ONE USER (GET)
exports.getOneUser = (req, res, next) => {
  Users.findOne({
    where: {
      id: req.params.id
    }
  }).then(
    (user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          error: "Not found"
        });
      }
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
};

// GET PROFILE (GET)
exports.getProfile = (req, res) => {
  const userId = req.userId;
  // On prépare la requête SQL pour récupérer les commentaires du post
  const sql = `SELECT u.id, u.firstname, u.lastname, u.email, u.imageURL FROM groupomania.users u WHERE u.id = ${userId}`
  sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT }).then(profile =>{
    res.status(200).json(profile);
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  })
};

// UPDATE USER (PUT)
exports.updateUser = (req, res, next) => {
  Users.findOne({
    where: {
      id: req.params.id
    }
  }).then(
    (user) => {
      if (user) {
        if (user.imageURL!=req.body.imageURL) {
          if (user.imageURL!="default.png") {
          if (fs.existsSync('../frontend/public/images/'+ user.imageURL)) {
            fs.unlinkSync('../frontend/public/images/'+ user.imageURL);
          }
          }

        }
        for (var key in req.body) {
          user[key] = req.body[key]
        }
        user.save()
          .then((user) => res.status(200).json(user))
          .catch((error) => res.status(500).json({
            error: error
          }))
      } else {
        res.status(404).json({
          error: "Not found"
        });
      }
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
};

// DELETE USER (DELETE)
exports.deleteUser = async (req, res, next) => {
  const currentUserId = req.userId;
  const currentUsers = await sequelize.query ("SELECT * FROM users WHERE id=? AND admin=1", {replacements : [currentUserId] , type: QueryTypes.SELECT});
  if (currentUsers.length == 0) {
     res.status(401).json({message: 'Accès interdit'});
     return;
  } 
  const userId = req.params.id;
  
  if (await deleteUserCascade(userId)) {
    res.send("Ok");
  }
  else {
    res.status(404).json({message: 'Utilisateur non trouvé'});
  }
};


// DELETE ME
exports.deleteMe = async (req, res) => {
  const userId = req.userId;
  if (await deleteUserCascade(userId)) {
    res.send("Ok");
  }
  else {
    res.status(404).json({message: 'Utilisateur non trouvé'});
  }
};

async function deleteUserCascade(userId)
{
  const users = await sequelize.query ("SELECT * FROM users WHERE id=? AND admin=0", {replacements : [userId] , type: QueryTypes.SELECT});
  if (users.length == 0) {
     return false;
  } 
  const posts = await sequelize.query ("SELECT imageURL FROM posts WHERE userId=?", {replacements : [userId] , type: QueryTypes.SELECT});
  if (posts.length > 0) {
    await sequelize.query ("DELETE t1, t2 FROM likes t1 INNER JOIN posts t2 ON t1.postId = t2.id WHERE t2.userId=?", {replacements : [userId] , type: QueryTypes.DELETE});
    await sequelize.query ("DELETE t1, t2 FROM comments t1 INNER JOIN posts t2 ON t1.postId = t2.id WHERE t2.userId=?", {replacements : [userId] , type: QueryTypes.DELETE});
    // await sequelize.query ("DELETE FROM comments WHERE userId=?", {replacements : [userId] , type: QueryTypes.DELETE});

    posts.forEach(post => {

      if (fs.existsSync('../frontend/public/images/'+ post.imageURL)) {
        fs.unlinkSync('../frontend/public/images/'+ post.imageURL);
      }
    });
    await sequelize.query ("DELETE FROM posts WHERE userId=?", {replacements : [userId] , type: QueryTypes.DELETE});

  }
  await sequelize.query ("DELETE FROM likes WHERE userId=?", {replacements : [userId] , type: QueryTypes.DELETE});
  await sequelize.query ("DELETE FROM comments WHERE userId=?", {replacements : [userId] , type: QueryTypes.DELETE});
  await sequelize.query ("DELETE FROM users WHERE id=?", {replacements : [userId] , type: QueryTypes.DELETE});
return true;
}