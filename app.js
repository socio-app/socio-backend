if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  require('dotenv').config()

const { connect } = require('./config/mongodb')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
app.use(errorHandler)

// connect().then(async () => {
//   app.listen(port, () => {
//     console.log(`Socio server app listening at http://localhost:${port}`)
//   })
// })

module.exports = app
