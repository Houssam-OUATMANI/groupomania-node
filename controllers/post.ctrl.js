
const Post = require('../models/posts')

exports.addPost = ((req,res)=>{
      const {protocol , file, body } = req

      Post.create({
            title : body.title,
            detail : body.detail,
            imageUrl : `${protocol}://${req.get('host')}/public/image/${file.filename}`
           // userId : req.user.id
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


exports.getAllMyPosts = (req, res)=>{
     const userId = req.params.id
     console.log(userId)
      Post.findAll({ where : { userId : userId }})
      .then(posts =>{
            res.json(posts)
      })
      .catch(error => res.status(500).json(error))
}

exports.updatePost = (req, res)=>{
      const {id} = req.params
      res.json({message : id})
      console.log(id)
}


exports.deletePost = (req, res)=>{
      const {id} = req.params
     res.json({message : id})
     console.log(id)
}