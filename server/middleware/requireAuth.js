const jwt = require('jsonwebtoken')

const requireAuth = async(req,res,next) => {
    const {authorization} = req.headers
    if(!authorization) {
       return res.status(401).json({error: 'Access Denied'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {email} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {email}
        next()
    }catch(e){
        res.status(401).json({error:'authorization denied'})
    }
}

module.exports = requireAuth