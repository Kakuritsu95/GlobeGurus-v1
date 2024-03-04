const express = require("express");
const usersAuthRouter = express.Router();
const { authenticateUser } = require("../middlewares/userAuthMiddlewares");
const {
  signupController,
  loginController,
  verifyUserToken,
} = require("../controllers/userAuthControllers");

usersAuthRouter.post("/signup", signupController);
usersAuthRouter.post("/login", authenticateUser, loginController);
usersAuthRouter.post("/verify-token", verifyUserToken);
module.exports = usersAuthRouter;
