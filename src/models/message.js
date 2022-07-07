import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    date: Date
})


const Message = mongoose.model('Messages', messageSchema);

export default Message;