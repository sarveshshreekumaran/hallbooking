const bcrypt = require("bcrypt");
const BrideGroom = require("../../models/bridegroomModel");
const accessToken = require("../../utils/createJsonWebToken");

const registerUser = async (req, res) => {
  try {
    const {
      brideName,
      brideDOB,
      bridegroomName,
      bridegroomDOB,
      brideFatherName,
      brideMotherName,
      bridegroomFatherName,
      bridegroomMotherName,
      mobileNumber,
      email,
      brideEducation,
      bridegroomEducation,
      password,
    } = req.body;

    const alreadyRegisteredBrideGroom = await BrideGroom.findOne({
      email: email,
    });

    if (alreadyRegisteredBrideGroom) {
      return res.status(409).json({
        message: "Bride/Bridegroom is already registered",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const bridegroom = await BrideGroom.create({
      brideName: brideName,
      brideDOB: brideDOB,
      bridegroomName: bridegroomName,
      bridegroomDOB: bridegroomDOB,
      brideFatherName: brideFatherName,
      brideMotherName: brideMotherName,
      bridegroomFatherName: bridegroomFatherName,
      bridegroomMotherName: bridegroomMotherName,
      mobileNumber: mobileNumber,
      email: email,
      brideEducation: brideEducation,
      bridegroomEducation: bridegroomEducation,
      password: hasedPassword,
    });

    const jwtAccessToken = accessToken(bridegroom._id);

    res.status(201).json({
      message: "Bride/BrideGroom registered successfully",
      success: true,
      bridegroom,
      jwtAccessToken,
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const bridegroom = await BrideGroom.findOne({ email: email });
    if (!bridegroom) {
      return res.status(404).json({ message: "bridegroom not found" });
    }
    const checkPassword = await bcrypt.compare(password, bridegroom.password);
    if (checkPassword) {
      const jwtAccessToken = accessToken(bridegroom._id);
      res.status(200).json({
        message: "BrideGroom logged in successfully",
        success: true,
        jwtAccessToken,
      });
    } else {
      res.status(401).json({ Error: "Wrong credentials" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { registerUser, loginUser };
