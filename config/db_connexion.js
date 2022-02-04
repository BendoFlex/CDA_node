const mongoose = require("mongoose")

const mongo_uri = "mongodb://127.0.0.1:27017/myapp"


const connexion =  mongoose.createConnection(mongo_uri)
                

module.exports = connexion