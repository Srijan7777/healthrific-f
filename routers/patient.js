var mongoose = require('mongoose');

//schema
var patientSchema =new mongoose.Schema({
   name:String,
   age:String,
   gender:String,
   medical:String
});
var Patient =mongoose.model("Patient" , patientSchema);

module.exports = mongoose.model("Patient" ,patientSchema);
