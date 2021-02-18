const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userValidation = require('../validation/user.validation')
const User = require('../models/users')
const { use } = require('../routes/user.routes')


// INSCRIPTION UTILISATEUR
exports.signup = ((req ,res)=> {
    const { password, email, username } = req.body

    // Validation Server
    const {error} = userValidation(req.body)
    if (error) return res.status(400).json({ error : error.details[0].message})

    // Hash
    bcrypt.hash(password, 12)
    .then(hash =>{
        // creation & sauvegarde DB
        User.create({
            username : username,
            email : email,
            password: hash
        })
        .then(()=> res.status(201).json({message : "User created!"}))
        .catch(err => res.status(400).json({err}))
    })
    .catch(err => res.status(500).json({err}))
})


// CONNEXION UTILISATEUR
exports.login = ((req ,res)=> {
    const {email , password} = req.body

    const {error} = userValidation(req.body)
    if (error) return res.status(400).json({ error : error.details[0].message})

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
                 token : jwt.sign({  userId : user.id}, 'SECRET_KEY', {expiresIn : "5h"})
             })
        })
         // err bcrypt
         .catch(err => res.status(500).json({err}))
    })
    .catch(err => res.status(500).json({err}))
})