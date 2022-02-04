const connexion = require("./db_connexion")
const kittenModel = require("../models/kitten")
const userModel = require("../models/user")

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

async function populate (dbs)  {
    for( let info of dbs){
        //choisir la collection et son model
        let Collection = connexion.model(info.db_name,info.model)
        let objects = await Collection.find()

        console.log(objects)

        if(objects.length == 0){
            let json_data = fs.readFileSync(path.join(__dirname,info.data_source))
            let data = JSON.parse(json_data)
            console.log(data)
            Collection.insertMany(data)
                        .then(()=> console.log("data inserted for "+info.db_name))
                        .catch(console.log)
        }
        else{
            console.log("database are already set up")
        }
    }
}

populate(models)