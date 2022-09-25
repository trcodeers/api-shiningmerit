import express from "express";
import MCQ from "../models/mcq.js";
import MCQValidate from "../validations/mcq.js";

import authMidddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";
import Tags from "../constant/mcqTags.js";

const router = express()

router.post('/', [authMidddleware, mangerMiddleware], async(req, res) =>{

    const { questionText, options, rightAnswer, tags } = req.body

    const { error } = MCQValidate(req.body)
    if(error){
        return res.status(400).send({ message: error.details[0].message })
    }


    const newQuestion = new MCQ({
                question: { 
                    en: {
                        questionText, 
                        options, 
                    },
                    rightAnswer
                },
                tags
            })

    const result = await newQuestion.save()

    return res.status(200).send({ message: 'Success', result: result })
})

router.get('/mcqCount', [authMidddleware, mangerMiddleware],  async(req, res) => {

    const distinctTags = await MCQ.distinct('tags')
    
    const result = []

    for (let index = 0; index < distinctTags.length; index++) {
        const val = await MCQ.find({ tags: distinctTags[index] }).count()
        result.push({ title: distinctTags[index], value: val })
    }

    return res.status(200).send({ message: 'Success', result })

})

router.get('/getTagsValue', async(req, res) =>{

    const result = await MCQ.distinct('tags')

    return res.status(200).send({ message: 'Success', result })

})

router.post('/user', async(req, res) =>{

    const { tags }= req.body
    if(!Array.isArray(tags)){
        return res.status(400).send({ status: 'Failed', message: 'Invalid request' })
    }

    const result = await MCQ.find({ tags: tags })

    return res.status(200).send({ message: 'Success', result })
})

export default router;