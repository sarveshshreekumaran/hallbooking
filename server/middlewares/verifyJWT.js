require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_PRIVITEKEY, (err, decoded) => {
      if (err) {
        res.status(401).json(err);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    return res.json({ message: "Token is not provided" });
  }
};

module.exports = { verifyJwt };
