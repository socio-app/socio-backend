const { connect } = require('../config/mongodb.js')
const app = require('../app.js')
const port = process.env.PORT || 3001

connect().then(async () => {
  app.listen(port, () => {
    console.log(`Socio server app listening at http://localhost:${port}`)
  })
})