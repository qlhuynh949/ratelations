const router = require('express').Router()
const { Relationship} = require('../models')

router.get('/relationships', (req, res) => {
  Relationship.find()
    .then(relationships => res.json(relationships))
    .catch(e => console.error(e))
})

router.post('/relationships', (req, res) => {
  Relationship.create(req.body)
    .then(relationship => res.json(relationship))
    .catch(e => console.error(e))
})

router.put('/relationships/:id', (req, res) => {
  Relationship.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

router.delete('/relationships/:id', (req, res) => {
  Relationship.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

module.exports = router