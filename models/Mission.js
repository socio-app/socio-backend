const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb')

class Mission {
  static findAll() {
    return getDatabase().collection('missions').find().toArray()
  }
  static findById(_id) {
    console.log('masuk model')
    return getDatabase().collection('missions').findOne({ _id: ObjectId(_id) })
  }
  static insert(payload) {
    return getDatabase().collection('missions').insertOne(payload)
  }
  static update(payload) {
    const filter = { _id: ObjectId(payload._id) }
    const updateDoc = {
      $set: {
        title: payload.title,
        experience: payload.experience,
        description: payload.description,
        contributor: payload.contributor,
        isTaken: payload.isTaken
      },
    }
    return getDatabase().collection('missions').updateOne(filter, updateDoc)
  }
  static destroy(_id) {
    return getDatabase().collection('missions').deleteOne({ _id: ObjectId(_id) })
  }
}

module.exports = Mission
