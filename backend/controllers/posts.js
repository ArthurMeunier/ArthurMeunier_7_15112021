const db = require("../models");
const Posts = db.posts;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const jwt = require('jsonwebtoken');

// CREATE AND SAVE NEW POST
exports.createPost = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const userId = req.userId;


  // CREATE A POST
  const post = {
    userId: userId,
    title: req.body.title,
    description: req.body.description,
    imageURL: req.body.imageURL,
  };

    // Save Post in the database
  Posts.create(post)
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

// FIND ALL POSTS 
exports.getAllPosts = (req, res, next) => {
  Posts.findAll({
    // include: Comments
  }).then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


// FIND ONE POST
exports.getOnePost = (req, res, next) => {
  Posts.findOne({
    where: {
      id: req.params.id
    }
  }).then(
    (post) => {
      if (post) {
        res.status(200).json(post);
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


// UPDATE POST
exports.updatePost = (req, res, next) => {
  Posts.findOne({
    where: {
      id: req.params.id
    }
  }).then(
    (post) => {
      if (post) { 
        for (var key in req.body) {
          post[key] = req.body[key]
        }
        post.save()
          .then((post) => res.status(200).json(post))
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


// DELETE POST
exports.deletePost = (req, res, next) => {
  Posts.destroy({
    where: {
      id: req.params.id
    }
  }).then(
    (post) => {
      if (post) {
        res.status(200).json(post);
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