const Mission = require('../models/Mission.js')

const checkIdMission = async (req, res, next) => {
  try {
    console.log('masuk middleware', req.params._id)
    const mission = await Mission.findById(req.params._id)
    console.log(mission, '<<<Missions')
    if (!mission) throw { name: 'error_404_not_found' }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = checkIdMission