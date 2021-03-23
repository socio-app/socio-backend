const { Router } = require('express')
const router = Router()
const userRoute = require('./userRoute')
const ImageController = require('../controllers/ImageController.js')
// const missionRoute = require('./missionRoute')

const { upload } = require('../middlewares/multer')

router.use('/users', userRoute)
// router.use('/missions', missionRoute)
router.post('/images', upload, ImageController.uploadImage)

module.exports = router
