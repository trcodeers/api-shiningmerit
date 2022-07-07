import jwt from "jsonwebtoken";
import server from "../config/server.js";

const authMidddleware = (req, res, next) => {

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send({ message: 'Access denied' })

    try{
        const decoded = jwt.verify(token, server.jwt.key)
        req.author = decoded 
        next()
    }
    catch(e){
        res.status(400).send({ message: 'Invalid Access' })
    }

}

export default authMidddleware;