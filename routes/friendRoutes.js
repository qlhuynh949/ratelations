const router = require('express').Router()
const { Friends } = require('../models')

router.get('/friends', (req, res) => {
  Friends.find()
    .then(friends => res.json(friends))
    .catch(e => console.error(e))
})

router.post('/friends', (req, res) => {
  Friends.create(req.body)
    .then(friend => res.json(friend))
    .catch(e => console.error(e))
})

router.put('/friends/:id', (req, res) => {
  Friends.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

router.delete('/friends/:id', (req, res) => {
  Friends.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

module.exports = router