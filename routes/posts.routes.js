const { Router } = require('express')

const router = Router()

const multer = require('../middleware/multer')
const auth = require('../middleware/authentification')

const { addPost, getAllPosts, getAllMyPosts, updatePost, deletePost } = require('../controllers/post.ctrl')


router.post('/add-post' ,auth,multer, addPost)
router.get('/all-posts', getAllPosts)
router.get('/get-my-posts/:id',auth, getAllMyPosts)
router.put('/update-post/:id',auth, multer, updatePost)
router.post('/delete-post/:id', auth, deletePost)

module.exports = router