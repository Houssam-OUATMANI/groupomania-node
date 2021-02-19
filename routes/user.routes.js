const { Router } = require('express')

const router = Router()

const { login, signup, deleteAccount } = require('../controllers/user.ctrl')


router.post('/signup', signup) 

router.post('/login', login)

router.delete('/delete-account', deleteAccount)

module.exports = router