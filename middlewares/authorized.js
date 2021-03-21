const { ObjectId } = require('mongodb')

const authorized = (req, res, next) => {
  try {
    const { id } = req.params

    console.log(
      { id },
      { id: ObjectId(req.user._id) },
      'authorizing requesting id to read requested id'
    )
    if (ObjectId(req.user._id) != id) {
      throw { name: 'error_403_user_forbidden' }
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorized
