import express from 'express';
import mongoose from 'mongoose';
import EventModel from './EventsModel.js';

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

// const listOfStrings = ['Event1', 'Event2', 'Event3'];


// // arrow function : lambda expression like functions supported in ES6
// serverUsingExpress.get('/home', (req, res) => {
//     res.status(200).json({ message: 'Welcome to our home page' });
// });


// serverUsingExpress.get('/events', (req, res) => {
//     res.status(200).send(listOfStrings.join('\n'));
// });


// serverUsingExpress.get('/events/:id', (req, res) => {
//     const id = parseInt(req.params.id); 
//     if( isNaN(id) || id >= listOfStrings.length) {
//         res.status(404).send('Not found');
//         return;
//     }
//     res.status(200).send(listOfStrings[id]);
// });

serverUsingExpress.listen(3000, () => {
    console.log('Server started at port 3000');
});

// last session

// serverUsingExpress.get('/antendees', async (req , res) => {
//     const antendees = 
// });