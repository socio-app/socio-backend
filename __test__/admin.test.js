const request = require('supertest')
const app = require('../app')
const { getDatabase, connect, close } = require('../config/mongodb.js')
const { hashing } = require('../helpers/bcrypt.js')

let id

beforeAll(async () => {
  await connect()
  await getDatabase().collection('admin').insertOne({
    email: 'admin2@mail.com',
    password: hashing('123456')
  })
})

afterAll(async () => {
  await getDatabase().collection('admin').deleteMany()
  await close()
})

describe('POST admin/register/', function () {
  //=====SUCCESSFUL=====
  describe('Successful POST admin/register', function () {
    it('should return status 201 with data', function (done) {
      let data = {
        email: "admin@mail.com",
        password: hashing('123456')
      }
      request(app)
        .post('/admin/register')
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register mission')
          }
          expect(res.status).toEqual(201)
          expect(typeof res.body).toEqual('string')
          done()
        })
    })
    // FAILED
    it('Failed register admin because empty email or password', function (done) {
      let data = {
        email: '',
        password: ''
      }
      request(app)
        .post('/admin/register')
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register admin')
          }
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message')
          expect(res.body).toHaveProperty('errorCode')
          done()
        })
    })
  })
})
describe('POST admin/login/', function () {
  //=====SUCCESSFUL=====
  describe('Successful POST admin/login', function () {
    it('should return status 201 with data', function (done) {
      let data = {
        email: "admin2@mail.com",
        password: '123456'
      }
      request(app)
        .post('/admin/login')
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register mission')
          }
          expect(res.status).toEqual(200)
          done()
        })
    })
    // FAILED
    it('Failed register admin because empty email or password', function (done) {
      let data = {
        email: '',
        password: ''
      }
      request(app)
        .post('/admin/login')
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register admin')
          }
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message')
          expect(res.body).toHaveProperty('errorCode')
          done()
        })
    })
    it('Failed register invalid auth', function (done) {
      let data = {
        email: 'blabla@mail.com',
        password: '123456'
      }
      request(app)
        .post('/admin/login')
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register admin')
          }
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message')
          expect(res.body).toHaveProperty('errorCode')
          done()
        })
    })
    it('Failed register invalid password', function (done) {
      let data = {
        email: 'admin2@mail.com',
        password: '123456789'
      }
      request(app)
        .post('/admin/login')
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register admin')
          }
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message')
          expect(res.body).toHaveProperty('errorCode')
          done()
        })
    })
  })
})
