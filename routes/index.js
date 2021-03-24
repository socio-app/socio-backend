const { Router } = require('express')
const router = Router()
const userRoute = require('./userRoute')
const missionRoute = require('./missionRoute.js')
const adminRoutes = require('./adminRoutes.js')

const { upload } = require('../middlewares/multer')

router.use('/users', userRoute)
router.use('/missions', missionRoute)
router.use('/admin', adminRoutes)

module.exports = router
