const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb')

class Admin {
  static findOne(email) {
    return getDatabase().collection('admin').findOne({ email })
  }
  static insert(payload) {
    return getDatabase().collection('admin').insertOne(payload)
  }
}

module.exports = Admin
