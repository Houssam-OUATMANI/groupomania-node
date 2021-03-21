
const Post = require('../models/posts')
const User = require('../models/users')
const Comment = require('../models/comment')


exports.addPost = ((req,res)=>{
      const {protocol , file, body } = req

      Post.create({
            title : body.title,
            detail : body.detail,
            imageUrl : `${protocol}://${req.get('host')}/public/image/${file.filename}`,
            userId : body.userId
      })
      .then((result)=>{
            res.status(200).json(result)
      })
      .catch(err => res.json(err))
})


exports.getAllPosts = ((req, res)=>{
      Post.findAll({
            include :[
                  {model :User, attributes: {exclude: ['id', 'email', 'password', 'createdAt', 'updatedAt']}},
                  {model: Comment, include : [User] }
                  //{model : Comment}
            ],
            order:[ ['createdAt', 'DESC'] ,[Comment,'createdAt', 'DESC' ] ]
      }
      )
      .then(response =>{
            
           console.log(response) 
            res.status(200).json(response)

      })
      .catch(err => {
            console.log(err)
            res.status(500).json({message : err})
      }
)})


exports.getAllMyPosts = (req, res)=>{
     const userId = req.params.id
     console.log(userId)
      Post.findAll({ where : { userId : userId }, include : [
            {model : User , attributes : { exclude : ['id','email', 'password', 'createdAt', 'updatedAt' ]}},
            {model: Comment, include : [User] }
      ],
      order:[ ['createdAt', 'DESC'] ,[Comment,'createdAt', 'DESC' ] ]
})
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
   
   Post.destroy({where : {id : id }})
   .then(()=> res.status(200).json({message : "Publication suprimée"}))
   .catch(error => res.status(500).json(error))
}