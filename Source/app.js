import express from 'express';
import mongoose from 'mongoose';
import EventModel from './EventsModel.js';
import TicketModel from './TicketModel.js';
import AttendeeModel from './AttendeeModel.js';

const connect = async () => {
    await mongoose.connect(
    "mongodb+srv://AhmedHawater:3Op3fL6tnfcm6NHZ@cluster0.pmvqtcd.mongodb.net/"
    ).then(() => {
    console.log("Connected to the srver")
    });
}

await connect();

// creating express application instance
const serverUsingExpress = express();

serverUsingExpress.use(express.json());

serverUsingExpress.listen(3000, () => {
    console.log('Server started at port 3000');
});



// // arrow function : lambda expression like functions supported in ES6
serverUsingExpress.get('/home', (req, res) => {
    res.status(200).json({ message: 'Welcome to our home page' });
});


serverUsingExpress.get('/events', (req, res) => {
    res.status(200).send(listOfStrings.join('\n'));
});

serverUsingExpress.get('/attendees', async (req , res) => {
    const attendees = await AttendeeModel.find();
    res.status(200).json(attendees);
});

serverUsingExpress.get('/tickets', async (req , res) => {
    const tickets = await TicketModel.find();
    res.status(200).json(tickets);
});

serverUsingExpress.get('/tickets/:id', async (req , res) => {
    try{
        const id = req.params.id;
        const ticket = await TicketModel.findById(id);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

serverUsingExpress.get('/attendees/:id', async (req , res) => {

    try{    
        const id = req.params.id;
        const attendee = await AttendeeModel.findById(id);
        res.status(200).json(attendee);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


serverUsingExpress.get('/events/:id', (req, res) => {
    try{
        const id = req.params.id;
        const event = EventModel.find(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


serverUsingExpress.post('/events', async (req, res) => {
    try{
        const {event} = req.body;
        const newEvent = new EventModel(event);
        await newEvent.save();
        res.status(200).json(newEvent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

serverUsingExpress.post('/tickets', async (req, res) => {
    try{
        const {ticket} = req.body;
        const newTicket = new TicketModel(ticket);
        await newTicket.save();
        res.status(200).json(newTicket);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

serverUsingExpress.post('/attendees', async (req, res) => {
    try{
        const {attendee} = req.body;
        const newAtendee = new AttendeeModel(attendee);
        await newAtendee.save();
        res.status(200).json(newAtendee);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


serverUsingExpress.delete('/attendees/:id', async (req , res) => {
    const id = req.params.id;
    const attendee = await AttendeeModel.findByIdAndDelete(id);
    res.status(200).json(attendee);
})

serverUsingExpress.patch('/tickets/:id', async (req , res) => {
    const id = req.params.id;
    const ticket = await TicketModel.findById(id);
    const {userID} = req.body;
    if(ticket){
        ticket.userID = userID;
        await ticket.save();
        res.status(200).json(ticket);
    }
    else{
        res.status(404).json({message: "Ticket not found"});
    }
}
);

