const express = require('express') 
const cors = require('cors')
require('dotenv').config()
const { PORT } = process.env

const app = express()

const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/posts.routes')

const database = require('./config/database')

const UserModel = require('./models/users')
const PostModel = require('./models/posts')


app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

// middleware user

app.use((req, res, next)=>{
    UserModel.findByPk(1)
    .then(user =>{
        req.user = user
        next()
    })
    .catch(err => console.log(err))
})

app.use('/api/auth',userRoutes)
app.use('/api/auth',postRoutes)




PostModel.belongsTo(UserModel, {constraints : true , onDelete : 'CASCADE'} )

database.sync()
.then(()=>{
    console.log('Database reached ...')
    app.listen(PORT || 5000 , () => PORT ? console.log(`PORT SERVER ${PORT}`) : console.log("SERVER PORT 5000"))
})
.catch(err => console.log(err))
