const db = require("../models");
const Comments = db.comments;
const Op = db.Sequelize.Op;

// CREATE AND SAVE NEW COMMENT
exports.createComment = (req, res) => {
  // Validate request
  if (!req.body.comment) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // CREATE A COMMENT
  const comment = {
    user_id: req.body.user_id,
    post_id: req.body.post_id,
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



// FIND ALL COMMENTS 
exports.findAllComments = (req, res, next) => {
  Comments.findAll().then(
    (comments) => {
      res.status(200).json(comments);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
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