const Mission = require('../models/Mission.js')

class MissionController {
  static async addMission(req, res, next) {
    try {
      const { title, experience, description, contributor } = req.body
      if (!title || !experience || !description || !contributor) throw { name: 'error_400_body_invalid' }
      const mission = await Mission.insert({
        title, experience, description,
        contributor, isTaken: false
      })
      console.log(mission.ops[0], 'dari controller')
      res.status(201).json(mission.ops[0])
    } catch (err) {
      next(err)
    }
  }

  static async readMission(req, res, next) {
    try {
      const mission = await Mission.findAll()
      res.status(200).json(mission)
    } catch (err) {
      next(err)
    }
  }

  static async getMissionById(req, res, next) {
    try {
      const mission = await Mission.findById(req.params._id)
      res.status(200).json(mission)
    } catch (err) {
      next(err)
    }
  }

  static async updateMission(req, res, next) {
    try {
      if (!req.body.title || !req.body.experience || !req.body.description || !req.body.contributor) throw { name: 'error_400_body_invalid' }
      await Mission.update({
        _id: req.params._id,
        title: req.body.title,
        experience: req.body.experience,
        description: req.body.description,
        contributor: req.body.contributor,
        isTaken: false
      })
      res.status(200).json('Updated mission successfully')
    } catch (err) {
      next(err)
    }
  }

  static async deleteMission(req, res, next) {
    try {
      await Mission.destroy(req.params._id)
      res.status(200).json('Deleted mission successfully')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MissionController