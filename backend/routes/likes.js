  module.exports = app => {
  const likes = require("../controllers/likes.js");
  const router = require("express").Router();
  
  router.put("/like", likes.likePost);

  app.use('/api/likes', router);
};