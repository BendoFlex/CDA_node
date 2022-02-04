1) Tout d'abord lier à un fichier comme BDD OK
2) Faire 2 route --> Voir tout les CHATS  OK

BONUS =>
 npm install --save-dev @babel/core @babel/preset-env @babel/node

3 ) Moteur de template avec EJS  app.set('view engine','ejs') -> app.set("views","/views") --> ALMOST
3 a) header, footer, kitten OK
3b ) style upload ...





4a)DB 


Create connexion to an app => /config/db_connexion.js
>>>
const mongoose = require("mongoose")

const mongo_uri = "mongodb://127.0.0.1:27017/myapp"


const connexion =  mongoose.createConnection(mongo_uri)
                

module.exports = connexion

Make a Schema => /models/kitten.js
>>>
const mongoose = require("mongoose") 

//Contenu du cours
const contentSchema = new mongoose.Schema({
    title : {type : String , required : true},
    content : {type : String , required : true},
})

 Populate to get data from json to mongoose Create a DB=> config/request.js
 "populate" : "cd config && node populate.js" => command line to setup this in package json
 >>>
const models = [
    {
        "db_name" :"kittens",
        "model":kittenModel,
        "data_source": "../datas/kitten.json"
    },
    {
        "db_name" :"user_kittens",
        "model":userModel,
        "data_source": "../datas/user.json"
    }

]

5 ) DELETE, UPDATE , CREATE ... MULTER
CREATE OK 
UPDATE
DELETE



6) AUTHENTIFICATION
Un USer peut ajouter un chat, enlever le profil de son chat et le mettre à jour => NOM , URL, DATE D'ajout , AGE
--BONUS---L'admin peut tout faire sur le profil des autres 
AVOIR UN TOKEN ==> POUVOIR ACCEDER... a chaque fois qu'on se connecte , ou que le processus de connexion est OK 
FAIRE EN SORTE QUE LA ROUTE SOIT PROtégée avec un middleware ...ALMOST

PAS CONNECTE , ACCUEIL => VOIR LES CHATS pas les détails
POUR VOIR LES INFOS (GET) kitten/:id  , OK
RECHERCHER (POST) kitten/search?name= , OK
VOIR SON PROFIL (POST) user/infos , 
VOIR LE PROFIL DE SES CHATS=> SE CONNECTER (GET) users/kittens,
 avoir un token


GET MODEL ARE GOOD
GET ROUTES ?



Git notes 

git remote add origin https://github.com/BendoFlex/CDA_node.git