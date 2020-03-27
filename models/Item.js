const { model, Schema } = require('mongoose')

module.exports = model('item', new Schema({
  text: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  audience: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  typeId: {
    type: Number,
    required: true,
    default: 0 // 0=Good comment
    // 1=Bad comment
  },
  Relationship: { type: Schema.Types.ObjectId, ref: 'Relationship' },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}))
