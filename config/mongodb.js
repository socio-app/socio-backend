const { MongoClient } = require('mongodb')
const { DATABASE_NAME, DATABASE_URI } = require('./constants')

const uri = DATABASE_URI
const client = new MongoClient(uri, { useUnifiedTopology: true })
let database = null

async function connect() {
  try {
    await client.connect()
    let databaseName = DATABASE_NAME
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

async function close() {
  await client.close()
}

module.exports = {
  connect,
  getDatabase,
  close,
}
