import {ObjectId } from "mongodb";
import mongoose from "mongoose";

const TicketSchema = mongoose.Schema(                                
    {
        price: {
            type: Number,
            required: true
        },

        eventID: {
            type: ObjectId,
            required : true
        },

        userID: {
            type: ObjectId
        }
    }
);

const TicketModel = mongoose.model('Ticket', TicketSchema);

export default TicketModel;