const router = require('express').Router()
const { Comments } = require('../models')


router.get('/comments/item/:item', (req, res) => {
  console.log(req.params.item)
  Comments.find({item:req.params.item})
    .then(comments => {
      console.log(comments)
      res.json(comments)
    })
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