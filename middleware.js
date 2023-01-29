const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.isAuthenticated = (req, res, next) => {

    let token = req.headers.authorization; // to check if user send the token or not ...........

    if (!token) {
        return res.status(400).send({
            "type": 'error',
            "msg": "login first"
        })
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.JWT_KEY, function (err, payload) { // verification of token
        if (err) {
            return res.status(400).send({
                "type": 'error',
                "msg": "invalid token"
            })
        }

        next();
    })
}