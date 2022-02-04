const  mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    mail : {type : String , required : true},
    password : {type :String, required:true},
})


module.exports = userSchema