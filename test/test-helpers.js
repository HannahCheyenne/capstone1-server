const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeAffirmationsArray(users) {
  return [
    {
      id: 1,
      author_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      author_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      author_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      author_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeCommentsArray(users, affirmations) {
  return [
    {
      id: 1,
      content: 'First test comment!',
      affirmation_id: affirmations[0].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      content: 'Second test comment!',
      affirmation_id: affirmations[0].id,
      user_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      content: 'Third test comment!',
      affirmation_id: affirmations[0].id,
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      content: 'Fourth test comment!',
      affirmation_id: affirmations[0].id,
      user_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 5,
      content: 'Fifth test comment!',
      affirmation_id: affirmations[affirmations.length - 1].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 6,
      content: 'Sixth test comment!',
      affirmation_id: affirmations[affirmations.length - 1].id,
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 7,
      content: 'Seventh test comment!',
      affirmation_id: affirmations[3].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ];
}

function makeJournalsArray(users) {
  return [
    {
      id: 1,
      mood: 'Mood 1',
      author_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      mood: 'Mood 2!',
      author_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      mood: 'Mood 1',
      author_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      mood: 'Mood 1',
      author_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeExpectedAffirmation(users, affirmation, comments=[]) {
  const author = users
    .find(user => user.id === affirmation.author_id)

  const number_of_comments = comments
    .filter(comment => comment.affirmation_id === affirmation.id)
    .length

  return {
    id: affirmation.id,
    content: affirmation.content,
    date_created: affirmation.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  }
}


function makeExpectedJournal(users, journal) {
  const author = users
    .find(user => user.id === journal.author_id)

  return {
    id: journal.id,
    mood: journal.mood,
    content: journal.content,
    date_created: journal.date_created.toISOString(),
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  }
}

function makeExpectedAffirmationComments(users, affirmationId, comments) {
  const expectedComments = comments
    .filter(comment => comment.affirmation_id === affirmationId)

  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      content: comment.content,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        user_name: commentUser.user_name,
        full_name: commentUser.full_name,
        nickname: commentUser.nickname,
        date_created: commentUser.date_created.toISOString(),
        date_modified: commentUser.date_modified || null,
      }
    }
  })
}

function makeMaliciousAffirmation(user) {
  const maliciousAffirmation = {
    id: 911,
    date_created: new Date(),
    author_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedAffirmation = {
    ...makeExpectedAffirmation([user], maliciousAffirmation),
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousAffirmation,
    expectedAffirmation,
  }
}

function makeMaliciousJournal(user) {
  const maliciousJournal = {
    id: 911,
    date_created: new Date(),
    author_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedJournal = {
    ...makeExpectedJournal([user], maliciousJournal),
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousJournal,
    expectedJournal,
  }
}

function makeAppFixtures() {
  const testUsers = makeUsersArray()
  const testAffirmations = makeAffirmationsArray(testUsers)
  const testComments = makeCommentsArray(testUsers, testAffirmations)
  const testJournals = makeJournalsArray(testUsers)
  return { testUsers, testAffirmations, testComments, testJournals }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        capstone1_journals,
        capstone1_affirmations,
        capstone1_users,
        capstone1_comments
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE capstone1_journals_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE capstone1_affirmations_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE capstone1_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE capstone1_comments_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('capstone1_journals_id_seq', 0)`),
        trx.raw(`SELECT setval('capstone1_affirmations_id_seq', 0)`),
        trx.raw(`SELECT setval('capstone1_users_id_seq', 0)`),
        trx.raw(`SELECT setval('capstone1_comments_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('capstone1_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('capstone1_users_id_seq', ?)`,
        [users[users.length - 1].id],
    ))
}

function seedAppTables(db, users, affirmations, journals, comments=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('capstone1_affirmations').insert(affirmations)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('capstone1_affirmations_id_seq', ?)`,
      [affirmations[affirmations.length - 1].id],
    )

    await trx.into('capstone1_journals').insert(journals)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('capstone1_journals_id_seq', ?)`,
      [journals[journals.length - 1].id],
    )

    // only insert comments if there are some, also update the sequence counter
    if (comments.length) {
      await trx.into('capstone1_comments').insert(comments)
      await trx.raw(
        `SELECT setval('capstone1_comments_id_seq', ?)`,
        [comments[comments.length - 1].id],
      )
    }
  })
}

function seedMaliciousAffirmation(db, user, affirmation) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('capstone1_affirmations')
        .insert([affirmation])
    )
}

function seedMaliciousJournal(db, user, journal) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('capstone1_journals')
        .insert([journal])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeAffirmationsArray,
  makeExpectedAffirmation,
  makeExpectedAffirmationComments,
  makeMaliciousAffirmation,
  makeJournalsArray,
  makeExpectedJournal,
  makeMaliciousJournal,
  makeCommentsArray,
  makeAuthHeader,

  makeAppFixtures,
  cleanTables,
  seedAppTables,
  seedMaliciousAffirmation,
  seedMaliciousJournal,
  seedUsers,
}
