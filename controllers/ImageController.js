class ImageController {
  static async uploadImage(req, res, next) {
    try {
      console.log(req.files)
      console.log(req.body)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = ImageController