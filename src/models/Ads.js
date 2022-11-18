const mongoose = require("mongoose");

let adsSchema = new mongoose.Schema({
  _id:  {type :String},
  companyId: { type: String, ref: "Company" },
  primaryText: { type: String },
  headline: { type: String },
  description: {
    type: String,
  },
  CTA : {
    type : String
  },
  imageUrl : {
    type : String
  }
});



adsSchema.index({ primaryText: 'text', headline: 'text', description: 'text' }, {name: 'My Search', weights: {primaryText: 5, headline: 4, description: 3}});

let Ads = mongoose.model("ads", adsSchema);




module.exports = Ads;
