const Admin = require('../models/Admin.js')
const { hashing, compare } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class AdminController {
  static async addAdmin(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: 'error_400_no_email_password' }
      const passwordHashed = hashing(password)
      await Admin.insert({ email, password: passwordHashed })
      res.status(201).json('Add new admin successfully')
    } catch (err) {
      next(err)
    }
  }

  static async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: 'error_400_no_email_password' }
      const admin = await Admin.findOne(email)
      if (!admin) throw { name: 'error_400_wrong_email_password' }
      const isValidPassword = compare(password, admin.password)
      if (!isValidPassword) throw { name: 'error_400_wrong_email_password' }
      const access_token = generateToken({
        _id: admin._id,
        email: admin.email
      })
      res.status(200).json({ access_token })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AdminController