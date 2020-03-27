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
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  Relationship: { type: Schema.Types.ObjectId, ref: 'Relationship' },
  Audience: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}))