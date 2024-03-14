const User = require("../schemas/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function authenticateUser(req, res, next) {
  try {
    const userCredentials = req.body;
    const { email, password } = userCredentials;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      return res.status(401).json({ message: "Wrong user credentials" });
    req.user = {
      username: user.username,
      email: user.email,
      avatar: user.avatarUrl,
      id: user._id,
    };
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function authorizeUser(req, res, next) {
  try {
    const requestToken = req.cookies.authToken;
    const user = jwt.verify(requestToken, process.env.SECRET_ACCESS_TOKEN);

    if (!user) throw error;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Authorization failed, please login using your credentials",
    });
  }
}

module.exports = { authenticateUser, authorizeUser };
