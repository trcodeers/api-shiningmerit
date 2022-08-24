import express from "express";
import Table from "../models/table.js";

import authMidddleware from "../middlewares/auth.js";
import mangerMiddleware from "../middlewares/manager.js";
import adminMiddleware from "../middlewares/admin.js";
import sortTableValueByKey from "../utils/sortTableValueByKey.js";

const router = express.Router();

router.get('/tableTitles', async(req, res) =>{

    const result = await Table.find({}, { title: 1, textToSearch: 1 }).sort({ title: 1 })
    return res.status(200).send({ value: result, status: 'Success' })

})

router.get('/tableValues/:textToSearch', async(req, res) => {

    let { textToSearch } = req.params
    if(!textToSearch) return res.status(200).send({ message: 'Id is required', status: 'Failed'})
    
    const result = await Table.find({ textToSearch }, { title: 1, values: 1, columns: 1 })
   
    console.log(result)
    if(!result){
        return res.status(404).send({ message: 'Not found for this title', status: 'Failed'})
    }

    // Sort the table value against first key
    const val = result[0]?.values
    const columnsList = result[0]?.columns
    if(columnsList){
        const sortingKey = Object.keys(columnsList)[0]
        result['values'] = sortTableValueByKey(val, sortingKey)  
    }
   
    return res.status(200).send({ tableValues: result[0] || {} , status: 'Success' })

})

router.post('/', [authMidddleware, adminMiddleware], async(req, res) =>{

    const { title } = req.body
    
    if(!title) return res.status(400).send({ message: 'Title is required' })
    const textToSearch = title.toLocaleLowerCase().replaceAll('-', ' ').split(' ').join('-')

    const newTable = new Table({
        title,
        textToSearch,
        values: [],
        columns: {}
    })

    const result = await newTable.save()

    return res.status(200).send({ data: result, status: 'Success' })

})

router.put('/addColumns',[ authMidddleware, adminMiddleware], async(req, res) => {

    const { id, columns } = req.body

    const existTable = await Table.findById({ _id: id })

    if(!existTable) return res.status(404).send({ message: 'Document does not exist' })

    const columnNames = {}

    columns?.forEach((el) => {
         columnNames["columns." + el.split(' ').join('')] = el
    })

    for (const key in existTable.columns) {
        if(columnNames["columns."+key]){
            return res.status(400).send({ message: `${key} is already exist`, status: 'Failed'})
        }
    }
    
    const updateTable = await Table.findOneAndUpdate({ _id: id }, {
      $set: { ...columnNames } 
    })

    return res.status(200).send({ message: 'Table updated successfully!', status: 'Success' })

})

router.put('/addValues', async(req, res) => {
    
    const { id, values } = req.body

    if(!id) return res.status(400).send({ message: 'Id is required', status: 'Failed'})

    const existTable = await Table.findById({ _id: id })

    for (const key in existTable.columns) {
        if(!values[key]){
            return res.status(400).send({ message: `${key} is required`, status: 'Failed'})
        }
    }

    const updateTable = await Table.findByIdAndUpdate({ _id: id }, {
         $addToSet: { values: values }  
    })

    res.status(200).send({ message: 'Upated successly ', status: 'Success' })

})

export default router;