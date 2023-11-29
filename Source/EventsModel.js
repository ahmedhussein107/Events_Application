import mongoose from "mongoose";

const EventSchema = mongoose.Schema(                                
    {
        title: {
            type: String,
            required: true
        },

        numberOfAttendees: {
            type: Number
        },

        date: {
            type: Date,
            required: true
        }
    }
);

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;