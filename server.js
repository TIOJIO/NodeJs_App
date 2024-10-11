var express=require('express')
var app=express()

app.use(express.static(__dirname + '/public')) //pour acceder au element dans un dossier local
app.use(express.json()); // Middleware pour parser le corps des requêtes en JSON , Permet de traiter les requêtes où le corps est au format JSON.
app.use(express.urlencoded({ extended: true }));// Middleware pour parser le corps des requêtes URL-encoded , Permet de traiter les requêtes avec un corps URL-encoded, comme les formulaires HTML

app.set('views',__dirname + '/views') // pour pouvoir accepter les template ( retouner les page web en reponse)
app.set('view engine', 'ejs');

const users =[
    {name:'tiojio roamin',age:20,des:'etudiant en temps plein'},
    {name:'paul luis',age:100,des:'developpeur application'},
    {name:'jean jacque ',age:50,des:'manager des projet agile'},
]

app.get('/home',function(req,res){
   res.render('home.ejs')
})

app.get('/users/:id',function(req,res){
    var user=users[req.params.id-1];
    res.render('home.ejs',{user:user})

   // users[req.params.id]? res.send(user.name + ''+ user.age):res.send('not a user')

})

 app.get('/users',function(req,res){
    for (let i = 0; i < users.length; i++) {
      res.send(users[i].name + ''+ users[i].age);
    }
   
})

app.post('/add_user',function(req,res){
    users.push({
       name: req.body.name, // Les données envoyées dans le corps de la requête
       age:parseInt( req.body.age,10), // Les données envoyées dans le corps de la requête
       des: req.body.des, // Les données envoyées dans le corps de la requête

    })
    res.send('ok')
})

app.get('/test',function(req,res){
    res.send('kjhu')
})
app.listen(3001)
console.log('starting server...')