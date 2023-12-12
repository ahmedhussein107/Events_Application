import EventModel from "../model/EventModel.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await EventModel.findById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { event } = req.body;
    const newEvent = new EventModel(event);
    await newEvent.save();
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
