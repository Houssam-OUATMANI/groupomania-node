const { Router } = require('express')

const router = Router()

const { addComment  } = require('../controllers/comments.ctrl')


router.post('/add-comment', addPost)

module.exports = router