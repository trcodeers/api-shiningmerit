 const adminMiddleware = (req, res, next) => {
    if(!req?.author?.role?.includes('admin')){
        return res.status(403).send({ message: 'Access denied, not admin' })       
    }
    
    next()
}

export default adminMiddleware;