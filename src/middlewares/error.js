import logger from "../config/logger.js";

// Handle error in the request process pipeline ONLY
export default function(err, req, res, next) { 

    logger.error(err)
    if(err.name === 'MongoServerError' && err.code === 11000){
        return res.status(422).send({ status: 'Failed', message: 'Duplicate value!' });
    }

    res.status(500).send({message: ['Internal server error'] }) 
    return

}