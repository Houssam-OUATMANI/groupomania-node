
const Post = require('../models/posts')

exports.addPost = ((req,res)=>{
      Post.create({
            ...req.body,
            userId : req.user.id
      })
      .then((result)=>{
            res.status(200).json(result)
      })
      .catch(err => res.json(err))
})


exports.getAllPosts = ((req, res)=>{

      Post.findAll()
      .then(response =>{
           console.log(response) 
            res.status(200).json(response)

      })
      .catch(err => res.status(500).json({message : err}))
})