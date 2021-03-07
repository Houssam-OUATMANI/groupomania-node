const { Router } = require('express')

const router = Router()

const { addComment, deleteComment  } = require('../controllers/comments.ctrl')


router.post('/add-comment', addComment)
router.delete('/delete-comment/:id', deleteComment)


module.exports = router