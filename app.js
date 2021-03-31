const express = require('express') 
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const { PORT } = process.env

const app = express()

const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/posts.routes')
const postComments = require('./routes/comments.routes')
const postLikes = require('./routes/likes.routes')


const database = require('./config/database')

const UserModel = require('./models/users')
const PostModel = require('./models/posts')
const CommentModel = require('./models/comment')
const PostLikes = require('./models/post.likes')




app.use(cors())
app.use('/public/image',express.static('public/image'))
app.use(express.json())

// middleware use

app.use('/api/auth',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/comments',postComments)
app.use('/api/posts/likes', postLikes)



PostModel.belongsTo(UserModel, {constraints : true , onDelete : 'CASCADE'})
//CommentModel.belongsTo(PostModel)
PostModel.hasMany(CommentModel, {constraints :true, onDelete : 'CASCADE'})
CommentModel.belongsTo(UserModel, {constraints :true, onDelete : 'CASCADE'})
//PostModel.hasMany(CommentModel, {constraints : true, onDelete : 'CASCADE'})
UserModel.hasMany(CommentModel, {constraints : true, onDelete : 'CASCADE'})

// Likes Associations

PostLikes.belongsTo(PostModel)
UserModel.hasMany(PostLikes)



database.sync()
.then(()=>{
    console.log('Database reached ...')
    app.listen(PORT || 5000 , () => PORT ? console.log(`PORT SERVER ${PORT}`) : console.log("SERVER PORT 5000"))
})
.catch(err => console.log(err))
