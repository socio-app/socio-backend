class ImageController {
  static async uploadImage(req, res, next) {
    try {
      console.log('MASUK UPLOAD IMAGE')
      console.log(req.file, '<<< REQ FILE')
      console.log(req.body, '<<<REQ BODY')
      if (req.file == undefined) {
        console.log('TIDAK ADA FILES')
        res.status(400).json('TIDAK ADA FILES')
      } else {
        console.log('GAMBAR ADDED!')
        res.status(200).json({ url: req.file })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = ImageController
