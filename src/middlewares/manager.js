// Either author or admin: author + admin = manager

const mangerMiddleware = (req, res, next) => {
    if(!req.author.role.includes('author') && !req.author.role.includes('admin')){
        return res.status(403).send({ message: 'Access denied, not managable' })       
    }
    
    next()
}

export default mangerMiddleware;