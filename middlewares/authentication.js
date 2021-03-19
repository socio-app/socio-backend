const User = require('../models/User.js')
const { verifyToken } = require('../helpers/jwt.js')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    const decoded = verifyToken(access_token)
    if (!decoded) throw { name: 'error_401_invalid_token' }
    const user = await User.findOne(decoded.email)
    if (!user) throw { name: 'error_401_invalid_token' }
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication