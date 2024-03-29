const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method == "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next({ message: "Authentication Failed!" });
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(err);
  }
};
