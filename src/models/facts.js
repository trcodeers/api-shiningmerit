import mongoose from "mongoose";

const factsSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    category:{
          type: [{ 
                    type: String, 
                    trim: true,
               }],
   },
    userSuggested:{
        type: Boolean
   },
    count: {
        type: String,
        unique: true,
        // required: true
    }
   
})


const Fact = mongoose.model('Facts', factsSchema);

export default Fact;