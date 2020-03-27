const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
  username: String,
  email: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friends' }]
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'item'
  }]
})

UserSchema.plugin(require('passport-local-mongoose'))

module.exports = model('user', UserSchema)
