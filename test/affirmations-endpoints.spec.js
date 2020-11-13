const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Affirmations Endpoints', function() {
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


  describe(`GET /api/affirmations`, () => {
    context(`Given no affirmations`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/affirmations')
          .expect(200, [])
      })
    })

    context('Given there are affirmations in the database', () => {
      beforeEach('insert affirmations', () =>
        helpers.seedAppTables(
          db,
          testUsers,
          testAffirmations,
          testJournals,
          testComments
        )
      )

      it('responds with 200 and all of the affirmations', () => {
        const expectedAffirmations = testAffirmations.map(affirmation =>
          helpers.makeExpectedAffirmation(
            testUsers,
            affirmation,
            testComments,
          )
        )
        return supertest(app)
          .get('/api/affirmations')
          .expect(200, expectedAffirmations)
      })
    })

    context(`Given an XSS attack affirmation`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousAffirmation,
        expectedAffirmation,
      } = helpers.makeMaliciousAffirmation(testUser)

      beforeEach('insert malicious affirmation', () => {
        return helpers.seedMaliciousAffirmation(
          db,
          testUser,
          maliciousAffirmation,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/affirmations`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedAffirmation.title)
            expect(res.body[0].content).to.eql(expectedAffirmation.content)
          })
      })
    })
  })

  describe(`GET /api/affirmations/:affirmation_id`, () => {
    context(`Given no affirmations`, () => {
      beforeEach(() => 
        helpers.seedUsers(db, testUsers)
      )
      it(`responds with 404`, () => {
        const affirmationId = 123456
        return supertest(app)
          .get(`/api/affirmations/${affirmationId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Affirmation doesn't exist` })
      })
    })

    context('Given there are affirmations in the database', () => {
      beforeEach('insert affirmations', () =>
        helpers.seedAppTables(
          db,
          testUsers,
          testAffirmations,
          testJournals,
          testComments
        )
      )

      it('responds with 200 and the specified affirmation', () => {
        const affirmationId = 2
        const expectedAffirmation = helpers.makeExpectedAffirmation(
          testUsers,
          testAffirmations[affirmationId - 1],
          testComments,
        )

        return supertest(app)
          .get(`/api/affirmations/${affirmationId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedAffirmation)
      })
    })

    context(`Given an XSS attack affirmation`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousAffirmation,
        expectedAffirmation,
      } = helpers.makeMaliciousAffirmation(testUser)

      beforeEach('insert malicious affirmation', () => {
        return helpers.seedMaliciousAffirmation(
          db,
          testUser,
          maliciousAffirmation,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/affirmations/${maliciousAffirmation.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedAffirmation.title)
            expect(res.body.content).to.eql(expectedAffirmation.content)
          })
      })
    })
  })

  describe(`GET /api/affirmations/:affirmation_id/comments`, () => {
    context(`Given no affirmations`, () => {

      beforeEach(() => 
        helpers.seedUsers(db, testUsers)
      )
      it(`responds with 404`, () => {
        const affirmationId = 123456
        return supertest(app)
          .get(`/api/affirmations/${affirmationId}/comments`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Affirmation doesn't exist` })
      })
    })

    context('Given there are comments for affirmation in the database', () => {
      beforeEach('insert affirmations', () =>
        helpers.seedAppTables(
          db,
          testUsers,
          testAffirmations,
          testJournals,
          testComments
        )
      )

      it('responds with 200 and the specified comments', () => {
        const affirmationId = 1
        const expectedComments = helpers.makeExpectedAffirmationComments(
          testUsers, affirmationId, testComments
        )

        return supertest(app)
          .get(`/api/affirmations/${affirmationId}/comments`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedComments)
      })
    })
  })
})
