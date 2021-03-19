const request = require('supertest')
const { User, sequelize } = require('../models')
const app = require('../app')
const { generateToken } = require('../helpers/jwt');

let id;
let access_token;

beforeAll(() => {
  access_token = generateToken({
    id: 1,
    email: "usertest@mail.com"
  })
})

//==========LOGIN TEST==========
describe('POST /login', function () {
  //=====SUCCESSFUL=====
  describe('Successful POST /login', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .post('/login')
        .send({
          email,
          password,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
          }
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          // expect(res.body).toHaveProperty('id')
          // expect(typeof res.body.id).toEqual('number')
          // expect(res.body.id).toEqual(id)
          // expect(res.body).toHaveProperty('email')
          // expect(typeof res.body.email).toEqual('string')
          // expect(res.body.email).toEqual(email)
          // expect(res.body).toHaveProperty('access_token')
          // expect(typeof res.body.access_token).toEqual('string')
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed POST /login', function () {
    it('should return status 400 with errors due to empty email', function (done) {
      request(app)
        .post('/login')
        .send({
          email: '',
          password,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please enter email and password')
          done()
        })
    })

    it('should return status 400 with errors due to wrong email', function (done) {
      request(app)
        .post('/login')
        .send({
          email: 'login@mail.com',
          password,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Wrong email or password')
          done()
        })
    })

    it('should return status 400 with errors due to empty password', function (done) {
      request(app)
        .post('/login')
        .send({
          email,
          password: '',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please enter email and password')
          done()
        })
    })

    it('should return status 400 with errors due to wrong password', function (done) {
      request(app)
        .post('/login')
        .send({
          email,
          password: 'login',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Wrong email or password')
          done()
        })
    })

    it('should return status 403 with errors due to login using Customer role', function (done) {
      request(app)
        .post('/login')
        .send({
          email: 'customer@mail.com',
          password: 'customer123',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Forbidden access')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Only Admin are allowed to access')
          done()
        })
    })
  })
})

//punyanya Oki:

//punyanya Mukti:

//punyanya Amil:
//===== SUCCESSFUL =====
describe(`GET /users/${id}`, function() {
  it(`Success get users by id with status 200`, function(done) {
    request(app)
      .get(`/users/${id}`)
      .set(`access_token`, access_token)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at GET UserById test')
          done(err)
        }

        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('access_token', expect.any(String))
        expect(res.body).toHaveProperty('email', res.body.email)
        expect(typeof res.body).toEqual('object')
        expect(typeof res.body.access_token).toEqual('string')
        expect(typeof res.body.email).toEqual('string')
        done()
      })
  })
  //===== FAILED =====
  it(`Failed to get user by id where there is no access_token with status 404`, function(done) {
    request(app)
      .get(`/users/${id}`)
      // .set(`access_token`, access_token)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at GET UserById test')
          done(err)
        }

        expect(res.status).toEqual(404)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('Invalid Access Token')
        expect(typeof res.body).toEqual('object')
        done()
      })
  })
})
// /users/:id/expIncrease,statistic, experience
//===== SUCCESSFUL =====
describe(`PATCH /users/${id}/expIncrease`, function() {
  it(`Success update data with status 200`, function(done) {
    let data = {
      statistic: {
        totalSuccessMission: 2,
        totalFailedMissions: 1,
        totalMissions: 1,
        totalPlayedDays: 10
      },
      currentExperience: 20
    }
    request(app)
      .patch(`users/${id}/expIncrease`)
      .send(data)
      .set(`access_token`, access_token)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at PATCH users expIncrease test')
          done(err)
        }

        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('statistic')
        expect(res.body).toHaveProperty('currentExperience')
        expect(typeof res.body).toEqual('object')
        expect(typeof res.body.statistic).toEqual('object')
        expect(typeof res.body.currentExperience).toEqual('number')
      })
  })
  //===== FAILED =====
  it(`Failed update data where there is no access_token with status 404`, function(done) {
    let data = {
      statistic: {
        totalSuccessMission: 2,
        totalFailedMissions: 1,
        totalMissions: 1,
        totalPlayedDays: 10
      },
      currentExperience: 20
    }
    request(app)
      .patch(`users/${id}/expIncrease`)
      .send(data)
      // .set(`access_token`, access_token)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at PATCH users expIncrease test')
          done(err)
        }

        expect(res.status).toEqual(404)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('Invalid Access Token')
        expect(typeof res.body).toEqual('object')
        done()
      })
  })
  //===== FAILED =====
  it(`Failed to Update data, one of the fields is empty, return 400`, function(done) {
    let data = {
      statistic: {
        totalSuccessMission: '',
        totalFailedMissions: '',
        totalMissions: '',
        totalPlayedDays: 10
      },
      currentExperience: ''
    }
    request(app)
      .patch(`users/${id}/expIncrease`)
      .send(data)
      .set(`access_token`, access_token)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at PATCH users expIncrease test')
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('message', expect.any(Array))
        expect(res.body.message).toBe([
          'statistic.totalSuccesMission is empty',
          'statistic.totalFailedMission is empty',
          'statistic.totalMission is empty',
          'currentExperience is empty'
        ])
        expect(res.body.message.length).toBeGreaterThan(0)
        expect(typeof res.body).toEqual('object')
        done()
      })
  })
  //===== FAILED =====
  it(`Failed to Update Data with DataTypes for property/key with not number return status 400`, function(done) {
    let data = {
      statistic: {
        totalSuccessMission: 20,
        totalFailedMissions: 10,
        totalMissions: 'lala',
        totalPlayedDays: 10
      },
      currentExperience: 'testfailed'
    }
    request(app)
      .patch(`users/${id}/expIncrease`)
      .send(data)
      .set(`access_token`, access_token)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at PATCH users expIncrease test')
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('message', expect.any(Array))
        expect(res.body.message).toBe([
          'currentExperience is empty'
        ])
        expect(res.body.message.length).toBeGreaterThan(0)
        expect(typeof res.body).toEqual('object')
        done()
      })
  })
})

//punyanya Adit:
