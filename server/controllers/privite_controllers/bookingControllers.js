const Hall = require("../../models/hallModel");

const addEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const { events } = req.body;
    const foundHall = await Hall.findOne({ _id: id });
    if (!foundHall) {
      return res.status(404).json({ message: "Hall not found!" });
    }
    const registerHall = await Hall.findByIdAndUpdate(
      { _id: id },
      {
        events: [
          ...foundHall.events,
          {
            user: req.user,
            title: events[0].title,
            start: events[0].start,
            end: events[0].end,
          },
        ],
      },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Hall Registered Successfully", registerHall });
  } catch (error) {
    res.sendStatus(500);
  }
};

const getEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const foundHall = await Hall.findById({ _id: id });
    if (!foundHall) {
      return res.status(404).json({ message: "Hall not found!" });
    }
    return res.status(200).json(foundHall);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { addEvent, getEvent };
