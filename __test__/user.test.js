const request = require('supertest')
const app = require('../app')
const { getDatabase, connect, close } = require('../config/mongodb.js')

let id
let access_token
let newUser
let id2

let email = 'adit@mail.com'
let password = '123456'
let name = 'Adit'

beforeAll(async () => {
  await connect()
  const { ops } = await getDatabase()
    .collection('users')
    .insertOne({
      email: 'adit2@mail.com',
      password: '$2a$10$CUb.iEeyseboXAhpIBD2T.nWic5fKJb7zx5uUoiZ/wbNnHVVHS7JK',
      name: 'Adit2',
      statistic: {
        totalSuccessMissions: 0,
        totalFailedMissions: 0,
        totalMissions: 0,
        totalPlayedDays: 0,
      },
      level: 1,
      currentExperience: 0,
      activeMissions: [],
      missionPool: [],
      maxActiveMissions: 2,
      photo:
        'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
      lastOnline: new Date(),
      createdAt: new Date(),
    })
  newUser = ops[0]
  id2 = newUser._id
})

afterAll(async () => {
  await getDatabase().collection('users').deleteMany()
  await close()
})

//punyanya Adit:
describe('POST /users/register', function () {
  //=====SUCCESSFUL=====
  describe('Successful POST /users/register', function () {
    it('should return status 201 with data', function (done) {
      request(app)
        .post('/users/register')
        .send({
          email,
          password,
          name,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
          }
          expect(res.status).toEqual(201)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('access_token')
          expect(typeof res.body.access_token).toEqual('string')
          expect(res.body).toHaveProperty('user')
          expect(typeof res.body.user).toEqual('object')
          done()
        })
    })
  })

  // Failed
  describe('Failed POST /users/register', function () {
    it('should return status 400 because empty email', function (done) {
      request(app)
        .post('/users/register')
        .send({
          email: '',
          password: '123456',
          name: 'Adit',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body.message).toEqual('Invalid format input')
          done()
        })
    })
    it('should return status 400 because empty password', function (done) {
      request(app)
        .post('/users/register')
        .send({
          email: 'adit@mail.com',
          password: '',
          name: 'Adit',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Invalid format input')
          done()
        })
    })
    it('should return status 400 because empty name', function (done) {
      request(app)
        .post('/users/register')
        .send({
          email: 'adit@mail.com',
          password: '123456',
          name: '',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Invalid format input')
          done()
        })
    })
  })
})

//==========LOGIN TEST==========
describe('POST /users/login', function () {
  //=====SUCCESSFUL=====
  describe('Successful POST /users/login', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .post('/users/login')
        .send({
          email: 'adit@mail.com',
          password: '123456',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
          }
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('access_token')
          expect(typeof res.body.access_token).toEqual('string')
          id = res.body._id
          access_token = res.body.access_token
          console.log(id, 'from login')
          console.log(access_token, 'from login')
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
  describe('Failed POST /users/login', function () {
    it('should return status 400 with errors due to empty email', function (done) {
      request(app)
        .post('/users/login')
        .send({
          email: '',
          password: '123456',
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

    it('should return status 400 with errors due to empty email', function (done) {
      request(app)
        .post('/users/login')
        .send({
          email: 123123,
          password: '123456',
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(500)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Internal server error')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Unexpected error.')
          done()
        })
    })

    it('should return status 400 with errors due to wrong email', function (done) {
      request(app)
        .post('/users/login')
        .send({
          email: 'login@mail.com',
          password: '123456',
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
        .post('/users/login')
        .send({
          email: 'adit@mail.com',
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
        .post('/users/login')
        .send({
          email: 'adit@mail.com',
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
  })
})

//punyanya Oki:
//patch: /users/:id/missionUpdate
//header: token
//body: statistic, activeMissions, missionPool (isTaken)
describe('PATCH /users/:id/missionUpdate', function () {
  //=====SUCCESSFUL=====
  describe('Successful PATCH /users/:id/missionUpdate', function () {
    console.log(id, 'dari tempat lain')
    it('should return status 200 with data', function (done) {
      request(app)
        .patch(`/users/${id}/missionUpdate`)
        .set({
          access_token,
        })
        .send({
          statistic: {
            totalSuccessMissions: 2,
            totalFailedMissions: 2,
            totalMissions: 2,
            totalPlayedDays: 2,
          },
          activeMissions: [
            {
              title: 'di update',
            },
          ],
          missionPool: [
            {
              title: 'di update',
            },
          ],
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PATCH /users/:id/missionUpdate test')
          }
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('user')
          expect(res.body.user).toHaveProperty('statistic')
          expect(res.body.user).toHaveProperty('activeMissions')
          expect(res.body.user).toHaveProperty('missionPool')
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed PATCH /users/:id/missionUpdate', function () {
    it('should return status 400 with errors due to empty active missions', function (done) {
      request(app)
        .patch(`/users/${id}/missionUpdate`)
        .set({
          access_token,
        })
        .send({
          statistic: {
            totalSuccessMissions: 2,
            totalFailedMissions: 2,
            totalMissions: 2,
            totalPlayedDays: 2,
          },
          activeMissions: null,
          missionPool: [
            {
              title: 'di update',
            },
          ],
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toContain('Input invalid')
          done()
        })
    })

    it('should return status 400 with errors due to empty statistic', function (done) {
      request(app)
        .patch(`/users/${id}/missionUpdate`)
        .set({
          access_token,
        })
        .send({
          statistic: null,
          activeMissions: [],
          missionPool: [
            {
              title: 'di update',
            },
          ],
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toContain('Input invalid')
          done()
        })
    })

    it('should return status 400 with errors due to empty mission pool', function (done) {
      request(app)
        .patch(`/users/${id}/missionUpdate`)
        .set({
          access_token,
        })
        .send({
          statistic: {},
          activeMissions: [],
          missionPool: null,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST login test')
            done(err)
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toContain('Input invalid')
          done()
        })
    })

    it('should return status 401 with errors due to no access_token', function (done) {
      request(app)
        .patch(`/users/${id}/missionUpdate`)
        .send({
          statistic: {},
          activeMissions: [],
          missionPool: [],
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Unauthorized')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please login first')
          done()
        })
    })
  })
})

// //punyanya Mukti:
describe('PATCH /users/:id/dailyReset', function () {
  //=====SUCCESSFUL=====
  describe('Successful PATCH /users/:id/dailyReset', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .patch(`/users/${id}/dailyReset`)
        .set({
          access_token,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PATCH /users/:id/missionUpdate test')
          }
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('user')
          expect(res.body.user).toHaveProperty('statistic')
          expect(res.body.user).toHaveProperty('activeMissions')
          expect(res.body.user).toHaveProperty('missionPool')
          done()
        })
    })
  })

  //=====FAILED=====
  describe('Failed PATCH /users/:id/dailyReset', function () {
    it('should return status 401 with errors due to no access_token', function (done) {
      request(app)
        .patch(`/users/${id}/missionUpdate`)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST products test')
            done(err)
          }
          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Unauthorized')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please login first')
          done()
        })
    })
  })
})

// //punyanya Amil:
// //===== SUCCESSFUL =====
describe(`GET /users/${id}`, function () {
  it(`Success get users by id with status 200`, function (done) {
    request(app)
      .get(`/users/${id}`)
      .set({ access_token })
      .end((err, res) => {
        if (err) {
          console.log('Error occured at GET UserById test')
          done(err)
        }

        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('name')
        expect(typeof res.body).toEqual('object')
        done()
      })
  })
  //===== FAILED =====
  it(`Failed to get user by id where there is no access_token with status 404`, function (done) {
    request(app)
      .get(`/users/${id}`)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at GET UserById test')
          done(err)
        }

        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('errorCode')
        expect(res.body.message).toEqual('Please login first')
        expect(res.body.errorCode).toEqual('Unauthorized')
        expect(typeof res.body).toEqual('object')
        done()
      })
  })

  it(`Failed to get user, access forbidden with status 403`, function (done) {
    request(app)
      .get(`/users/${id2}`)
      .set({ access_token })
      .end((err, res) => {
        if (err) {
          console.log('Error occured at GET UserById test')
          done(err)
        }

        expect(res.status).toEqual(403)
        done()
      })
  })

  it(`Failed to get user, user is not found 404`, function (done) {
    request(app)
      .get(`/users/${id}`)
      .set({
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU1OTM2YjZjMDQ4NTAzMWU0ZThmYmIiLCJlbWFpbCI6ImFkaXQzQG1haWwuY29tIiwiaWF0IjoxNjE2MjIxMDM1fQ.5Y8qEqYXbN-a2OPeZcmqQ-qK94HZGrgJQBdLwTjmJ9E',
      })
      .end((err, res) => {
        if (err) {
          console.log('Error occured at GET UserById test')
          done(err)
        }

        expect(res.status).toEqual(404)
        done()
      })
  })

  it(`Failed to get user, token is invalid 401`, function (done) {
    request(app)
      .get(`/users/${id}`)
      .set({
        access_token: '123',
      })
      .end((err, res) => {
        if (err) {
          console.log('Error occured at GET UserById test')
          done(err)
        }

        expect(res.status).toEqual(401)
        done()
      })
  })

  // it(`Failed 500?`, function (done) {
  //   request(app)
  //     .get(`/users/123123123`)
  //     .set({
  //       access_token,
  //     })
  //     .end((err, res) => {
  //       if (err) {
  //         console.log('Error occured at GET UserById test')
  //         done(err)
  //       }

  //       expect(res.status).toEqual(500)
  //       done()
  //     })
  // })
})
// /users/:id/expIncrease,statistic, experience
//===== SUCCESSFUL =====
describe(`PATCH /users/${id}/expIncrease`, function () {
  it(`Success update data with status 200`, function (done) {
    let data = {
      statistic: {
        totalSuccessMission: 2,
        totalFailedMissions: 1,
        totalMissions: 1,
        totalPlayedDays: 10,
      },
      activeMissions: [
        {
          title: 'di update',
        },
      ],
      currentExperience: 20,
    }
    request(app)
      .patch(`/users/${id}/expIncrease`)
      .send(data)
      .set({ access_token })
      .end((err, res) => {
        if (err) {
          console.log('Error occured at PATCH users expIncrease test')
          done(err)
        }

        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('user')
        expect(typeof res.body).toEqual('object')
        expect(res.body.user).toHaveProperty('statistic')
        expect(res.body.user).toHaveProperty('currentExperience')
        done()
      })
  })
  // ===== FAILED =====
  it(`Failed update data where there is no access_token with status 404`, function (done) {
    let data = {
      statistic: {
        totalSuccessMission: 2,
        totalFailedMissions: 1,
        totalMissions: 1,
        totalPlayedDays: 10,
      },
      activeMissions: [
        {
          title: 'di update',
        },
      ],
      currentExperience: 20,
    }
    request(app)
      .patch(`/users/${id}/expIncrease`)
      .send(data)
      // .set(`access_token`, access_token)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at PATCH users expIncrease test')
          done(err)
        }

        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errorCode')
        expect(typeof res.body.errorCode).toEqual('string')
        expect(res.body.errorCode).toEqual('Unauthorized')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        expect(res.body.message).toContain('Please login first')
        done()
      })
  })
  // //===== FAILED =====
  it(`Failed to Update data, one of the fields is empty, return 400`, function (done) {
    let data = {
      statistic: null,
      activeMissions: null,
      currentExperience: '',
    }
    request(app)
      .patch(`/users/${id}/expIncrease`)
      .send(data)
      .set(`access_token`, access_token)
      .end((err, res) => {
        if (err) {
          console.log('Error occured at PATCH users expIncrease test')
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errorCode')
        expect(res.body.errorCode).toEqual('Validation error')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toContain('Input invalid')
        done()
      })
  })
})

//   // Failed/punyanya Adit:
describe('PATCH /users/:id/levelUp', function () {
  //=====SUCCESSFUL=====
  describe('Successful PATCH /users/:id/levelUp', function () {
    it('should return status 200 with data', function (done) {
      request(app)
        .patch(`/users/${id}/levelUp`)
        .send({
          statistic: {
            totalSuccessMissions: 2,
            totalFailedMissions: 1,
            totalMissions: 5,
            totalPlayedDays: 5,
          },
          currentExperience: 9,
          level: 2,
          maxActiveMissions: 4,
          activeMissions: [
            {
              title: 'di update',
            },
          ],
        })
        .set({
          access_token,
        })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
          }
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('user')
          expect(res.body.user).toHaveProperty('level')
          expect(res.body.user).toHaveProperty('currentExperience')
          expect(res.body.user).toHaveProperty('statistic')
          expect(res.body.user).toHaveProperty('maxActiveMissions')
          expect(typeof res.body.user.level).toEqual('number')
          done()
        })
    })
  })

  // Failed
  describe('Failed PATCH /users/:id/levelUp', function () {
    it('should return status 400 because empty data', function (done) {
      request(app)
        .patch(`/users/${id}/levelUp`)
        .send({
          statistic: null,
          currentExperience: 9,
          level: 2,
          maxActiveMissions: 4,
        })
        .set({ access_token })
        .end((err, res) => {
          if (err) {
            console.log('Error occured at POST register test')
          }
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(res.body.errorCode).toEqual('Validation error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toContain('Input invalid')
          done()
        })
    })

    it(`Failed update data where there is no access_token with status 404`, function (done) {
      let data = {
        statistic: {
          totalSuccessMission: 2,
          totalFailedMissions: 1,
          totalMissions: 1,
          totalPlayedDays: 10,
        },
        activeMissions: [
          {
            title: 'di update',
          },
        ],
        currentExperience: 20,
        maxActiveMissions: 4,
        level: 4,
      }
      request(app)
        .patch(`/users/${id}/levelUp`)
        .send(data)
        // .set(`access_token`, access_token)
        .end((err, res) => {
          if (err) {
            console.log('Error occured at PATCH users expIncrease test')
            done(err)
          }

          expect(res.status).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errorCode')
          expect(typeof res.body.errorCode).toEqual('string')
          expect(res.body.errorCode).toEqual('Unauthorized')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toContain('Please login first')
          done()
        })
    })
  })
})
