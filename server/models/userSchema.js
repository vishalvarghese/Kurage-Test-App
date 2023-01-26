const { text } = require('express');
const mongoose= require('mongoose');
var userschema =mongoose.Schema({
 userName:String,
 userEmail:String,
 userMobile:String,
 password:String
});
var userone =mongoose.model("user",userschema)
module.exports=userone  