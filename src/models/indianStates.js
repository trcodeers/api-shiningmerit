import mongoose from "mongoose";

const indianStatesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    capital:{
        type: String,
        trim: true,
        default: ''
    },
    language: {
        type: String,
        trim: true,
        default: ''
    },
    unionTerritories:{
        type: Boolean,
        default: false
    },
    details: {
        type: String,
        default: ''
    },
    area:{
        type: String,
        default: ''
    },

})


const IndianStates = mongoose.model('IndianStates', indianStatesSchema);

export default IndianStates;