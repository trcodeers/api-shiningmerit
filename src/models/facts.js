import mongoose from "mongoose";

const factsSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
   category:{
        type: String,
        trim: true,
   }
})


const Fact = mongoose.model('Facts', factsSchema);

export default Fact;