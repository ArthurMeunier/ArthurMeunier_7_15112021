const db = require("../models");
const Comments = db.comments;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

// CREATE AND SAVE NEW COMMENT
exports.createComment = (req, res) => {
  // Validate request
  if (!req.body.comment) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const userId = req.userId;

  // Create a comment
  const comment = {
    userId: userId,
    postId: req.body.postId,
    comment: req.body.comment
  };

  // Save comment in the database
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

// GET ALL COMMENTS
exports.getAllComments = (req, res) => {
  // On lit le post_id dans l'url
  const postId = req.query.postId
  // On prépare la requête SQL pour récupérer les commentaires du post
  const sql = `SELECT c.id, c.comment, u.firstname, u.lastname, u.imageURL, c.createdAt FROM groupomania.comments c INNER JOIN groupomania.posts p ON c.postId = p.id INNER JOIN groupomania.users u ON c.userId = u.id WHERE p.id = ${postId} ORDER BY c.createdAt ASC`;
  sequelize.query(sql, { type: QueryTypes.SELECT }).then(comments =>{
    res.status(200).json(comments);
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  })
};

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