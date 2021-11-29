module.exports = app => {
  const likes = require("../controllers/likes.js");

  var router = require("express").Router();


  app.use('/api/likes', router);
};