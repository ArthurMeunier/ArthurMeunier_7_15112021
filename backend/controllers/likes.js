const db = require("../models");
const Likes = db.likes;
// const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

// // FONCTION LIKE
// exports.likePost = (req, res, next) => {
//   const userId = req.userId;
//   console.log(userId);
//   Posts.findOne({
//     where: {
//       id: req.params.id
//     }
//   }).then(
//     (post) => {
//       if (post) {
//         res.status(200).json(post);
//         console.log(post);
//       } else {
//         res.status(404).json({
//           error: "Not found"
//         });
//       }
//     }
//   ).catch(
//     (error) => {
//       res.status(500).json({
//         error: error
//       });
//     }
//   );
// };



