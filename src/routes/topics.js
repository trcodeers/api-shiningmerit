import express from "express";
import Topic from "../models/topics.js";
import TopicValidation from "../validations/topics.js";

import authMidddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";
import Notes from "../models/notes.js";


const router = express.Router();

router.post('/', [authMidddleware, mangerMiddleware], async(req, res) => {

    const { title } = req.body;
    if(!title){
        return res.status(400).send({ status: 'Failed', message: 'Title is not valid' })
    }

    const newTopic = new Topic({
        title,
    })
    const result = await newTopic.save()
    return res.status(200).send(result)
    
});

router.get('/', async(req, res) =>{
    const result = await Topic.find()
    return res.status(200).send({ data: result, status: 'Success'})
})

router.put('/subTopics', [authMidddleware, mangerMiddleware], async(req, res) =>{
    
    const { id, subTopic } = req.body
    const { error } = TopicValidation({subTopic})
    if(error){
        return res.status(400).send({ message: 'Subtopic is not valid' })
    }

    const result = await Topic.findOneAndUpdate(
        { _id: id },
        { $set: { subTopics: { name: subTopic }}},
        { new: true }
        )
    return res.status(200).send({ data: result, status: 'Success'})

})


export default router;