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
  audience: {
    type: JSON,
    required: false,
    default: 0
  },
  typeId:{
    type: Number,
    required: true,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}))
