module.exports = app => {
  const likes = require("../controllers/likes.js");
  const router = require("express").Router();


  app.use('/api/likes', router);
};