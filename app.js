const express = require('express') 
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('./public'))



const { PORT } = process.env
app.listen(PORT || 5000 , () => PORT ? console.log(`PORT SERVER ${PORT}`) : console.log("SERVER PORT 5000"))
