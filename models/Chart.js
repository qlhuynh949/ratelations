const { model, Schema } = require('mongoose')

module.exports = model('chart', new Schema({
  Day: {
    type: Date,
    required: true
  },
  Score: {
    type: Number,
    required: true,
    default: 0
  },
  Audience: { type: Schema.Types.ObjectId, ref: 'Users' },
}))