module.exports = app => {
  const posts = require("../controllers/posts.js");
  const likes = require("../controllers/likes.js");

  const router = require("express").Router();

  const auth = require('../middleware/auth');

  router.post("/", auth, posts.createPost);
  router.get("/", auth, posts.getAllPosts);
  router.get("/:id", auth, posts.getOnePost);


  // router.get('/:id/comments', commentCtrl.getAllComments);


  router.put("/:id", posts.updatePost);

  router.delete("/:id", posts.deletePost);

  router.post('/:id/likes', auth, likes.likePost);
  router.get('/:id/likes', auth, likes.getAllLikes);
  router.get('/:id/like', auth, likes.getOneLike);

  app.use('/api/posts', router);
};