const express = require("express");
const usersAuthRouter = express.Router();
const { authenticateUser } = require("../middlewares/userAuthMiddlewares");
const {
  signupController,
  loginController,
} = require("../controllers/userAuthControllers");

usersAuthRouter.post("/signup", signupController);
usersAuthRouter.post("/login", authenticateUser, loginController);
module.exports = usersAuthRouter;
