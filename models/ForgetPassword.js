const { model, Schema } = require('mongoose')

module.exports = model('ForgetPassword', new Schema({
  Day: {
    type: Date,
    required: true
  },
  Token: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}))