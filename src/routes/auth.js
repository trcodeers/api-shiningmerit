import express from "express";
import Author from "../models/author.js";
import hash from "../utils/hash.js";
import bcrypt from "bcrypt";

import adminMiddleware from "../middlewares/admin.js";
import authMidddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";

import AuthorValidate from "../validations/author.js";

const router = express.Router();

router.post('/createAuthor',[authMidddleware, adminMiddleware], async(req, res) =>{
    const { email, name, password, userName, role } = req.body

    // Validation for req body
    const {error} = AuthorValidate(req.body)
    if(error){
        return res.status(400).send({ message: [error.details[0].message] })
     }

     let user = await Author.findOne({
        email
      })
      if (user) return res.status(400).send({ message: 'User already registered.' });
    
    const hasedPassword = await hash(password)
    const newAuthor = new Author({
        email, 
        name, 
        userName,
        password: hasedPassword, 
        role:role
    })
    const result = await newAuthor.save()
    const newUser = { email: result.email, _id: result._id, name: result.name, userName: result.userName}    
    return res.status(200).send({ user: newUser, status: 'Success' })

})

router.post('/login', async(req, res) =>{
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).send({ message: 'Email and password are required' })
    }

    const author = await Author.findOne({ email })
    if(!author) return res.status(401).send({message: 'Invalid credentials', status:'Failed'})

    const result = await bcrypt.compare(password, author.password)
    if(!result) return res.status(401).send({message: 'Invalid credentials', status:'Failed'})

    const token = author.generateAuthToken(author.role)
    // res.cookie('token', token, { httpOnly: true })
    return res.cookie('token', token, { httpOnly: true }).status(200).send({ token, profile: { name: author.name, email: author.email, role: author.role, userName: author.userName, }, status: 'Success' })

})

router.get('/getAuthList',[authMidddleware, mangerMiddleware], async(req, res) =>{

    const result = await Author.find().select('-password')
    return res.status(200).send({ author: result, status:'Success' })
})

router.delete('/', [authMidddleware, adminMiddleware], async(req, res) =>{
    const { email }  = req.body
    if(!email){
        return res.status(400).send({ status:'Failed', message: 'Email is required' })
    }     
    const result = await Author.deleteOne({ email })
    return res.status(200).send({ data: result, status:'Success', message: result.deletedCount === 1 ? 'Author deleted successfully' : 'No such author exist with this email' })
 
})

export default router;