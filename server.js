
var express=require('express');
var app=express();
var mongojs = require('mongojs');
const axios= require('axios')
var bodyParser = require('body-parser');

const db = mongojs('mongodb://admin:admin@ds133166.mlab.com:33166/employeeslist', ['Employess']); 
const myData = `<script type="text/template" id="KSTL-ContactUs-app-layout">
<div id="KSTL-ContactUs-locale-region" class="box"></div>
<div id="KSTL-ContactUs-primary-region"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-primary-layout">
<div id="KSTL-ContactUs-faq-region" class="box"></div>
<div id="KSTL-ContactUs-contactinfo-region" class="box"></div>
<div id="KSTL-ContactUs-contactform-region" class="box"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-locale-layout">
<div id="KSTL-ContactUs-locale-header-region" class="box-header">
    <h2>Select a Country and Language</h2>
</div>
<div id="KSTL-ContactUs-locale-body-region" class="box-body"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-locale-body-layout">
<div id="KSTL-ContactUs-locale-intro-region">
    <p>Kellogg’s products are manufactured in 35 countries worldwide. For local contact information, or to submit a country-specific request, please select a country below.</p>
</div>
<div id="KSTL-ContactUs-locale-countriesform-region"></div>
<div id="KSTL-ContactUs-locale-languagesform-region"></div>
<div id="KSTL-ContactUs-locale-button-region"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-locale-error-template">
<p>No languages found for the selected country.</p>
</script>

<script type="text/template" id="KSTL-ContactUs-faq-layout">
<div id="KSTL-ContactUs-faq-header-region" class="box-header"></div>
<div id="KSTL-ContactUs-faq-body-region" class="box-body"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-faq-body-layout">
<div id="KSTL-ContactUs-faq-intro-region"></div>
<div id="KSTL-ContactUs-faq-form-region"></div>
<div id="KSTL-ContactUs-faq-button-region"></div>
<div id="KSTL-ContactUs-faq-answer-region"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-faq-template">
<li>
    <p class="q"><%= Question %></p>
    <p class="a"><%= Answer %></p>
</li>
</script>

<script type="text/template" id="KSTL-ContactUs-contactinfo-layout">
<div id="KSTL-ContactUs-contactinfo-header-region" class="box-header"></div>
<div id="KSTL-ContactUs-contactinfo-body-region" class="box-body"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-contactinfo-body-layout">
<div id="KSTL-ContactUs-contactinfo-address-region"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-contactinfo-address-template">
<div class="callus">
    <p><a href="tel:<%= Phone %>"><%= Phone %></a></p>
    <p><%= PhoneHours %></p>
</div>
<div class="writeus">
    <p><%= Address %></p>
</div>
</script>

<script type="text/template" id="KSTL-ContactUs-contactform-layout">
<div id="KSTL-ContactUs-contactform-header-region" class="box-header"></div>
<div id="KSTL-ContactUs-contactform-body-region" class="box-body"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-contactform-body-layout">
<div id="KSTL-ContactUs-contactform-intro-region"></div>
<div id="KSTL-ContactUs-contactform-required-region"></div>
<div id="KSTL-ContactUs-contactform-form-region"></div>
<div id="KSTL-ContactUs-contactform-button-region"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-loading-template">
<div id="KSTL-ContactUs-spinner"></div>
</script>

<script type="text/template" id="KSTL-ContactUs-header-template">
<h2><%= CopyHeader %></h2>
</script>

<script type="text/template" id="KSTL-ContactUs-intro-template">
<p><%= CopyIntro %></p>
<p><%= CopyAgeDisclaimer %></p>
</script>

<script type="text/template" id="KSTL-ContactUs-required-template">
<p class="required"><%= CopyRequiredFieldNote %></p>
</script>

<script type="text/template" id="KSTL-ContactUs-button-template">
<button class="btn btn-primary js-submit" type="submit"><%= CopySubmitButton %></button>
<a class="btn btn-secondary js-cancel" href="#"><%= CopyCancelButton %></a>
</script>

<script type="text/template" id="KSTL-ContactUs-thankyou-template">
<h3><%= ThankYou %></h3>
<p><%= ThankYouMessage %></p>
<h3 class="js-ca-thankyou"><%= ThankYouMessageCATitle %></h3>
<p><%= ThankYouMessageCA %></p>
<p><button class="btn btn-primary js-cancel" href="#"><%= CopyStartOverButton %></button></p>
</script>

<script type="text/template" id="KSTL-ContactUs-qq-template">
<div class="qq-uploader-selector qq-uploader">
    <div class="qq-upload-button-selector qq-upload-button">
        <div id="KSTL-ContactUs-uploadfile-template">[UploadAFile]</div>
    </div>
    <ul class="qq-upload-list-selector qq-upload-list">
        <li class="box-bordered">
            <div class="qq-progress-bar-container-selector">
                <div class="qq-progress-bar-selector qq-progress-bar"></div>
            </div>
            <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
            <img class="qq-thumbnail-selector" qq-max-size="100" qq-server-scale>
            <span class="qq-edit-filename-icon-selector qq-edit-filename-icon"></span>
            <span class="qq-upload-file-selector qq-upload-file"></span>
            <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
            <span class="qq-upload-size-selector qq-upload-size"></span>
            <a class="qq-upload-cancel-selector qq-upload-cancel" href="#">[X]</a>
        </li>
    </ul>
</div>
</script>`
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',function(req,res){
    let myUrl=""
    console.log("params",req.url)
    myUrl=req.url.split("?url=",2)[1]
    console.log("myUrl",myUrl)
    axios.get(myUrl)
        .then((data)=>res.send(data.data))  
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