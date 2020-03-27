const { model, Schema } = require('mongoose')

module.exports = model('relationship', new Schema({
  partner: { type: Schema.Types.ObjectId, ref: 'Users' },
  status: {
    type: Number,
    enums: [
      0,    //'over',
      1,    //'casual',
      2,    //'dating',
      3,    //'working it out',
      4,    //'married'
    ]
  }
, { timestamps: true }}
))
