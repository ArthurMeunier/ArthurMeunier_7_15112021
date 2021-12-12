module.exports = app => {
  const comments = require("../controllers/comments.js");
  const router = require("express").Router();

  const auth = require('../middleware/auth'); 

  router.post("/", auth, comments.createComment);

  router.get("/", comments.findAllComments);

  router.delete("/:id", auth, comments.deleteComment);

  app.use('/api/comments', router);
};