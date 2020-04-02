const router = require('express').Router()
const { Comment } = require('../models')

router.get('/comments', (req, res) => {
  Comment.find()
    .then(comments => res.json(comments))
    .catch(e => console.error(e))
})

router.post('/comments', (req, res) => {
  Comment.create(req.body)
    .then(comment => res.json(comment))
    .catch(e => console.error(e))
})

router.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

router.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

module.exports = router