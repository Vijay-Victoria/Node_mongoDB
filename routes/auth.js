const express = require("express");
const authControler = require("../controller/auth");
const router = express.Router();

router
  .post("/signUp", authControler.createUser)
  .post("/login", authControler.login);

exports.router = router;
