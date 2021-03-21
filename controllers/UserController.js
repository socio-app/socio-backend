const User = require('../models/User')
const Mission = require('../models/Mission.js')
const { generateToken } = require('../helpers/jwt')
const { hashing, compare } = require('../helpers/bcrypt')

class UserController {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body

      if (!email || !password) throw { name: 'error_400_no_email_password' }
      if (typeof email !== 'string') throw { name: 'unknown error' }

      const user = await User.findOne(email)
      if (!user) {
        throw { name: 'error_400_wrong_email_password' }
      }
      if (!compare(password, user.password)) {
        throw { name: 'error_400_wrong_email_password' }
      }

      const access_token = generateToken({
        _id: user._id,
        email: user.email,
      })

      console.log({ access_token }, { user }, 'Login user')
      res.status(200).json({
        access_token,
        user: {
          name: user.name,
          statistic: user.statistic,
          level: user.level,
          currentExperience: user.currentExperience,
          activeMissions: user.activeMissions,
          missionPool: user.missionPool,
          maxActiveMissions: user.maxActiveMissions,
          photo: user.photo,
          lastOnline: user.lastOnline,
          createdAt: user.createdAt,
          _id: user._id,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    try {
      let { name, email, password } = req.body

      if (!email || !password || !name) {
        throw { name: 'error_400_no_email_password_name' }
      }
      password = hashing(password)

      const foundUser = await User.findOne(email)
      if (foundUser) throw { name: 'error_400_email_is_used' }

      const missions = await Mission.findAll()

      let input = {
        email,
        password,
        name,
        statistic: {
          totalSuccessMissions: 0,
          totalFailedMissions: 0,
          totalMissions: 0,
          totalPlayedDays: 0,
        },
        level: 1,
        currentExperience: 0,
        activeMissions: [],
        missionPool: [...missions],
        maxActiveMissions: 2,
        photo:
          'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
        lastOnline: new Date(),
        createdAt: new Date(),
      }
      const { ops } = await User.create(input)
      const access_token = generateToken({
        _id: ops[0]._id,
        email: ops[0].email,
      })

      console.log({ access_token }, { user: ops[0] }, 'Created new user')
      res.status(201).json({
        access_token,
        user: {
          name: ops[0].name,
          statistic: ops[0].statistic,
          level: ops[0].level,
          currentExperience: ops[0].currentExperience,
          activeMissions: ops[0].activeMissions,
          missionPool: ops[0].missionPool,
          maxActiveMissions: ops[0].maxActiveMissions,
          photo: ops[0].photo,
          lastOnline: ops[0].lastOnline,
          createdAt: ops[0].createdAt,
          _id: ops[0]._id,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = req.user

      console.log({ _id: user._id }, 'Fetching single user')
      res.status(200).json({
        user: {
          name: user.name,
          statistic: user.statistic,
          level: user.level,
          currentExperience: user.currentExperience,
          activeMissions: user.activeMissions,
          missionPool: user.missionPool,
          maxActiveMissions: user.maxActiveMissions,
          photo: user.photo,
          lastOnline: user.lastOnline,
          createdAt: user.createdAt,
          _id: user._id,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  static async dailyReset(req, res, next) {
    try {
      const missions = await Mission.findAll()
      const { _id } = req.user
      const updated = await User.resetDaily({
        _id,
        missionPool: missions,
      })

      console.log({ _id }, 'Daily reset mission for user')
      res.status(200).json({
        user: {
          name: updated.value.name,
          statistic: updated.value.statistic,
          level: updated.value.level,
          currentExperience: updated.value.currentExperience,
          activeMissions: updated.value.activeMissions,
          missionPool: updated.value.missionPool,
          maxActiveMissions: updated.value.maxActiveMissions,
          photo: updated.value.photo,
          lastOnline: updated.value.lastOnline,
          createdAt: updated.value.createdAt,
          _id: updated.value._id,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  static async missionUpdate(req, res, next) {
    try {
      const { _id } = req.user
      const { statistic, activeMissions, missionPool } = req.body

      if (!statistic || !activeMissions || !missionPool)
        throw { name: 'error_400_body_invalid' }

      const updated = await User.missionUpdate({
        _id,
        statistic,
        activeMissions,
        missionPool,
      })

      console.log({ _id }, 'Mission update for user')
      res.status(200).json({
        user: {
          name: updated.value.name,
          statistic: updated.value.statistic,
          level: updated.value.level,
          currentExperience: updated.value.currentExperience,
          activeMissions: updated.value.activeMissions,
          missionPool: updated.value.missionPool,
          maxActiveMissions: updated.value.maxActiveMissions,
          photo: updated.value.photo,
          lastOnline: updated.value.lastOnline,
          createdAt: updated.value.createdAt,
          _id: updated.value._id,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  static async levelUp(req, res, next) {
    try {
      const { _id } = req.user
      const {
        statistic,
        activeMissions,
        level,
        currentExperience,
        maxActiveMissions,
      } = req.body

      if (
        !statistic ||
        !activeMissions ||
        currentExperience === null ||
        !level ||
        !maxActiveMissions
      ) {
        throw { name: 'error_400_body_invalid' }
      }

      const updated = await User.levelUp({
        _id,
        statistic,
        activeMissions,
        level,
        currentExperience,
        maxActiveMissions,
      })

      console.log({ _id }, 'Level up user')
      res.status(200).json({
        user: {
          name: updated.value.name,
          statistic: updated.value.statistic,
          level: updated.value.level,
          currentExperience: updated.value.currentExperience,
          activeMissions: updated.value.activeMissions,
          missionPool: updated.value.missionPool,
          maxActiveMissions: updated.value.maxActiveMissions,
          photo: updated.value.photo,
          lastOnline: updated.value.lastOnline,
          createdAt: updated.value.createdAt,
          _id: updated.value._id,
        },
      })
    } catch (err) {
      next(err)
    }
  }

  static async expIncrease(req, res, next) {
    try {
      const { _id } = req.user
      const { statistic, activeMissions, currentExperience } = req.body
      if (!statistic || !activeMissions || currentExperience === null) {
        throw { name: 'error_400_body_invalid' }
      }

      const updated = await User.expIncrease({
        _id,
        statistic,
        activeMissions,
        currentExperience,
      })

      console.log({ _id }, 'Exp increase user')
      res.status(200).json({
        user: {
          name: updated.value.name,
          statistic: updated.value.statistic,
          level: updated.value.level,
          currentExperience: updated.value.currentExperience,
          activeMissions: updated.value.activeMissions,
          missionPool: updated.value.missionPool,
          maxActiveMissions: updated.value.maxActiveMissions,
          photo: updated.value.photo,
          lastOnline: updated.value.lastOnline,
          createdAt: updated.value.createdAt,
          _id: updated.value._id,
        },
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
