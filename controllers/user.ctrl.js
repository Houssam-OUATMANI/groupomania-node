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
        .then(()=> res.status(201).json({message : "User created!"}))
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
                 token : jwt.sign({  userId : user.id}, 'SECRET_KEY', {expiresIn : "5h"})
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

    console.log(id)
}

// SUPPRESSION COMPTE

exports.deleteAccount = ((req , res)=>{
    const {email , password} = req.body

    const { error } = userValidation(req.body)
    if (error) return res.status(400).json({ error : error.details[0].message})

    User.findOne({where : {email :email}})
    .then(user => {
        if(!user)return res.status(401).json({message : "Unauthorized"})

          // mdp du form est-il pareil que celui dans la db ?
          bcrypt.compare(password, user.password)
          .then(match =>  {
            if (!match) return res.status(401).json({ err: 'Mot de passe incorrect !' })

            user.destroy().then((result)=>{
               res.status(200).json(result)
            })
          })
            // err bcrypt
         .catch(err => res.status(500).json({err}))


    })
    .catch(err => res.status(500).json(err))

})