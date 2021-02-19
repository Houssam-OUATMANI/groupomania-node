
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