import express from "express";
import authMidddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";
import IndianStates from "../models/indianStates.js";
import StateValidate from "../validations/state.js";

const router = express()

router.get('/getAllStates', async(req, res) =>{

    const result = await IndianStates.find().sort({ name: 1 })
    return res.status(200).send({ states: result, status: 'Success' })

})

router.get('/getStatesList', async(req, res) =>{

    const result = await IndianStates.find({}, { name: 1, }).sort({ name: 1 })
    return res.status(200).send({ states: result, status: 'Success' })

})

router.get('/getStatesDetails/:id', async(req, res) =>{

    const { id } = req.params
    const result = await IndianStates.findById({ _id : id })
    return res.status(200).send({ states: result, status: 'Success' })

})

router.post('/', [authMidddleware, mangerMiddleware], async(req, res) =>{

    const { name, ...rest } = req.body
    const newState = new IndianStates({
        name,
        ...rest
    })
    const result = await newState.save()
    return res.status(200).send({ data: result, status: 'Success'})

})

router.put('/', async(req, res) =>{

    const { id, ...rest } = req.body
    if(!id) return res.status(400).send({ message: 'Id is required', status: 'Failed' })
    const { error } = StateValidate({ ...rest })
    if(error){
        return res.status(400).send({ message: [error.details[0].message], statatus: 'Failed' })
     }

    const state = await IndianStates.findByIdAndUpdate({ _id: id }, { ...rest })
    
    return res.status(200).send({ state: state, status: 'Success'})
})


export default router;