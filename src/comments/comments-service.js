const xss = require('xss')

const CommentsService = {
  // getById(db, id) {
  //   return db
  //     .from('capstone1_comments AS comm')
  //     .select(
  //       'comm.id',
  //       'comm.content',
  //       'comm.date_created',
  //       'comm.affirmation_id',
  //       db.raw(
  //         `json_strip_nulls(
  //           row_to_json(
  //             (SELECT tmp FROM (
  //               SELECT
  //                 usr.id,
  //                 usr.user_name,
  //                 usr.full_name,
  //                 usr.nickname,
  //                 usr.date_created,
  //                 usr.date_modified
  //             ) tmp)
  //           )
  //         ) AS "user"`
  //       )
  //     )
  //     .leftJoin(
  //       'capstone1_users AS usr',
  //       'comm.author_id',
  //       'usr.id',
  //     )
  //     .where('comm.id', id)
  //     .first()
  // },

  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('casptone1_comments')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment =>
        CommentsService.getById(db, comment.id)
      )
  },

  serializeComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      content: xss(comment.content),
      affirmation_id: comment.affirmation_id,
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

module.exports = CommentsService
