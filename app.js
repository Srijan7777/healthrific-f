var express =require ("express");
var app =express();
const hostname = 'localhost';
var mongoose= require('mongoose');
var User =require("./routers/user");
const port =process.env.PORT||3000;
var passport =require('passport');
var LocalStrategy=require("passport-local");
var bodyParser = require("body-parser");
var Patient =require("./routers/patient");

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine' , 'ejs');

const viewsRouter = require('./routers/view');

app.use('/',viewsRouter);

app.use(express.static(__dirname + '/public'));

const url = 'mongodb://localhost:27017/healthrific';
mongoose.connect(
    url, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
   , () =>{
       console.log("Mongo connected");
   }
)
app.use(require("express-session")({
   secret:"Jai Shree Ram",
   resave:false ,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   next();
}); 
//Auth Routes

app.get("/register" ,function(req,res){
res.render("register");
});
app.post("/register",function(req,res){

var newUser = new User({username :req.body.username});
User.register(newUser,req.body.password ,function(err,user){
   if(err)
   {
      console.log(err);
      return res.render("register");
   }
   passport.authenticate("local")(req,res,function(){
res.redirect("/");
   });
})
});

//handling login 

app.post("/login" , passport.authenticate("local", 
{
   successRedirect: "/",
   failureRedirect: "/"
   }) , function(req,res){
res.send("Error");

});

//logout
app.get("/logout" ,function(req,res){
req.logout();
res.redirect('/');
});

function isLoggedIn(req,res,next){
   if(req.isAuthenticated()){
      return next();
   
   }

res.redirect("/login");
}


app.post("/patient-form" , function(req,res){
var name = req.body.name;
var age = req.body.age;
var gender =req.body.gender;
var medical =req.body.medical;
var newPatient = {name: name ,image: age , gender: gender ,medical:medical };
Patient.create(newPatient , function(err, newlycreatedpatient)
{
   if(err)
   {
      console.log(err);
   }
   else{
      res.redirect("/basic-table");
   }
});
});



app.listen(port, hostname ,function(){
console.log (`Healthrific started and running at port name-${hostname}:${port}`);
console.log("Healthrific Started");
});
