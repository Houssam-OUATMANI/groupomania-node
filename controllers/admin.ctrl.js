const jwt = require('jsonwebtoken')
const Admin = require("../models/admin")

exports.adminLogin = (req, res) =>{
    const {email, password} = req.body
     // Admin est dans la db ?
    
  
     Admin.findOne({ where : { email : email}})
     .then(admin => {
         console.log(admin)
     if(!admin)return res.status(401).json({message : "Unauthorized"})
            //     //tout est ok
                 res.status(200).json({
                     adminId : admin.id,
                     token : jwt.sign({ adminId : admin.id, email : admin.email}, 'SECRET_KEY', {expiresIn : "5h"})
                 })
     })
}

