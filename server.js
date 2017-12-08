
var express=require('express');
var app=express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');



const db = mongojs('mongodb://admin:admin@ds133166.mlab.com:33166/employeeslist', ['Employess']); 

console.log("db",db)
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getEmp',function(req,res){
    //res.header("Access-Control-Allow-Origin", "*");
    db.Employess.find({},function (err, docs) {
        console.log(docs)
        res.send(docs);
    })
    
});
app.get('/',function(req,res){
    
    console.log("Hello")
    res.send("Hello Heroku");
    
});

app.post('/addEmp',function(req,res){
    //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    var data = {
        "id":req.body.id,
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "gender":req.body.gender,
        "city":req.body.city}
        db.Employess.insert(data,function (err, docs) {
            console.log(docs)
        })
        // console.log("Req",data)
        res.send()
        
    });
app.post('/updateEmp',function(req,res){
    var myquery={"id":req.body.id}
    var data = {
        "id":req.body.id,
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "gender":req.body.gender,
        "city":req.body.city}
        db.Employess.update(myquery, data, function(err, res){

        })
        // console.log("Req",data)
        res.send()
        
    });
    
    
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
         });