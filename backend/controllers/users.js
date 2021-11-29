const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
// const usersUtils = require("../utils/users.utils.js");
const jwt = require("jsonwebtoken");

// SIGN IN


// CREATE USER 
exports.createUser = (req, res, next) => {
  // On crypte le mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // On crée un nouvel user avec le mot de passe crypté et le mail de la requête
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.create()
      // On enregistre l'user dans la BDD
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// // Créer un compte
// exports.createUser = async (req, res, next) => {
//   console.log(req.body);
//   if (!req.body.email || req.body.email == "") {
//     return res.status(400).json({
//       error: "Email is required"
//     })
//   }
//   let user = await Users.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//   if (user) {
//     return res.status(400).json({
//       error: "Email already taken"
//     })
//   }
//   var activationKey = usersUtils.createActivationToken();
//   Users.create({
//       ...req.body,
//       activation_key: activationKey
//     }).then( async (user) => {
//         if (user) {
//           await UserConnexion.create({
//             id: user.id,
//             email: req.body.email,
//             password: usersUtils.hashPassword(req.body.password)
//           })

//           res.status(201).json(user);
//         } else {
//           res.status(404).json({
//             error: "Not found"
//           });
//         }
//       })
//     .catch(
//       (error) => {
//         res.status(500).json({
//           error: error
//         });
//       }
//     );
// };

// FIND ALL USERS 
exports.findAllUsers = (req, res, next) => {
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


// FIND  ONE USER 
exports.findOneUser = (req, res, next) => {
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

// UPDATE USER 
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

// DELETE USER 
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