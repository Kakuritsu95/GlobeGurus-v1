const express = require("express");
const usersRouter = express.Router();
const upload = require("multer")();
const {
  authenticateUser,
  authorizeUser,
} = require("../middlewares/userAuthMiddlewares");
const {
  signup,
  login,
  verifyUser,
  getUserDetails,
  sendUserBookmarks,
  updateUserDetails,
} = require("../controllers/userControllers");

usersRouter.post("/signup", signup);
usersRouter.post("/login", authenticateUser, login);
usersRouter.post("/verify-token", verifyUser);
usersRouter.get("/user-details", authorizeUser, getUserDetails);
usersRouter.get(
  "/bookmarks",
  (req, res, next) => {
    verifyUser(req, res, next, true);
  },
  sendUserBookmarks
);
usersRouter.patch(
  "/update-user-details",
  authorizeUser,
  upload.single("avatarImage"),
  updateUserDetails
);
module.exports = usersRouter;
