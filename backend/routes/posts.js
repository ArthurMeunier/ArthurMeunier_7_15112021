module.exports = app => {
  const posts = require("../controllers/posts.js");
  const router = require("express").Router();

  const auth = require('../middleware/auth');
  const multer = require('../middleware/multer-config');

  router.post("/", multer, posts.createPost);

  router.get("/", posts.getAllPosts);
  router.get("/:id", posts.getOnePost);

  router.put("/:id", posts.updatePost);

  router.delete("/:id", posts.deletePost);

  app.use('/api/posts', router);
};