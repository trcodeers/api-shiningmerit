import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    subTopics:{
        type: [{ 
                name: { type: String, trim: true },  
            }],
        default: []
    }
})


const Topic = mongoose.model('Topics', topicSchema);

export default Topic;