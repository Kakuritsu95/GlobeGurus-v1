const jwt = require("jsonwebtoken");
const User = require("../schemas/usersSchema");
async function signupController(req, res) {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) return res.status(409).json("Email already in use");
    const newUser = new User(user);
    const savedUser = await newUser.save();
    if (!savedUser) res.status(403).json("Couldnt create account");
    res.json(savedUser);
  } catch (err) {}
}

function loginController(req, res) {
  const userData = req.user;

  const accessToken = jwt.sign(
    JSON.stringify(userData),
    process.env.SECRET_ACCESS_TOKEN
  );
  res.cookie("authToken", accessToken).json({ message: accessToken });
}

module.exports = { signupController, loginController };
