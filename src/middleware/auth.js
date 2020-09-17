const jwt = require('jsonwebtoken');
const users = require('../models/users');

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) {
            res.status(401).send("no token found")
            next()
        }
        const decoded = jwt.verify(token,process.env.jwtToken)
        const user =await users.findOne({_id:decoded})
        req.user= user
        
        next()
    }
    catch (e) {
        res.status(401).send(e)
    }
}
module.exports=auth