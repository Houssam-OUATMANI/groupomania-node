const { Router } = require('express')

const router = Router()

const { addPost, getAllPosts  } = require('../controllers/post.ctrl')


router.post('/add-post', addPost)
router.get('/all-posts', getAllPosts)

module.exports = router