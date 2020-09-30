const xss = require('xss')

const AffirmationsService = {
  getAllAffirmations(db) {
    return db
      .from('capstone1_affirmations AS aff')
      .select(
        'aff.id',
        'aff.date_created',
        'aff.content',
        db.raw(
          `count(DISTINCT comm) AS number_of_comments`
        ),
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
        'capstone1_comments AS comm',
        'aff.id',
        'comm.affirmation_id',
      )
      .leftJoin(
        'capstone1_users AS usr',
        'aff.author_id',
        'usr.id',
      )
      .groupBy('aff.id', 'usr.id')
  },

  getById(db, id) {
    return AffirmationsService.getAllAffirmations(db)
      .where('aff.id', id)
      .first()
  },

  getCommentsForAffirmation(db, affirmation_id) {
    return db
      .from('capstone1_comments AS comm')
      .select(
        'comm.id',
        'comm.content',
        'comm.date_created',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.full_name,
                  usr.nickname,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('comm.affirmation_id', affirmation_id)
      .leftJoin(
        'capstone1_users AS usr',
        'comm.author_id',
        'usr.id',
      )
      .groupBy('comm.id', 'usr.id')
  },

  serializeAffirmation(affirmation) {
    const { author } = affirmation
    return {
      id: affirmation.id,
      content: xss(affirmation.content),
      date_created: new Date(affirmation.date_created),
      number_of_comments: Number(affirmation.number_of_comments) || 0,
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

  serializeAffirmationComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      affirmation_id: comment.affirmation_id,
      content: xss(comment.content),
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        nickname: user.nickname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  },

  insertAffirmation(db, newAffirmation) {
    return db
      .insert(newAffirmation)
      .into('capstone1_affirmations')
      .returning('*')
      .then(([affirmation]) => affirmation)
      .then(affirmation =>
        AffirmationsService.getById(db, affirmation.id)
      )
  },
}

module.exports = AffirmationsService
