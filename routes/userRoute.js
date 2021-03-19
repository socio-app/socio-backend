const { Router } = require('express')
const router = Router()

const UserController = require('../controllers/UserController')

// Middlewares
const authentication = require('../middlewares/authentication.js')
const authorized = require('../middlewares/authorized.js')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/:id', authentication, authorized, UserController.getUserById)
router.patch('/:id/dailyReset', authentication, authorized, UserController.dailyReset)
// router.patch('/:id/missionUpdate')
// router.patch('/:id/levelUp')
// router.patch('/:id/expIncrease')

module.exports = router
