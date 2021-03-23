const { Router } = require('express')
const router = Router()
const MissionController = require('../controllers/MissionController.js')

router.post('/', MissionController.addMission)
router.get('/', MissionController.readMission)
router.get('/:_id', MissionController.getMissionById)
router.put('/:_id', MissionController.updateMission)
router.delete('/:_id', MissionController.deleteMission)

module.exports = router
