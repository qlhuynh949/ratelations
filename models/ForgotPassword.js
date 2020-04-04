const { model, Schema } = require('mongoose')

module.exports = model('ForgotPassword', new Schema({
  token: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '60m' },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}))