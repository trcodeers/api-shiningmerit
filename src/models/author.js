import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import server from "../config/server.js";

const author = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userName:{
        type: String,

    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        required: true
    },
    role:{
        type: [String],
        required: true,
        trim: true,
        default: []
    }
})

author.methods.generateAuthToken = function(role) {
    return jwt.sign({ email: this.email, role: role},
         server.jwt.key
       )
}

const Author = mongoose.model('author', author)

export default Author;

