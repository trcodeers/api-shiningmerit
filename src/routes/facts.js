import express from "express";
import authMiddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";
import Fact from "../models/facts.js";

const router = express.Router();

router.get('/user/', async(req, res) =>{

    const randomNo = Math.floor((Math.random() * 10) + 1);
    const result = await Fact.find({}).limit(5).skip(randomNo)
    res.status(200).send({ status: 'Success', result })
})

// pageNo: min is 0
router.get('/admin/:pageNo', [authMiddleware, mangerMiddleware], async(req, res) =>{
    
    const pageLimit = 20
    const { pageNo } = req.params
    const result = await Fact.find({}).limit(pageLimit).skip(pageNo  * pageLimit)
    res.status(200).send({ status: 'Success', result })
})

router.post('/', [authMiddleware, mangerMiddleware], async(req, res) => {
    const { text, category } = req.body
    if(!text) return res.status(400).send({ status: 'Failed', message: 'Input invalid' })
    const newFact = new Fact({
        text,
        category
    })

    const result = await newFact.save()
    return res.status(200).send(result)

})




export default router;