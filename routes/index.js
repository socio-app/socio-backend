const { Router } = require('express')
const router = Router()
const userRoute = require('./userRoute')

const { upload } = require('../middlewares/multer')

router.use('/users', userRoute)

module.exports = router
