import express from "express";
import adminMiddleware from "../middlewares/admin.js";
import authMiddleware from "../middlewares/auth.js";
import Message from "../models/message.js";

const router = express.Router();

router.get('/messages', [authMiddleware, adminMiddleware], async(req, res) =>{
    const result = await Message.find({}).sort({ date : -1 })
    res.status(200).send({ status: 'Success', message:  result })
})

router.post('/messages', async(req, res) => {
    const { name, message } = req.body
    if(!name || !message) return res.status(400).send({ status: 'Failed', message: 'Input invalid' })
    const newMessage = new Message({
        name,
        message,
        date: new Date()
    })

    const result = await newMessage.save()
    return res.status(200).send(result)

})


export default router;