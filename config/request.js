const connexion = require("./db_connexion")
const kittenModel = require("../models/kitten")
const userModel = require("../models/user")
const fs = require("fs")
const path = require("path")


async function getAllKittens () {
    let Collection = connexion.model("Kittens",kittenModel)
    let kittens = await Collection.find()
    return kittens
}


async function getKittenById(id) {
    let Collection = connexion.model("Kittens",kittenModel)
    let kitten = await Collection.find({_id:id})
    return kitten
}

async function getKittenByName(name) {
    let Collection = connexion.model("Kittens",kittenModel)
    //building regex to get approximative results
    let re =  new RegExp("^" + name,"g");
    let re_short = new RegExp("^"+name.slice(0,3),"g")
    let kitten = await Collection.find({
        name: {
            $in : [re,re_short]
        }
    })
    console.log(kitten)
    return kitten
}


async function getAllUsers(){
    let Collection = connexion.model("user_kittens",userModel)
    let users  = await Collection.find()
    return users
}

async function getUserById(id){
    let Collection = connexion.model("user_kittens",userModel)
    let user  = await Collection.find({_id:id})
    return user
}

async function getUserByMail(mail){
    let Collection = connexion.model("user_kittens",userModel)
    let user  = await Collection.find({mail:mail})
    return user
}

async function createUser(data){
    let Collection = connexion.model("user_kittens",userModel)
    let user = await Collection.find({mail:data.mail}) 

    if(user.length == 0){
        console.log("new")
        Collection.insertMany([{
            name : data.username,
            mail : data.mail,
            password : data.password
        }])
        .then(()=>console.log("inserted",data))
        .catch(console.log)  
    }
}

//getKittenByName("kae")
//getUserById("61fd3a0b0935624bad527c42")
//getKittenById("61fd3ed18872ec1da1a884c2")
//populate(models)

module.exports = {getAllKittens,getKittenById,getKittenByName,getAllUsers,getUserById,getUserByMail,createUser}