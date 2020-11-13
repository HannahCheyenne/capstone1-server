const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe.only('Journals Endpoints', function () {
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


    describe(`GET /api/journals`, () => {
        context(`Given no journals`, () => {
            beforeEach('insert journals', () =>
                helpers.seedUsers(
                    db,
                    testUsers,
                )
            )
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/journals')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, [])
            })
        })

        context('Given there are journals in the database', () => {
            beforeEach('insert journals', () =>
                helpers.seedAppTables(
                    db,
                    testUsers,
                    testAffirmations,
                    testJournals,
                    testComments
                )
            )

            it('responds with 200 and all of the journals for user', () => {
                testUser = testUsers[0]
                const expectedJournal = testJournals.filter(journal => journal.author_id === testUser.id)
                expectedJournal[0].date_modified = null;
                

                return supertest(app)
                    .get('/api/journals')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedJournal)
            })
        })

        context(`Given an XSS attack journal`, () => {
            const testUser = helpers.makeUsersArray()[1]
            const {
                maliciousJournal,
                expectedJournal,
            } = helpers.makeMaliciousJournal(testUser)

            beforeEach('insert malicious journal', () => {
                return helpers.seedMaliciousJournal(
                    db,
                    testUser,
                    maliciousJournal,
                )
            })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/api/journals`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].mood).to.eql(expectedJournal.mood)
                        expect(res.body[0].content).to.eql(expectedJournal.content)
                    })
            })
        })
    })

    describe(`GET /api/journals/:journal_id`, () => {
        context(`Given no journals`, () => {
            beforeEach(() =>
                helpers.seedUsers(db, testUsers)
            )
            it(`responds with 404`, () => {
                const journalId = 123456
                return supertest(app)
                    .get(`/api/journals/${journalId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: `Journal doesn't exist` })
            })
        })

        context('Given there are journals in the database', () => {
            beforeEach('insert journals', () =>
                helpers.seedAppTables(
                    db,
                    testUsers,
                    testAffirmations,
                    testJournals,
                    testComments
                )
            )

            it('responds with 200 and the specified journal', () => {
                const journalId = 1
                const expectedJournal = helpers.makeExpectedJournal(
                    testUsers,
                    testJournals[journalId - 1]
                )

                return supertest(app)
                    .get(`/api/journals/${journalId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedJournal)
            })
        })

        context(`Given an XSS attack journal`, () => {
            const testUser = helpers.makeUsersArray()[1]
            const {
                maliciousJournal,
                expectedJournal,
            } = helpers.makeMaliciousJournal(testUser)

            beforeEach('insert malicious journal', () => {
                return helpers.seedMaliciousJournal(
                    db,
                    testUser,
                    maliciousJournal,
                )
            })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/api/journals/${maliciousJournal.id}`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(200)
                    .expect(res => {
                        expect(res.body.mood).to.eql(expectedJournal.mood)
                        expect(res.body.content).to.eql(expectedJournal.content)
                    })
            })
        })
    })
})
