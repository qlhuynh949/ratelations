const { model, Schema } = require('mongoose')

module.exports = model('comments', new Schema({

  text: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  relationship: {
    type: Schema.Types.ObjectId,
    ref: 'Relationship'
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }))