const express = require("express");
const usersRouter = express.Router();
const { authenticateUser } = require("../middlewares/userAuthMiddlewares");
const {
  signup,
  login,
  verifyUser,
  sendUserBookmarks,
} = require("../controllers/userControllers");

usersRouter.post("/signup", signup);
usersRouter.post("/login", authenticateUser, login);
usersRouter.post("/verify-token", verifyUser);
usersRouter.get(
  "/bookmarks",
  (req, res, next) => {
    verifyUser(req, res, next, true);
  },
  sendUserBookmarks
);
module.exports = usersRouter;
