
const { Router } = require('express')

const router = Router()

const multer = require('../middleware/multer')
const auth = require('../middleware/authentification')
const { login, signup, deleteAccount, getUserInfo, updateUserInfo} = require('../controllers/user.ctrl')


router.post('/signup', multer, signup) 

router.post('/login', login)

router.get('/user-info/:id',auth, getUserInfo )

router.put('/update-user/:id' ,auth,multer, updateUserInfo )

router.post('/delete-account/:id' ,auth , deleteAccount)
//router.get('/delete-account/:id'  , deleteAccount)


module.exports = router