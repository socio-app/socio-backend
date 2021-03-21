const { ObjectId } = require('mongodb')

const authorized = (req, res, next) => {
  try {
    const { id } = req.params
    console.log(req.params)
    if (ObjectId(req.user._id) != id) {
      console.log(id, '403 PROC ID')
      console.log(ObjectId(req.user._id, '403 PROC _ID'))
      throw { name: 'error_403_user_forbidden' }
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorized
