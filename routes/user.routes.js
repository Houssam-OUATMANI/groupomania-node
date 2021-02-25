
const { Router } = require('express')

const router = Router()

const multer = require('../middleware/multer')
const { login, signup, deleteAccount, getUserInfo, updateUserInfo} = require('../controllers/user.ctrl')


router.post('/signup', multer, signup) 

router.post('/login', login)

router.get('/user-info/:id', getUserInfo )

router.put('/update-user/:id',multer, updateUserInfo )

router.delete('/delete-account/:id', deleteAccount)

module.exports = router