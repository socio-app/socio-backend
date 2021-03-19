require('dotenv').config()
const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, { useUnifiedTopology: true })
let database = null

async function connect() {
  try {
    await client.connect()
    let databaseName
    if (process.env.NODE_ENV === 'development') {
      databaseName = 'socio_development'
    } else if (process.env.NODE_ENV === 'test') {
      databaseName = 'socio_test'
    } else if (process.env.NODE_ENV === 'production') {
      databaseName = 'socio_production'
    }
    const db = client.db(databaseName)
    database = db

    return database
  } catch (err) {
    console.log(err)
  }
}

function getDatabase() {
  return database
}

module.exports = {
  connect,
  getDatabase,
}
