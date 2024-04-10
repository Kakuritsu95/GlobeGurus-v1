const jwt = require("jsonwebtoken");
const User = require("../schemas/usersSchema");
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
async function sendUserBookmarks(req, res) {
  try {
    const userBookmarks = await User.findById(req.userId).select(
      "-_id bookmarks"
    );

    res.status(200).json(userBookmarks);
  } catch (err) {
    return res.json({ message: `Couldnt get user details ${err}` });
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
module.exports = {
  signup,
  login,
  verifyUser,
  toggleBookmark,
  sendUserBookmarks,
};
