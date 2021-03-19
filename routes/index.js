const { Router } = require('express')
const router = Router()
const userRoute = require('./userRoute')
// const missionRoute = require('./missionRoute')

router.use('/users', userRoute)
// router.use('/missions', missionRoute)

module.exports = router
