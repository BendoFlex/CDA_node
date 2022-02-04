const express = require("express")
const fs = require("fs")
const request = require("./config/request")
const session = require("express-session")
const authentification = require("./controllers/authentification")
//ajv to validate form on back end?



//DB
const kittens = fs.readFileSync("./datas/kitten.json","utf-8", (err,data)=>{
    if (err)  throw err
    return data
})

const server = express()

//Deal with url
server.use(express.json())
server.use(express.urlencoded({extended:false}))
//creer session
server.use(session ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

server.set('view engine','ejs')
server.set('views', './views')
//ROUTES ...>

server.get("/login", (req,res,next)=>{
    res.render('login')
})

server.post("/login", async(req,res,next)=>{
    const {mail,password} = req.body
    let user = await request.getUserByMail(mail)
    if(user.length == 1 && user[0].password == password){
        //GENERATE TOKEN
        console.log("connected")
        res.redirect('/kittens')
    }
    else{
        console.log("wrong credentials")
        res.redirect("/login")
    }
    
})

server.get("/register", (req,res,next)=>{
    res.render('register')
})

server.post("/register", (req,res,next)=>{
     const {username,mail,password,password2} = req.body
     const user_data = {username,mail,password}
    console.log(user_data)
    if (password === password2 && username && mail) {
        console.log("matching passwords can register")
        request.createUser(user_data).then(
            ()=> res.render("confirmation",{mail:mail})
        )
        //GENERATE TOKEN
    }
    else{
        res.redirect("/login")
    }
})

server.post("/search", async (req,res,next)=>{
    const {name} = req.body
    let kittens = await request.getKittenByName(name)
    console.log(kittens)
    res.render('kitten',{kittens : kittens})
})

server.get("/kittens", authentification, async (req,res,next)=>{
    let kittens = await request.getAllKittens()
    console.log(kittens)
    res.render('kitten',{kittens : kittens})
})


server.get("/kittens/:id", async(req,res,next)=>{
    let kitten = await request.getKittenById("61fd3ed18872ec1da1a884c3")
    console.log(kitten)
    //res.send(JSON.parse(kittens)[req.params.id-1])
    res.send(kitten)
})



server.listen(7777,()=> console.log("on port "+7777))