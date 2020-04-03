const router = require('express').Router()
const { Comments } = require('../models')

router.get('/comments', (req, res) => {
  Comments.find()
    .then(comments => res.json(comments))
    .catch(e => console.error(e))
})

router.post('/comments', (req, res) => {
  Comments.create(req.body)
    .then(comment => res.json(comment))
    .catch(e => console.error(e))
})

router.put('/comments/:id', (req, res) => {
  Comments.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

router.delete('/comments/:id', (req, res) => {
  Comments.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

module.exports = router