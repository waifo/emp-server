
var express=require('express');
var app=express();
var mongojs = require('mongojs');


const db = mongojs('mongodb://admin:admin@ds133166.mlab.com:33166/employeeslist', ['Employess']); 

console.log("db",db)
app.set('port', (process.env.PORT || 5000));

app.get('/getEmp',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
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
    res.header("Access-Control-Allow-Origin", "*");
    // db.Employess.insert({
        //     "id": "76-6720845",
        //     "first_name": "Rollin",
        //     "last_name": "Arrell",
        //     "email": "rarrell0@linkedin.com",
        //     "gender": "Male",
    //     "city": "Mwaya"
    // },function (err, docs) {
        //     console.log(docs)
        // })
        res.send("Req",req)
        
    });
    
    
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
         });