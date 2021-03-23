const { Router } = require('express')
const router = Router()
const MissionController = require('../controllers/MissionController.js')
const checkIdMission = require('../middlewares/checkIdMission.js')

router.post('/', MissionController.addMission)
router.get('/', MissionController.readMission)
router.put('/:_id', checkIdMission, MissionController.updateMission)
router.delete('/:_id', MissionController.deleteMission)

module.exports = router
