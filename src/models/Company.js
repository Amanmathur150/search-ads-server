const mongoose = require("mongoose")

let companySchema = new mongoose.Schema({
    _id:  {type :"string"},
    name: String , 
    url: String
})

companySchema.index({ name: 'text'}, {name: 'My Search Name', weights: {name: 10}});

let Company  = mongoose.model("company" , companySchema)

module.exports = Company
