import express from 'express';
import mongoose from 'mongoose';
import EventModel from './EventsModel.js';

// creating express application instance
const serverUsingExpress = express();

const listOfStrings = ['Event1', 'Event2', 'Event3'];


// arrow function : lambda expression like functions supported in ES6
serverUsingExpress.get('/home', (req, res) => {
    res.status(200).json({ message: 'Welcome to our home page' });
});


serverUsingExpress.get('/events', (req, res) => {
    res.status(200).send(listOfStrings.join('\n'));
});


serverUsingExpress.get('/events/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    if( isNaN(id) || id >= listOfStrings.length) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).send(listOfStrings[id]);
});

serverUsingExpress.listen(3000, () => {
    console.log('Server started at port 3000');
});