import express from "express";
import Notes from "../models/notes.js";

import authMidddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";

const router = express.Router();

router.get('/:title', async(req, res) =>{
  
    const { title } = req.params
    if(!title) return res.status(400).send({ message: 'Invalid route', status: 'Failed'})
    
    const result = await Notes.find({ title: title })
    res.status(200).send({ notes: result[0] || {}, status: 'Success'})

})

// Create note
router.post('/', [authMidddleware, mangerMiddleware], async(req, res) =>{

    const { title, note } = req.body
   
    if(!title || !note) return res.status(400).send({ message: 'Invalid inputs', status: 'Failed' })

    const result = await Notes.findOneAndUpdate(
        { title: title },
        { $addToSet: { note: { text: note } }},
        { new: true }
    )

    return res.status(200).send({ data: result, status: "Success" })

})

router.put('/addNote', [authMidddleware, mangerMiddleware], async(req, res) => {
    
    const { note, id } = req.body

    if(!note || !id) return res.status(400).send({ message: 'Invalid inputs', status: 'Failed' })

    const result = await Notes.findOneAndUpdate(
        { _id: id },
        { $set: { note: { text: note } }},
        { new: true })

    return res.status(200).send({ data: result })    

})


export default router;