const { Router } = require('express')

const router = Router()

const { adminLogin } = require('../controllers/admin.ctrl')
router.post('/login', adminLogin)


module.exports = router