const db = require("../models");
const Posts = db.posts;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
    imageURL: req.body.imageURL
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

// GET ALL POSTS
exports.getAllPosts = async (req, res, next) => {
  const sql = `SELECT a.*, a.like, b.firstname, b.lastname, b.imageURL AS userimageURL, IFNULL(c.countComments,0) AS countComments,
  IFNULL(d.countLikes,0) AS countLikes
  FROM posts a
  INNER JOIN users b ON a.userId = b.id
  LEFT OUTER JOIN (SELECT COUNT(id) AS countComments, postId FROM comments GROUP BY postId ) c ON a.id = c.postId
  LEFT OUTER JOIN (SELECT COUNT(id) AS countLikes, postId FROM likes GROUP BY postId) d ON a.id = d.postId
  ORDER BY a.createdAt DESC`;

  const posts = await sequelize.query(sql, { type: QueryTypes.SELECT });

  res.status(200).json(posts);
};

// GET ONE POST
exports.getOnePost = async (req, res, next) => {
  const sql = `SELECT a.*, b.firstname, b.lastname, b.imageURL AS userimageURL, IFNULL(c.countComments,0) AS countComments,
  IFNULL(d.countLikes,0) AS countLikes
  FROM posts a
  INNER JOIN users b ON a.userId = b.id
  LEFT OUTER JOIN (SELECT COUNT(id) AS countComments, postId FROM comments GROUP BY postId ) c ON a.id = c.postId
  LEFT OUTER JOIN (SELECT COUNT(id) AS countLikes, postId FROM likes GROUP BY postId) d ON a.id = d.postId
  WHERE a.id =?`;

  const posts = await sequelize.query(sql, { replacements: [req.params.id], type: QueryTypes.SELECT });
  if (posts.length == 0) {
    res.status(403).json({err: "Publication inconnue"});
  }
  res.status(200).json(posts[0]);
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
  Posts.findOne({
    where: {
      id: req.params.id
    }
  }).then(
    (post) => {
      if (post) { 
        Posts.destroy({
          where: {
            id: req.params.id
          }
          }).then(
          (deleteCount) => {
            if (post) {
              if (fs.existsSync('../frontend/public/images/'+ post.imageURL)) {
                fs.unlinkSync('../frontend/public/images/'+ post.imageURL);
              }
              res.status(200).json(deleteCount);
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
  }});
};