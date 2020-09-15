const xss = require('xss')

const AffirmationsService = {
  getAllAffirmations(db) {
    return db
      .from('capstone1_affirmations AS art')
      .select(
        'art.id',
        'art.date_created',
        'art.content',
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
        'art.id',
        'comm.affirmation_id',
      )
      .leftJoin(
        'capstone1_users AS usr',
        'art.author_id',
        'usr.id',
      )
      .groupBy('art.id', 'usr.id')
  },

  getById(db, id) {
    return AffirmationsService.getAllAffirmations(db)
      .where('art.id', id)
      .first()
  },

  getCommentsForAffirmation(db, affirmation_id) {
    return db
      .from('capstone1_comments AS comm')
      .select(
        'comm.id',
        'comm.text',
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
        'comm.user_id',
        'usr.id',
      )
      .groupBy('comm.id', 'usr.id')
  },

  serializeAffirmation(affirmation) {
    const { author } = affirmation
    return {
      id: affirmation.id,
      style: affirmation.style,
      title: xss(affirmation.title),
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
      text: xss(comment.text),
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
}

module.exports = AffirmationsService