
var express=require('express');
var app=express();
var mongojs = require('mongojs');


const db = mongojs('mongodb://admin:admin@ds133166.mlab.com:33166/employeeslist', ['Employess']); 
// var server=app.listen(process.env.port||3000,function(req,res){
//     console.log("Server started",process.env.port||3000)
// })

app.get('/getEmp',function(req,res){
    db.Employess.find({},function (err, docs) {
        console.log(docs)
        res.send(docs);
    })

});

app.post('/addEmp',function(req,res){
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
    console.log("Req",req)

});

