const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
  username: String,
  email: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  follow: [{ type: Schema.Types.ObjectId, ref: 'Relationship' }],
  relationship: [{type: Schema.Types.ObjectId, ref: 'Relationship'}],
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'item'
  }]
})

UserSchema.index({ "username": "text", "email": "text", "firstName": "text", "lastName":"text" })

UserSchema.plugin(require('passport-local-mongoose'))

module.exports = model('user', UserSchema)
