


import express from "express";
const router = express.Router();


router.get('/', async(req, res) =>{

    res.status(200).send('App is Working')
  
})

router.delete('/', async(req, res) =>{

  
})


export default router;