const { model, Schema } = require('mongoose')


const relationshipSchema = new Schema({
  couples: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  partnerFirstName:String,
  partnerLastName:String,
  partnerUserName:String,
  partnerEmail:String,
  partnerId:String,
  requestingPartnerId:String,
  isActive: Boolean,
   status: {
    type: Number,
    enums: [
      0,    //'Separated',
      1,    //'Relation Pending',
      2,    //'In Relationship'
      3,    //'Married'
    ]
  }
}, { timestamps: true })
module.exports = model('relationship', relationshipSchema)