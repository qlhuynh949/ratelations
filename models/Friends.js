const { model, Schema } = require('mongoose')

const friendsSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'Users' },
  recipient: { type: Schema.Types.ObjectId, ref: 'Users' },
  status: {
    type: Number,
    enums: [
      0,    //'not friends or no longer or blocked',
      1,    //'requested',
      2,    //'pending', //state of pending request
      3,    //'friends'
    ]
  }
}, { timestamps: true })
module.exports = model('Friends', friendsSchema)