const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class User {
  static findOne(email) {
    return getDatabase().collection('users').findOne({ email })
  }

  static create(user) {
    return getDatabase().collection('users').insertOne(user)
  }

  static resetDaily(payload) {
    return getDatabase().collection('users').findOneAndUpdate(
      {
        _id: ObjectId(payload._id)
      },
      {
        $set: {
          activeMissions: [],
          missionPool: payload.missionPool,
          lastOnline: new Date()
        }
      },
      { returnOriginal: false }
    )
  }

  static missionUpdate(payload) {
    return getDatabase().collection('users').findOneAndUpdate(
      {
        _id: ObjectId(payload._id)
      },
      {
        $set: {
          statistic: payload.statistic,
          missionPool: payload.missionPool,
          activeMissions: payload.activeMissions
        }
      },
      { returnOriginal: false }
    )
  }
}

module.exports = User
