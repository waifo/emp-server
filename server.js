
var express=require('express');
var app=express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

const db = mongojs('mongodb://admin:admin@ds133166.mlab.com:33166/employeeslist', ['Employess']); 

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',function(req,res){
    res.send("Server for Employees");   
});

app.get('/getEmp',function(req,res){
    db.Employess.find({},function (err, docs) {
        console.log(docs)
        res.send(docs);
    })
    
});


app.post('/addEmp',function(req,res){
    var data = {
        "id":req.body.id,
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "gender":req.body.gender,
        "city":req.body.city
    }
        db.Employess.insert(data,function (err, docs) {
            console.log("1 employee added")
        })
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
            console.log("1 employee updated")
        })
        res.send()
        
    });
app.post('/deleteEmp',function(req,res){
    var myquery={"id":req.body.id}
        db.Employess.remove(myquery,function(err, res){
            console.log("1 employee deleted")
        })
        res.send()
        
    });
    
    
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});