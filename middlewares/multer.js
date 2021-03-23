var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
const { AWS_ID, AWS_SECRET } = require('../config/constants')

const s3 = new aws.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
})

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'socio-images',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
  }),
}).array('newImage', 3)

module.exports = { upload }
