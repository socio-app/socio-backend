const { getDatabase } = require('../config/mongodb')

class Mission {
  static findAll() {
    return getDatabase().collection('missions').find().toArray()
  }
}

module.exports = Mission
