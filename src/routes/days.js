import express from "express";
import Days from "../models/days.js";

import authMidddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";
import DaysValidate from "../validations/days.js";
import Day from "../models/days.js";
import { getMonthDayNumer } from "../utils/dates.js";

const router = express.Router();

router.post('/', [authMidddleware, mangerMiddleware],  async(req, res) =>{

    const data = req.body
    const { error } = DaysValidate(data)
    if(error){
        return res.status(400).send({ message: error.details[0].message })
    }

    const newDay = new Days(data)
    const result = await newDay.save({ ...data })

    return res.send({ data: newDay, message: 'Suceesfuly created', status: 'Success' })

})

router.put('/', [authMidddleware, mangerMiddleware], async(req, res) =>{

    const { id, ...day } = req.body
    if(!DaysValidate(day) || !id){
        return res.status(400).send({ message: 'Ivalid inputs' })
    }
    const result = await Day.findByIdAndUpdate({ _id: id }, { ...day }, { new: true })

    return res.status(200).send({ data: result, message: 'Successfully updated', status: 'Success' })
})

router.get('/', async(req, res) =>{

    let filter = {}
    const { day, month } = req.query
    
    if(day && !month){
        return res.status(400).send({ message: 'Invalid input', status: 'Failed' })
    }

    // If no day and month is provided find the result for today 
    filter = getMonthDayNumer(day, month)
    const result = await Days.find(filter).sort({ day: 1, month: 1 })
    return res.status(200).send({ data: result, status: 'Success', })

})

router.get('/all', async(req, res) =>{

    const result = await Days.find().sort({ month: 1, day: 1 })
    return res.status(200).send({ data: result, status: 'Success' })
})

router.get('/ahead', async(req, res) =>{

    const { month, day } = req.query
    if(!month) return res.status(400).send({ message: 'Month required '})
    const queryFilter = day ? { "$and": [ { day: { $gt: day }}, { month: month }] } : {month}
    const result = await Days.find({ ...queryFilter }).sort({ month: 1, day: 1 })
    return res.status(200).send({ data: result, status: 'Success' })
})


export default router;