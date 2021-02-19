const { Router } = require('express')

const router = Router()

const { addPost  } = require('../controllers/post.ctrl')


router.post('/add-post', addPost)


module.exports = router