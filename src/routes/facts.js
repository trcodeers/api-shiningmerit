import express from "express";
import authMiddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";
import Fact from "../models/facts.js";

const router = express.Router();

router.post('/shorts', async(req, res) =>{
   
    const { counts } = req.body
    
    if(!Array.isArray(counts)){
        return res.status(400).send({ status: 'Failed', message: 'Invalid request' })
    }

    const result = await Fact.find({ count: counts })

    return res.status(200).send({ status: 'Success', result })

})

// pageNo: min is 0
router.get('/admin/:pageNo', [authMiddleware, mangerMiddleware], async(req, res) =>{
    
    const pageLimit = 20
    const { pageNo } = req.params
    let totalCount
    if(pageNo === '0'){
        totalCount = await Fact.countDocuments({ userSuggested : { $exists : false } })
    }
    const result = await Fact.find({ userSuggested : { $exists : false } }).limit(pageLimit).skip(pageNo  * pageLimit)
    res.status(200).send({ status: 'Success', result, totalCount })
})

router.get('/userSuggested', [authMiddleware, mangerMiddleware], async(req, res) =>{
    
    const result = await Fact.find({ userSuggested: true })
    res.status(200).send({ status: 'Success', result })

})

router.post('/', [authMiddleware, mangerMiddleware], async(req, res) => {
    
    const { text, category, count } = req.body
    
    if(!text) return res.status(400).send({ status: 'Failed', message: 'Input invalid' })
    
    const newFact = new Fact({
        text,
        category,
        count
    })

    const result = await newFact.save()
    return res.status(200).send(result)

})

router.post('/user', async(req, res) => {
    const { text, category } = req.body
    if(!text) return res.status(400).send({ status: 'Failed', message: 'Input invalid' })
   
   const existingCount = await Fact.countDocuments({ userSuggested: true })

   if(existingCount > 40){
    return res.status(400).send({ status: 'Failed', message: 'Please try after sometime' })
   }

    const newFact = new Fact({
        text,
        category,
        userSuggested: true
    })

    const result = await newFact.save()
    return res.status(200).send({result})

})


export default router;