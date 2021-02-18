const express = require('express') 
const cors = require('cors')
require('dotenv').config()
const { PORT } = process.env

const app = express()

const userRoutes = require('./routes/user.routes')
const database = require('./config/database')

app.use(cors())
app.use(express.json())
app.use(express.static('./public'))


app.use('/api/auth',userRoutes)




database.sync()
.then(()=>{
    console.log('Database reached ...')
    app.listen(PORT || 5000 , () => PORT ? console.log(`PORT SERVER ${PORT}`) : console.log("SERVER PORT 5000"))
})
.catch(err => console.log(err))
