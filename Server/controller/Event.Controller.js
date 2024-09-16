const Event = require("../models/event.model.js")
const mongoose = require('mongoose')

const EventRegister = async (req, res) => {
    try {
      const { title, startDate, endDate, description } = req.body;
      console.log(title, startDate,endDate, description)
      await Event.create({
        title,
        startDate,
        endDate,
        description,
      });
      return res.status(200).json({
        message: "Company Register SuccessFully..",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
};

const EventGet = (req, res) => {
    Event.find()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
};

const EventUpdate = async(req, res)=>{
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    return res.status(200).json({
      updatedEvent,
      message: "Event data updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error)
  }
}

const EventDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }

    const result = await Event.findByIdAndDelete(id);
    if (result) {
      return res.status(200).json({ success: true, message: "Event deleted successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



module.exports = {EventRegister, EventGet, EventUpdate, EventDelete}