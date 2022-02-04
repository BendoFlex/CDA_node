const  mongoose = require("mongoose")

const kittenSchema = new mongoose.Schema({
    name : {type : String , required : true},
    img : {type : String , required : true},
    ajout : {type :Date, default : Date.now()},
    age : {type : Number , required:true}
})


module.exports = kittenSchema