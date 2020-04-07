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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}))