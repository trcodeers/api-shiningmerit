import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
    
    question:{
        en:{
            questionText: { type: String, trim: true, unique: true },
            options: { type: Array },
            rightAnswer: { type: Number },
        },
    },

    tags:{
        type: [{ 
                  type: String, 
                  trim: true,
             }],
    },
   
})


const MCQ = mongoose.model('mcq', mcqSchema);

export default MCQ;