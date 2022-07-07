

const authorMiddleware = (req, res, next) => {
    if(!req.author.role.includes('author')){
        return res.status(403).send({ message: 'Access denied, not author' })       
    }
    
    next()
}

export default authorMiddleware;