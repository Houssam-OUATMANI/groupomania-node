const { Router } = require('express')

const router = Router()

const multer = require('../middleware/multer')
const { addPost, getAllPosts, getAllMyPosts, updatePost, deletePost } = require('../controllers/post.ctrl')


router.post('/add-post',multer, addPost)
router.get('/all-posts', getAllPosts)
router.get('/get-my-posts/:id', getAllMyPosts)
router.put('/update-post/:id', updatePost)
router.delete('/delete-post/:id', deletePost)

module.exports = router