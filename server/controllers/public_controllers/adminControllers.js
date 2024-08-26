const bcrypt = require("bcrypt");
const Hall = require("../../models/hallModel");
const accessToken = require("../../utils/createJsonWebToken");

const getHalls = async (req, res) => {
  try {
    const halls = await Hall.find({});
    res.status(200).json(halls);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

const registerAdmin = async (req, res) => {
  try {
    const {
      hallname,
      ownername,
      address,
      hallCapacity,
      conditioned,
      landline,
      mobile,
      email,
      diningHall,
      diningHallCapacity,
      kitchen,
      stage,
      stageCapacity,
      parkingLot,
      password,
    } = req.body;

    const alreadyRegisteredHall = await Hall.findOne({ email: email });

    if (alreadyRegisteredHall) {
      return res.status(409).json({
        message: "Hall/User is already resgistered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const hall = await Hall.create({
      hallname: hallname,
      ownername: ownername,
      address: address,
      hallCapacity: hallCapacity,
      conditioned: conditioned,
      landline: landline,
      mobile: mobile,
      email: email,
      diningHall: diningHall,
      diningHallCapacity: diningHallCapacity,
      kitchen: kitchen,
      stage: stage,
      stageCapacity: stageCapacity,
      parkingLot: parkingLot,
      password: hashedPassword,
    });

    const jwtAccessToken = accessToken(hall._id);

    res.status(201).json({
      message: "Hall registered successfully",
      hall,
      jwtAccessToken,
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username & password are required." });
    }
    const hall = await Hall.findOne({ email: email });
    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }
    const checkPassword = await bcrypt.compare(password, hall.password);
    if (checkPassword) {
      const jwtAccessToken = accessToken(hall._id);
      res.status(200).json({
        message: "Hall login successfully",
        jwtAccessToken,
      });
    } else {
      res.status(401).json({
        message: "Wrong credentials",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { registerAdmin, loginAdmin, getHalls };
