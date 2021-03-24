const router = require('express').Router()
const AdminController = require('../controllers/AdminController.js')

router.post('/register', AdminController.addAdmin)
router.post('/login', AdminController.loginAdmin)

module.exports = router