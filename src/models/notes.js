import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    note:{
        type: [{ 
            text: { type: String, trim: true, }
        }],
    }
})


const Notes = mongoose.model('Notes', notesSchema);

export default Notes;