const xss = require('xss')

const JournalsService = {
  getAllJournals(db) {
    return db
      .from('capstone1_journals AS art')
      .select(
        'art.id',
        'art.mood',
        'art.date_created',
        'art.date_modified',
        'art.content',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.user_name,
              'full_name', usr.full_name,
              'nickname', usr.nickname,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "author"`
        ),
      )
      .leftJoin(
        'capstone1_users AS usr',
        'art.author_id',
        'usr.id',
      )
      .groupBy('art.id', 'usr.id')
  },

  getById(db, id) {
    return JournalsService.getAllJournals(db)
      .where('art.id', id)
      .first()
  },

  serializeJournal(journal) {
    const { author } = journal
    return {
      id: journal.id,
      title: xss(journal.title),
      content: xss(journal.content),
      date_created: new Date(journal.date_created),
      date_modified: new Date(journal.date_modified) || null,
      author: {
        id: author.id,
        user_name: author.user_name,
        full_name: author.full_name,
        nickname: author.nickname,
        date_created: new Date(author.date_created),
        date_modified: new Date(author.date_modified) || null
      },
    }
  },
}

module.exports = JournalsService
