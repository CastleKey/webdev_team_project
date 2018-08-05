const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('https');

if (!process.env.EVANBUSSE_APIKEY) {
  throw "Missing env variable EVANBUSSE_APIKEY";
}

mongoose.connect(process.env.MONGODB_URI 
              || 'mongodb://localhost/webdev_team_project', function(err){
  if (err) {
    throw err;
  }
  //http.get()
});

var app = express()

app.use(cors({
  "origin": "*",
  "methods": "GET, POST, PUT, DELETE, OPTIONS",
  "optionsSuccessStatus": 200,
  "credentials": true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send('Node js REST server for weed');
});

var port = process.env.PORT || 3000;
app.listen(port);