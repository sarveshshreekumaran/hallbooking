const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getHalls,
} = require("../../controllers/public_controllers/adminControllers");

router.get("/all-halls", getHalls);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;
