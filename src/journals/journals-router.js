const express = require('express')
const JournalsService = require('./journals-service')
const { requireAuth } = require('../middleware/jwt-auth')

const journalsRouter = express.Router()

journalsRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    JournalsService.getAllJournals(req.app.get('db'))
      .then(journals => {
        // console.log(journals)
        res.json(journals.map(JournalsService.serializeJournal))
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
      req.params.journal_id
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
