const { model, Schema } = require('mongoose')

module.exports = model('item', new Schema({
  score: {
    type: Number,
    required: true,
    default: 0
  },
  goodtext: {
    type: String,
    required: true
  },
  badtext: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  Relationship: { type: Schema.Types.ObjectId, ref: 'Relationship' }
}))
