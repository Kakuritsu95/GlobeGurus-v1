const jwt = require("jsonwebtoken");
const User = require("../schemas/usersSchema");
const Guide = require("../schemas/guideSchema");
const { uploadImage, deleteImage } = require("../helpers/handleImageBuckets");
const { checkEmailFormat } = require("../helpers/checkEmailFormat");
const { Cursor } = require("mongoose");
async function signup(req, res) {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser)
      return res.status(409).json({ message: "Email already in use" });
    const newUser = new User(user);
    const savedUser = await newUser.save();

    if (!savedUser) return res.status(403).json("Couldnt create account");
    res.status(201).json({ message: "Account successefully created!" });
  } catch (err) {
    res.send(err);
  }
}

function login(req, res) {
  const userData = req.user;

  const accessToken = jwt.sign(
    JSON.stringify(userData),
    process.env.SECRET_ACCESS_TOKEN
  );

  res.cookie("authToken", accessToken).json(req.user);
}

async function verifyUser(req, res, next, useAsMiddleware = false) {
  const requestToken = req.cookies.authToken;
  try {
    if (!requestToken)
      return res.status(401).json({ message: "Unauthorized, please login" });
    if (requestToken) {
      const loggedUser = jwt.verify(
        requestToken,
        process.env.SECRET_ACCESS_TOKEN
      );

      if (!loggedUser) return res.json({ message: "User is not logged in" });
      if (useAsMiddleware) {
        req.userId = loggedUser.id;
        return next();
      }

      return res.json(loggedUser);
    }
  } catch (err) {
    return res.json({ message: "User is not logged in" });
  }
}

async function getUserDetails(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password").lean();
    const { _id, ...formattedUser } = user;
    formattedUser.id = _id;
    res.status(200).json(formattedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error cannot get user details" });
  }
}

async function getUserBookmarks(req, res) {
  try {
    const userBookmarks = await User.findById(req.userId).select(
      "-_id bookmarks"
    );

    res.status(200).json(userBookmarks);
  } catch (err) {
    return res.json({ message: `Couldnt get user details ${err}` });
  }
}

async function getTopUsers(_, res) {
  try {
    const guides = await Guide.find({});
    const topUsers = guides
      .reduce((acc, cur) => {
        const likePoints = cur.likes.length;
        const owner = cur.owner;
        const exists = acc.find((obj) => obj.owner._id === cur.owner._id);
        if (!exists) acc.push({ owner, points: 1 + likePoints });
        else exists.points = exists.points + 1 + likePoints;
        return acc;
      }, [])
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);
    if (!topUsers) return res.status(400).json({ message: "No users found" });
    res.json(topUsers);
  } catch (err) {
    res.son({ message: err.message });
  }
}

async function toggleBookmark(req, res) {
  try {
    const userId = req.user.id;
    const { guideId } = req.params;
    const user = await User.findById(userId).select("-password");

    const alreadyBookmarked = user.bookmarks.includes(guideId);
    if (alreadyBookmarked) {
      idIndex = user.bookmarks.findIndex((id) => id.toString() == guideId);
      user.bookmarks.splice(idIndex, 1);
    } else user.bookmarks.push(guideId);

    await user.save();

    res.status(200).end();
  } catch (err) {
    res.status(500).json({
      message: "Internal server error, could not add guide as bookmarked",
    });
  }
}

async function updateUserDetails(req, res) {
  const { username, email } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (req.file) {
      const imageFile = req.file;
      const oldAvatarUrl = user.avatarUrl;
      const newAvatarUrl = await uploadImage("avatars", imageFile);
      await deleteImage("avatars", oldAvatarUrl);
      user.set({ avatarUrl: newAvatarUrl });
      const updatedUser = await user.save();
      if (!updatedUser)
        return res
          .status(500)
          .json({ message: "Could not update user avatar" });
      return res.json(newAvatarUrl);
    }
    if (username) user.username = username;
    if (email) {
      if (!checkEmailFormat(email))
        return res.status(400).json({ message: "Invalid email format" });
      user.email = email;
    }

    const updatedUser = await user.save();
    if (!updatedUser)
      return res.status(500).json({ message: "Could not update user details" });
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  signup,
  login,
  verifyUser,
  getUserDetails,
  toggleBookmark,
  getUserBookmarks,
  updateUserDetails,
  getTopUsers,
};
