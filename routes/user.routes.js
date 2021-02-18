const { Router } = require('express')

const router = Router()

const { login, signup } = require('../controllers/user.ctrl')


router.post('/signup', signup) 

router.post('/login',login)

module.exports = router