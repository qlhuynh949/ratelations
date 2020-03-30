const { model, Schema } = require('mongoose')


const relationshipSchema = new Schema({
  partner: { type: Schema.Types.ObjectId, ref: 'Users' },
  isActive: Boolean,
   status: {
    type: Number,
    enums: [
      0,    //'add friend',
      1,    //'requested',
      2,    //'pending', //state of pending request
      3,    //'friends'
    ]
  }
}, { timestamps: true })
module.exports = model('relationship', relationshipSchema)