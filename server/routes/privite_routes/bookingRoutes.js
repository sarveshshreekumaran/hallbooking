const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../../middlewares/verifyJWT");
const {
  addEvent,
  getEvent,
} = require("../../controllers/privite_controllers/bookingControllers");

router.post("/:id", verifyJwt, addEvent);
router.get("/:id", verifyJwt, getEvent);

module.exports = router;
