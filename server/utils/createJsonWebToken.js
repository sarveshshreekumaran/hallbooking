require("dotenv").config();
const jwt = require("jsonwebtoken");

const accessToken = (user_id) => {
  let accesstoken = jwt.sign({ user: user_id }, process.env.JWT_PRIVITEKEY, {
    expiresIn: "30m",
  });
  return accesstoken;
};

module.exports = accessToken;
