const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

module.exports.verifyUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if(!token){
            res.json({message: "Login Required!", success:false})
        }

        const data = jwt.verify(token, "anysecrectkey");
        
        const client = user.findOne({ _id: data.userId }).then(function (result) {
            req.userInfo = result;
            next();
        }).catch();
    }
    catch (e) {
        res.json({message: e, success: false})
    }
}