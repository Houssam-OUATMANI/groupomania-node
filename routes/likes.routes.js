const { Router } = require('express')

const router = Router()

const auth = require('../middleware/authentification')

const { handleLikes } = require('../controllers/likes.ctrl')


router.post('/',auth, handleLikes)


module.exports = router