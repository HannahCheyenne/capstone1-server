const express = require('express')
const JournalsService = require('./journals-service')
const { requireAuth } = require('../middleware/jwt-auth')

const journalsRouter = express.Router()
const jsonBodyParser = express.json()

journalsRouter
  .route('/')
  .get(requireAuth, async (req, res, next) => {
    try {
      const journals = await JournalsService.getUserJournals(
        req.app.get('db'),
        req.user.id,
      )
      if (!journals) {
        return res.status(404).json({
          error: 'You don\'t have any journals',
        })
      }

      res.json(journals.map(JournalsService.serializeJournal))

      next()
    } catch (error) {
      next(error)
    }
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { content, date_created } = req.body
    const newJournal = { content }

    for (const [key, value] of Object.entries(newJournal)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    newJournal.date_created = date_created
    newJournal.author_id = req.user.id;

    JournalsService.insertJournal(
      req.app.get('db'),
      newJournal
    )
      .then(journal => {
        console.log(journal)
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${journal.id}`))
          .json(JournalsService.serializeJournal(journal))
      })
      .catch(next)

  })

journalsRouter
  .route('/:journal_id')
  .all(requireAuth)
  .all(checkJournalExists)
  .get((req, res) => {
    res.json(JournalsService.serializeJournal(res.journal))
  })

/* async/await syntax for promises */
async function checkJournalExists(req, res, next) {
  try {
    const journal = await JournalsService.getById(
      req.app.get('db'),
      req.params.journal_id,
      req.user.id
    )

    if (!journal)
      return res.status(404).json({
        error: `Journal doesn't exist`
      })

    res.journal = journal
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = journalsRouter
