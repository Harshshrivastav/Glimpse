const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model("User");

// checking authorisation of user before providing resources
// as we are using token

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
    return res.status(401).json({error:'you must be logged in first'});
    }

    // replace 'Bearer ' with "" and getting token 
    const token = authorization.replace('Bearer ','');
    
    // verify token
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:'you must be logged'});
        }
        const {_id} = payload;
        User.findById(_id)
            .then(userData => {
                req.user = userData;
                next();
            })
       
    });
}