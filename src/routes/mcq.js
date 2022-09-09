import express from "express";
import MCQ from "../models/mcq.js";
import MCQValidate from "../validations/mcq.js";

import authMidddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";

const router = express()

router.post('/', [authMidddleware, mangerMiddleware], async(req, res) =>{

    const { question, options, rightAnswer } = req.body

    const { error } = MCQValidate(req.body)
    if(error){
        return res.status(400).send({ message: error.details[0].message })
    }


    const newQuestion = new MCQ({
                question: { 
                    en: {
                        question, 
                        options, 
                        rightAnswer
                    }
                }
            })

    const result = await newQuestion.save()

    return res.status(200).send({ message: 'Success', result: result })
})

export default router;