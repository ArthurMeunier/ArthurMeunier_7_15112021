module.exports = app => {
  const users = require("../controllers/users.js");
  const router = require("express").Router();

  const auth = require('../middleware/auth');

  router.post("/signup", users.createUser);
  router.post("/login", users.loginUser);
  router.get("/profile", users.getProfile);

  
  router.get("/", users.getAllUsers);
  router.get("/:id", users.getOneUser);
  


  router.put("/:id", auth, users.updateUser);

  router.delete("/:id", users.deleteUser);

  app.use('/api/users', router);
};