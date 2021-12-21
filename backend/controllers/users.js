const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


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
              token: jwt.sign(
                  { userId: user.id },
                  "RANDOM_TOKEN_SECRET",
                  { expiresIn: '24h' }
              )
          });
          console.log(user.id);
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
exports.getAllUsers = (req, res, next) => {
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

// UPDATE USER (PUT)
exports.updateUser = (req, res, next) => {
  Users.findOne({
    where: {
      id: req.params.id
    }
  }).then(
    (user) => {
      if (user) {
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

// DELETE USER (DESTROY)
exports.deleteUser = (req, res, next) => {
  Users.destroy({
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