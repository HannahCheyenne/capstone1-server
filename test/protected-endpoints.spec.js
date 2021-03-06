const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`Protected endpoints`, () => {
    let db

    const {
        testUsers,
        testAffirmations,
        testComments,
        testJournals
    } = helpers.makeAppFixtures()

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    beforeEach('insert stuff', () => 
        helpers.seedAppTables(
        db, 
        testUsers,
        testAffirmations,
        testJournals,
        testComments
    ))

    const protectedEndpoints = [
        // { // MADE THESE ENDPOINTS NOT PROTECTED
        //   name: 'GET /api/affirmations/:affirmation_id',
        //   path: '/api/affirmations/1',
        //   method: supertest(app).get,
        // },
        // {
        //   name: 'GET /api/affirmations/:affirmation_id/comments',
        //   path: '/api/affirmations/1/comments',
        //   method: supertest(app).get,
        // },
        {
          name: 'POST /api/comments',
          path: '/api/comments',
          method: supertest(app).post,
        },
    ]

    protectedEndpoints.forEach(endpoint => {
      describe(endpoint.name, () => {
        it(`responds with 401 'Missing bearer token' when no bearer token`, () => {
          return endpoint.method(endpoint.path)
            .expect(401, { error: `Missing bearer token` })
        })
        it(`reponds 401 'Unauthorized request' when invalid JWT secret`, () => {
          const validUser = testUsers[0]
          const invalidSecret = 'bad-secret'
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
            .expect(401, { error: `Unauthorized request` })
        })
        it(`responds with 401 'Unauthorized request' when invalid sub in payload`, () => {
          const invalidUser = { user_name: 'user-not-existy', id: 1 }
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(invalidUser))
            .expect(401, { error: `Unauthorized request` })
        })
      })       
    })


  })