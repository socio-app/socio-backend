const { ObjectId } = require('mongodb')

const authorized = (req, res, next) => {
  try {
    const { id } = req.params
    if (ObjectId(req.user._id) != id) throw { name: 'error_403_user_forbidden' }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorized