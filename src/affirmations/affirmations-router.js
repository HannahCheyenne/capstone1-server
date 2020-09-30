const path = require('path')
const express = require('express')

const AffirmationsService = require('./affirmations-service')
const { requireAuth } = require('../middleware/jwt-auth')
const affirmationsRouter = express.Router()
const jsonBodyParser = express.json()

affirmationsRouter
  .route('/')
  .get((req, res, next) => {
    AffirmationsService.getAllAffirmations(req.app.get('db'))
      .then(affirmations => {
        // console.log(affirmations)
        res.json(affirmations.map(AffirmationsService.serializeAffirmation))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { content, date_created } = req.body
    const newAffirmation = { content }

    for(const [key, value] of Object.entries(newAffirmation)) {
      if(value === null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    newAffirmation.date_created = date_created
    newAffirmation.author_id = req.user.id;

    AffirmationsService.insertAffirmation(
      req.app.get('db'),
      newAffirmation
    )
      .then(affirmation => {
        console.log(affirmation)
        res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${affirmation.id}`))
        .json(AffirmationsService.serializeAffirmation(affirmation))
      })
      .catch(next)

  })

affirmationsRouter
  .route('/:affirmation_id')
  .all(checkAffirmationExists)
  .get((req, res) => {
    res.json(AffirmationsService.serializeAffirmation(res.affirmation))
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
