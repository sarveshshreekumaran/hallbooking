const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../../controllers/public_controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
