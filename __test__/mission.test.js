const request = require('supertest')
const app = require('../app')
const { getDatabase, connect, close } = require('../config/mongodb.js')

let id

beforeAll(async () => {
  await connect()
})

afterAll(async () => {
  await getDatabase().collection('missions').deleteMany()
  await close()
})

describe('POST /missions/', function () {
  //=====SUCCESSFUL=====
  describe('Successful POST /missions/', function () {
    it('should return status 201 with data', function (done) {
      let data = {
        title: "test",
        experience: 5,
        description: "testlalal",
        contributor: "razormangs"
      }
      request(app)
        .post('/missions/')
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register mission')
          }
          expect(res.status).toEqual(201)
          expect(res.body).toHaveProperty("_id")
          expect(typeof res.body._id).toEqual("string")
          id = res.body._id
          done()
        })
    })
    // FAILED
    it('Failed to create mission with one of field is required', function (done) {
      let data = {
        title: null,
        experience: null,
        description: "",
        contributor: "razormangs"
      }
      request(app)
        .post('/missions/')
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register mission')
          }
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message')
          expect(res.body).toHaveProperty('errorCode')
          done()
        })
    })
  })
})

describe('GET /missions/', function () {
  //=====SUCCESSFUL=====
  describe('Successful GET /missions/', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .get('/missions/')
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET mission')
          }
          expect(res.status).toEqual(200)
          done()
        })
    })
  })
})

describe('GET MISSIONBYID /missions/:_id', function () {
  //=====SUCCESSFUL=====
  describe('Successful GET MISSIONBYID /missions/:_id', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .get(`/missions/${id}`)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET mission')
          }
          expect(res.status).toEqual(200)
          done()
        })
    })
  })
})

describe('PUT MISSION /missions/:_id', function () {
  //=====SUCCESSFUL=====
  describe('Successful PUT MISSION /missions/:_id', function () {
    it('should return status 200 with data', function (done) {
      let data = {
        title: "test",
        experience: 5,
        description: "testlalal",
        contributor: "razormangs"
      }
      request(app)
        .put(`/missions/${id}`)
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET mission')
          }
          expect(res.status).toEqual(200)
          done()
        })
    })
  })
  // FAILED
  it('Failed to update mission with one of field is required', function (done) {
    let data = {
      title: null,
      experience: null,
      description: "",
      contributor: "razormangs"
    }
    request(app)
      .put(`/missions/${id}`)
      .send(data)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at POST register mission')
        }
        expect(res.status).toEqual(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('errorCode')
        done()
      })
  })
})

describe('DELETE MISSION /missions/:_id', function () {
  //=====SUCCESSFUL=====
  describe('Successful DELETE MISSION /missions/:_id', function () {
    it('should return status 200 with data', function (done) {
      let data = {
        title: "test",
        experience: 5,
        description: "testlalal",
        contributor: "razormangs"
      }
      request(app)
        .delete(`/missions/${id}`)
        .send(data)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at GET mission')
          }
          expect(res.status).toEqual(200)
          done()
        })
    })
  })
})
