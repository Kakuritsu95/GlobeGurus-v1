const jwt = require("jsonwebtoken");
const User = require("../schemas/usersSchema");
async function signupController(req, res) {
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

function loginController(req, res) {
  const userData = req.user;

  const accessToken = jwt.sign(
    JSON.stringify(userData),
    process.env.SECRET_ACCESS_TOKEN
  );

  res.cookie("authToken", accessToken).json(userData);
}

function verifyUserToken(req, res) {
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
      return res.json(loggedUser);
    }
  } catch (err) {
    return res.json({ message: "User is not logged in" });
  }
}
module.exports = { signupController, loginController, verifyUserToken };
