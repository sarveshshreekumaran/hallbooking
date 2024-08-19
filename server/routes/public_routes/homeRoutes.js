const express = require("express");
const router = express.Router();
const {
  getHome,
} = require("../../controllers/public_controllers/homeController");

router.get("/", getHome);

module.exports = router;
