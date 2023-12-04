import mongoose from "mongoose";

const AtendeeSchema = mongoose.Schema(                                
    {
        name: {
            type: String,
            required: true
        },

        age: {
            type: Number
        },

        email: {
            type: String,
            unique: true
        }
    }
);

const AtendeeModel = mongoose.model('Atendee', AtendeeSchema);

export default AtendeeModel;