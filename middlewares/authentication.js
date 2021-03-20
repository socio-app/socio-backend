const User = require('../models/User.js')
const { verifyToken } = require('../helpers/jwt.js')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    console.log(access_token, '<<<<<<<<<<dari authenticate')
    if (!access_token) throw { name: 'error_401_invalid_token' }
    const decoded = verifyToken(access_token)
    if (!decoded) throw { name: 'error_401_invalid_token' }
    const user = await User.findOne(decoded.email)
    if (!user) throw { name: 'error_404_user_not_found' }
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
