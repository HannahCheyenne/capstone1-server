const express = require('express')
const AffirmationsService = require('./affirmations-service')
const { requireAuth } = require('../middleware/jwt-auth')

const affirmationsRouter = express.Router()

affirmationsRouter
  .route('/')
  .get((req, res, next) => {
    AffirmationsService.getAllAffirmations(req.app.get('db'))
      .then(affirmations => {
        console.log(affirmations)
        res.json(affirmations.map(AffirmationsService.serializeAffirmation))
      })
      .catch(next)
  })

affirmationsRouter
  .route('/:affirmation_id')
  .all(requireAuth)
  .all(checkAffirmationExists)
  .get((req, res) => {
    res.json(AffirmationsService.serializeAffirmation(res.affirmation))
  })

affirmationsRouter.route('/:affirmation_id/comments/')
  .all(checkAffirmationExists)
  .all(requireAuth)
  .get((req, res, next) => {
    AffirmationsService.getCommentsForAffirmation(
      req.app.get('db'),
      req.params.affirmation_id
    )
      .then(comments => {
        res.json(comments.map(AffirmationsService.serializeAffirmationComment))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkAffirmationExists(req, res, next) {
  try {
    const affirmation = await AffirmationsService.getById(
      req.app.get('db'),
      req.params.affirmation_id
    )

    if (!affirmation)
      return res.status(404).json({
        error: `Affirmation doesn't exist`
      })

    res.affirmation = affirmation
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = affirmationsRouter
