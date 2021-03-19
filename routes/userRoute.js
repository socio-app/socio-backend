const { Router } = require('express')
const router = Router()

const UserController = require('../controllers/UserController')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
// router.get('/:id')
// router.patch('/:id/dailyReset')
// router.patch('/:id/missionUpdate')
// router.patch('/:id/levelUp')
// router.patch('/:id/expIncrease')

module.exports = router
