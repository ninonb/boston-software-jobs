//  var companiesVar = [
//   { name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
//   { name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
//   { name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" }
//   ];
var express = require("express");
var app = express();
app.set("view engine", "ejs");
var mongoose = require('mongoose');
mongoose.connect('mongodb://ninon:boston22@ds163870.mlab.com:63870/boston-software');

var companySchema = new mongoose.Schema ({
  name: String,
  image: String
});

var Company = mongoose.model('Company', companySchema);

// Company.create({
//   name: 'SmartBear Software',
//   image: 'https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png'
// });

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render("landing");
})

// app.get('/companies', (req, res) =>{
//   res.render("companies", {companies: companiesVar});
// })


app.get('/companies', (req, res) =>{
  Company.find({}, function(err, docs){
    if(err){
      console.log(err);
    }else{
      console.log("Success" + docs);
      res.render("companies", {companies: docs });
    }
  });
});

app.get('/companies/new', (req, res) =>{
  res.render("newCompany");
})

app.post('/companies', (req, res)=>{
 var name = req.body.name;
 var image = req.body.logo;
 companiesArray.push({name:name,image:image});
 res.redirect('companies');
})

app.listen(3000, () => console.log('Listening from app...'))