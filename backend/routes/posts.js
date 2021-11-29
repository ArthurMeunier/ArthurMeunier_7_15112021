module.exports = app => {
  const posts = require("../controllers/posts.js");

  var router = require("express").Router();

  router.post("/", posts.createPost);

  router.get("/", posts.findAllPosts);
  router.get("/:id", posts.findOnePost);

  router.put("/:id", posts.updatePost);

  router.delete("/:id", posts.deletePost);

  app.use('/api/posts', router);
};