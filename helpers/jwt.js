const jwt = require('jsonwebtoken')

function generateToken(payload) {
  return jwt.sign(payload, 'secret')
}

function verifyToken(token) {
  try {
    let decoded = jwt.verify(token, 'secret')
    return decoded
  } catch (err) {
    return false
  }
}

module.exports = {
  generateToken,
  verifyToken,
}
