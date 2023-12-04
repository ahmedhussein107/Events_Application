import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const TicketSchema = mongoose.Schema(                                
    {
        price: {
            type: Number
        },

        eventID: {
            type: ObjectId,
            required : true
        },

        userID: {
            type: int
        }
    }
);

const TicketModel = mongoose.model('Ticket', TicketSchema);

export default TicketModel;