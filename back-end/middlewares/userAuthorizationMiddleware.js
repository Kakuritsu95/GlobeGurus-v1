const jwt = require("jsonwebtoken");
async function authorizeUser(req, res, next) {
  try {
    const requestToken = req.cookies.authToken;
    const user = jwt.verify(requestToken, process.env.SECRET_ACCESS_TOKEN);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Authorization failed, please login using your credentials",
    });
  }
}

module.exports = authorizeUser;
