const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/constants')

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET)
}

function verifyToken(token) {
  try {
    let decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (err) {
    return false
  }
}

module.exports = {
  generateToken,
  verifyToken,
}
