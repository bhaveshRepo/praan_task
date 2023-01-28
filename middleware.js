const jwt = require('jsonwebtoken')
require('dotenv').config;



exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(400).send({
            "type" : 'error',
            "msg": "login first"
        })
    }

    const verify = jwt.verify(token, process.env.JWT_KEY, function(err, user) {
            if(err){
                return res.status(400).send({
                    "type" : 'error',
                    "msg": "invalid token"
                })
            }

            next();
    })  
}