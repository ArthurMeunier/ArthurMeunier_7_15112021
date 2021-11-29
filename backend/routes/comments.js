module.exports = app => {
  const comments = require("../controllers/comments.js");

  var router = require("express").Router();

  router.post("/", comments.createComment);

  router.get("/", comments.findAllComments);

  router.delete("/:id", comments.deleteComment);

  app.use('/api/comments', router);
};