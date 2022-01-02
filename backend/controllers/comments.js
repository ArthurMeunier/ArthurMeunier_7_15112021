const db = require("../models");
const Comments = db.comments;
// const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

// // USER ID

// const userID = (req) => {
//   const token = req.headers.authorization.split(' ')[1];
//   console.log(token);
//   const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//   const id = decodedToken.user_id;
//   return id;
// }

// CREATE AND SAVE NEW COMMENT
exports.createComment = (req, res) => {
  console.log("controllerbegin");
  // Validate request
  if (!req.body.comment) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const userId = req.userId;

  // CREATE A COMMENT
  const comment = {
    userId: userId,
    postId: req.body.postId,
    comment: req.body.comment
  };

  // Save Tutorial in the database
  Comments.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};





// // FIND ALL COMMENTS 
// exports.getAllComments = (req, res, next) => {
//   Comments.findAll().then(
//     (comments) => {
//       res.status(200).json(comments);
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };

// exports.getAllComments = (req, res) => {
//     const postId = req.params.id
//     const sql = `SELECT c.comment, u.firstname, u.lastname, c.createdAt FROM groupomania.comments c INNER JOIN groupomania.posts p ON c.post_id = p.id INNER JOIN groupomania.users u ON c.user_id = u.id WHERE p.id = ${postId}`;
//     Comments.query(sql, (err, result) => {
//       if (err) {
//         res.status(404).json({ err });
//         throw err;
//       }
//       res.status(200).json(result);
//     });
//   };  

// exports.getAllComments = (req, res, next) => {
//   Comments.findAll({
//       attributes: ['id', 'comment', 'user_id', 'createdAt'],
//       include: [
//           {
//               model: db.Users,
//               attributes: ['id', 'firstname', 'lastname']
//           },
//           {
//               model: db.Posts,
//               attributes: ['id']
//           }
//       ],
//       where: {id: req.params.id}
//   })
//   .then((comments) => {
//       res.status(200).json(comments)
//   })
//   .catch((error) => {
//       res.status(400).json({error})
//   })
// }


// exports.getAllComments = (req, res, next) => {
//   Comments.findAll({
//     attributes: ['id', 'comment', 'user_id', 'post_id', 'createdAt'],
//     include: [
//       {
//           model: db.Users,
//           attributes: ['id', 'firstname', 'lastname']
//       },
//       {
//           model: db.Posts,
//           attributes: ['id']
//       }
//     ],
//     where: {
//       post_id: req.query.post_id
//     }
//   }).then(
//     (comments) => {
//       if (comments) {
//         res.status(200).json(comments);
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

// exports.getAllComments = (req, res, next) => {
//   Comments.findAll({
//     attributes: ['id', 'comment', 'user_id', 'post_id', 'createdAt'],
//     include: [
//       {
//           model: Posts,
//           attributes: ['firstname', 'lastname']
//       }
//     ],
//     where: {
//       id : req.query.post_id
//     }
//   }).then(
//     (comments) => {
//       if (comments) {
//         res.status(200).json(comments);
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

exports.getAllComments = (req, res) => {
  // On lit le post_id dans l'url
  const postId = req.query.postId
  // On prépare la requête SQL pour récupérer les commentaires du post
  const sql = `SELECT c.comment, u.firstname, u.lastname, c.createdAt FROM groupomania.comments c INNER JOIN groupomania.posts p ON c.postId = p.id INNER JOIN groupomania.users u ON c.userId = u.id WHERE p.id = ${postId}`;
  sequelize.query(sql, { type: QueryTypes.SELECT }).then(comments =>{
    res.status(200).json(comments);
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  })
};

// exports.getAllComments = (req, res) => {
//   console.log(req.query.post_id);

//   Comments.findAll({
//     attributes: ['id', 'comment', 'createdAt'],
//     include : [{
//       model: db.Posts,
//       required: true,
//       where: {
//          id: req.query.post_id
//       }
//     },{
//       model: db.Users,
//       attributes: ['firstname', 'lastname']
//     }]
//   }).then(
//     (comments) => {
//       if (comments) {
//         res.status(200).json(comments);
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

// DELETE COMMENT
exports.deleteComment = (req, res, next) => {
  Comments.destroy({
    where: {
      id: req.params.id
    }
  }).then(
    (comment) => {
      if (comment) {
        res.status(200).json(comment);
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


exports.countComments = (req, res) => {
  // On lit le post_id dans l'url
  const postId = req.query.postId
  // On prépare la requête SQL pour récupérer les commentaires du post
  const sql = `SELECT COUNT(id) FROM groupomania.comments c WHERE c.postId = ${postId}`;
  sequelize.query(sql, { type: QueryTypes.SELECT }).then(count =>{
    res.status(200).json(count);
    console.log(count);
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  })
};