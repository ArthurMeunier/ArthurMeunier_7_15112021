module.exports = app => {
  const users = require("../controllers/users.js");

  var router = require("express").Router();

  router.post("/", users.createUser);

  router.get("/", users.findAllUsers);
  router.get("/:id", users.findOneUser);

  router.put("/:id", users.updateUser);

  router.delete("/:id", users.deleteUser);

  app.use('/api/users', router);
};