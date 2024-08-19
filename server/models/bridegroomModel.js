const mongoose = require("mongoose");

const brideGroomSchema = new mongoose.Schema(
  {
    brideName: {
      type: String,
      required: true,
    },
    brideDOB: {
      type: String,
      required: true,
    },
    bridegroomName: {
      type: String,
      required: true,
    },
    bridegroomDOB: {
      type: String,
      required: true,
    },
    brideFatherName: {
      type: String,
      required: true,
    },
    brideMotherName: {
      type: String,
      required: true,
    },
    bridegroomFatherName: {
      type: String,
      required: true,
    },
    bridegroomMotherName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    brideEducation: {
      type: String,
      required: true,
    },
    bridegroomEducation: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BrideGroom = mongoose.model("BrideGroom", brideGroomSchema);

module.exports = BrideGroom;
