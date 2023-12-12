import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import EventModel from "./model/EventModel.js";
import TicketModel from "./model/TicketModel.js";
import AttendeeModel from "./model/AttendeeModel.js";
import EventRoute from "./route/EventRoute.js";

const PORT_NUMBER = 3000;

dotenv.config();

const connectToDataBase = async () => {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to the srver");
  });
};

await connectToDataBase();

const server = express();

server.use(express.json());
server.use("/events", EventRoute);

server.listen(PORT_NUMBER, () => {
  console.log("Server started at port " + PORT_NUMBER);
});

server.get("/home", (req, res) => {
  res.status(200).json({ message: "Welcome to our home page" });
});

server.get("/attendees", async (req, res) => {
  const attendees = await AttendeeModel.find();
  res.status(200).json(attendees);
});

server.get("/tickets", async (req, res) => {
  const tickets = await TicketModel.find();
  res.status(200).json(tickets);
});

server.get("/tickets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ticket = await TicketModel.findById(id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

server.get("/attendees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const attendee = await AttendeeModel.findById(id);
    res.status(200).json(attendee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

server.post("/tickets", async (req, res) => {
  try {
    const { ticket } = req.body;
    const newTicket = new TicketModel(ticket);
    await newTicket.save();
    res.status(200).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

server.post("/attendees", async (req, res) => {
  try {
    const { attendee } = req.body;
    const newAtendee = new AttendeeModel(attendee);
    await newAtendee.save();
    res.status(200).json(newAtendee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

server.delete("/attendees/:id", async (req, res) => {
  const id = req.params.id;
  const attendee = await AttendeeModel.findByIdAndDelete(id);
  res.status(200).json(attendee);
});

server.patch("/tickets/:id", async (req, res) => {
  const id = req.params.id;
  const ticket = await TicketModel.findById(id);
  const { userID } = req.body;
  if (ticket) {
    ticket.userID = userID;
    await ticket.save();
    res.status(200).json(ticket);
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
});
