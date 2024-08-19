const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema(
  {
    hallname: {
      type: String,
      required: true,
    },
    ownername: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    events: [
      {
        type: {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BrideGroom",
          },
          title: String,
          start: String,
          end: String,
        },
        default: [],
      },
    ],
    hallCapacity: {
      type: String,
      required: true,
    },
    conditioned: {
      type: String,
      required: true,
    },
    landline: {
      type: Number,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    diningHall: {
      type: String,
      required: true,
    },
    diningHallCapacity: {
      type: String,
      required: true,
    },
    kitchen: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    stageCapacity: {
      type: String,
      required: true,
    },
    parkingLot: {
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

const Hall = mongoose.model("Hall", hallSchema);

module.exports = Hall;
