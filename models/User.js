const { getDatabase } = require('../config/mongodb')

class User {
  static findOne(email) {
    return getDatabase().collection('users').findOne({ email })
  }

  static create(user) {
    return getDatabase().collection('users').insertOne(user)
  }
}

module.exports = User
