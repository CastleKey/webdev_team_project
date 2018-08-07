const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');

if (!process.env.EVANBUSSE_APIKEY) {
  throw "Missing env variable EVANBUSSE_APIKEY";
}
const EVANBUSSE_APIKEY = process.env.EVANBUSSE_APIKEY;
const url = "http://strainapi.evanbusse.com/" + EVANBUSSE_APIKEY;

mongoose.connect(process.env.MONGODB_URI 
              || 'mongodb://localhost/webdev_team_project', function(err){
  if (err) {
    throw err;
  }
  if (process.env.SKIP_INIT_DB && process.env.SKIP_INIT_DB == "true") {
    console.log("Skipping database init");
    return;
  }
  http.get(url + "/searchdata/flavors", res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      let flavors = JSON.parse(body);
      let parsedFlavors = flavors.map((flavor) => {
        return {_id: flavor};
      });
      const flavorRepo = require('./nodesrc/repository/flavor.repository');
      flavorRepo.upsertFlavors(parsedFlavors);
    });
  });
  http.get(url + "/searchdata/effects", res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      let effects = JSON.parse(body);
      let parsedEffects = effects.map((effect) => {
        return {_id: effect.effect, category: effect.type.toUpperCase()};
      });
      const effectRepo = require('./nodesrc/repository/effect.repository');
      effectRepo.upsertEffects(parsedEffects);
    });
  });
});

var app = express()

app.use(cors({
  "origin": ["http://localhost:4200"],
  "methods": "GET, POST, PUT, DELETE, OPTIONS",
  "optionsSuccessStatus": 200,
  "credentials": true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session')
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'any string'
}));

require('./nodesrc/service/strain.service')(app);
require('./nodesrc/service/user.service')(app);
require('./nodesrc/service/review.service')(app);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/webdev-team-project-angular'));

app.get('/*', function(req,res) {  
  res.sendFile(path.join(__dirname+'/dist/webdev-team-project-angular/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port);
