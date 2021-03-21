const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userValidation = require('../validation/user.validation')
const User = require('../models/users')


// INSCRIPTION UTILISATEUR
exports.signup = ((req ,res)=> {
    const {protocol , file, body } = req
    console.log(req.body)

    // Validation Server
    const {error} = userValidation(body)
    if (error) return res.status(400).json({ error : error.details[0].message})

    // Hash
    bcrypt.hash(body.password, 12)
    .then(hash =>{
        // creation & sauvegarde DB
        User.create({
            username : body.username,
            email : body.email,
            password: hash,
            imageUrl : `${protocol}://${req.get('host')}/public/image/${file.filename}`
        })
        .then(()=> res.status(201).json({message : "Votre compte a bien été crée!"}))
        .catch(err => res.status(400).json({message : err}))
    })
    .catch(err => res.status(500).json({message : err}))
})


// CONNEXION UTILISATEUR
exports.login = ((req ,res)=> {
    const {email , password} = req.body

    const {error} = userValidation(req.body)
    if (error) return res.status(400).json({ message : error.details[0].message})

    // user est dans la db ?
    User.findOne({ where : {email : email}})
    .then(user => {
    if(!user)return res.status(401).json({message : "Unauthorized"})
       
        // mdp du form est-il pareil que celui dans la db ?
        bcrypt.compare(password, user.password)
         .then(match => {
            if (!match) return res.status(401).json({ err: 'Mot de passe incorrect !' })
    
        //     //tout est ok
             res.status(200).json({
                 userId : user.id,
                 token : jwt.sign({  userId : user.id, email : user.email}, 'SECRET_KEY', {expiresIn : "5h"})
             })
        })
         // err bcrypt
         .catch(err => res.status(500).json({message : err}))
    })
    .catch(err => res.status(500).json({message : err}))
})



// Info Compte user

exports.getUserInfo = (req, res) =>{
    const { id } = req.params

    User.findByPk(id, {
        attributes : {exclude : ['id', 'password']}
    })
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch(error => res.status(500).json(error))
}


exports.updateUserInfo = (req, res)=>{
    const { id } = req.params
    const { protocol, body, file} = req

    console.log(body , "eazeazeza")
    
   if(file){
       User.findByPk(id)
       .then(user =>{
           user.imageUrl = `${protocol}://${req.get('host')}/public/image/${file.filename}`
           user.save()
           .then(()=> res.status(200).json({message : "Image Updated"}))
           .catch(error => res.status(500).json(error))
       })
   }
   else if (!file){
       if(body.email){
           console.log(body.email)
            User.findByPk(id)
            .then(user =>{
                user.email = body.email
                user.save()
                .then(()=> res.status(200).json({message : "Email Updated"}))
                .catch(error => res.status(500).json(error))
            })
       }
       else if(body.username){
        User.findByPk(id)
        .then(user =>{
            user.username = body.username
            user.save()
            .then(()=> res.status(200).json({message : "Username Updated"}))
            .catch(error => res.status(500).json(error))
        })
       }
       else{
           res.status(401).json({message : "Unauthorized"})
       }
   }
   else{
    res.status(401).json({message : "Unauthorized"})
   }  
}



// SUPPRESSION COMPTE

exports.deleteAccount = ((req , res)=>{
   
    const { id } = req.params
    console.log(req.body)
            User.destroy({where : {id : id}})
            .then(()=>{
               res.status(200).json({message : "Utilisateur suprimée"})
            })
            .catch(err => res.status(500).json(err))
})
