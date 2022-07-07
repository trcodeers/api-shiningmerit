import mongoose from "mongoose";

const daysSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    month: {
        type: Number,
        required: true,
        trim: true,
    },
    day:{
        type: Number,
        required: true,
        trim: true,
    },
    details:{
        type: String,
    },
})


const Day = mongoose.model('Days', daysSchema);

export default Day;