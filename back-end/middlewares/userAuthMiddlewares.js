const User = require("../schemas/usersSchema");
const bcrypt = require("bcrypt");
async function authenticateUser(req, res, next) {
  try {
    const userCredentials = req.body;
    const { email, password } = userCredentials;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Cannot find user" });
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      return res.status(400).json({ message: "Wrong user credentials" });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Wrong user credentials" });
  }
}

module.exports = authenticateUser;
