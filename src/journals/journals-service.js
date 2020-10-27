const xss = require('xss')

const JournalsService = {
  getUserJournals(db, user_id) {
    return db
      .from('capstone1_journals AS journals')
      .select(
        'journals.id',
        'journals.mood',
        'journals.date_created',
        'journals.date_modified',
        'journals.content',
        'journals.author_id'
      )
      .where('journals.author_id', user_id)
      .groupBy('journals.id', 'journals.author_id')
  },

  getById(db, id, user_id) {
    return JournalsService.getUserJournals(db, user_id)
      .where('journals.id', id)
      .first()
  },

  serializeJournal(journal) {
    return {
      id: journal.id,
      mood: xss(journal.mood),
      content: xss(journal.content),
      date_created: new Date(journal.date_created),
      date_modified: new Date(journal.date_modified) || null,
      author_id: journal.author_id
    }
  },
  
  insertJournal(db, newJournal) {
    return db
      .insert(newJournal)
      .into('capstone1_journals')
      .returning('*')
      .then(([journal]) => journal)
      .then(journal =>
        JournalsService.getById(db, journal.id, journal.author_id)
      )
  },
}

module.exports = JournalsService
