
const jwt  = require("jsonwebtoken")
//passer le username a chaque authentification
const authentification = (req,res,next) =>{
    console.log(req.headers.authorization)
    req.session.token = req.headers.authorization.split(" ")[1]

    if(req.session.token != undefined) {
        console.log("already set token")
        console.log(req.session.token)
        // on essaye de verify => erreur expiration, mauvais format etc
        try {
            const {username} = jwt.verify(req.session.token,"keyboard cat")
            //DO SMTHG
            console.log(username)
            if(username != undefined){
                req.username = username
                req.session.message = username+" can browse as he wants"
                console.log(req.session.message)
            }
            
            
        }
        catch (e) {
            console.log(e)
            console.log("token expired or in a bad format or invalid key")
            //on catch l'erreur
        }
        // ON permet d'aller a la route suivante
        next()
        return

        
        
    }
    else {
        //redirect to login to authentificate
        req.session.messsage = "please login"
        res.redirect("/login")
    }
}

module.exports =  authentification