const { Router } = require('express')
const router = Router()
const { upload } = require('../middlewares/multer')

const UserController = require('../controllers/UserController')

// Middlewares
const authentication = require('../middlewares/authentication.js')
const authorized = require('../middlewares/authorized.js')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/:id', authentication, authorized, UserController.getUserById)
router.patch(
  '/:id/dailyReset',
  authentication,
  authorized,
  UserController.dailyReset
)
router.patch(
  '/:id/missionUpdate',
  authentication,
  authorized,
  UserController.missionUpdate
)
router.patch('/:id/levelUp', authentication, authorized, UserController.levelUp)
router.patch(
  '/:id/expIncrease',
  upload,
  authentication,
  authorized,
  UserController.expIncrease
)

module.exports = router
