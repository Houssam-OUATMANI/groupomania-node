const Comment = require('../models/comment')


exports.addComment = (req, res)=>{
      Comment.create({
            ...req.body
      })
      .then(()=>{
            res.json({message : "Comment created"})
      })
      .catch(error => res.status(500).json({error : error}))
}

exports.deleteComment = (req, res)=>{
      
      const { id } = req.params
      Comment.destroy({where : {id : id}})
      .then(res.status(200).json({message : "Comment deleted"}))
      .catch(error => res.status(500).json({message : error}))
}