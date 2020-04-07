const { model, Schema } = require('mongoose')

const RelationshipFollowingSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: 'Users' },
  me: { type: Schema.Types.ObjectId, ref: 'Users' },
  partner: { type: Schema.Types.ObjectId, ref: 'Users' },
  relationshipid: { type: Schema.Types.ObjectId, ref: 'Relationship' },
  partnerFirstName: String,
  partnerLastName: String,
  meFirstName: String,
  melastName: String
}, { timestamps: true })
module.exports = model('RelationshipFollowing', RelationshipFollowingSchema)