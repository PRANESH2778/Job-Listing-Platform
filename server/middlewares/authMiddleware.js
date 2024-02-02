const jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "unAuthorized user" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) return res.status(402).json({ message: "unAuthorized user" });
    req.body.userId = decode.userId;
    next();
  } catch (error) {
    res.status(402).json({ message: "Invalid token" });
    console.log(error);
  }
};
module.exports = verifyJwt;
