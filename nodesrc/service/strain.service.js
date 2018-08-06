module.exports = app => {
  const mongoose = require('mongoose');
  const strainRepo = require('../repository/strain.repository');
  const http = require('http');
  const url = "http://strainapi.evanbusse.com/" + process.env.EVANBUSSE_APIKEY;
  
  var makeReq = (link, func) => {
    console.log()
    http.get(link, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        let parsedBd = JSON.parse(body);
        func(parsedBd)
      });
    });
  };
  
  app.get("/api/strain", function (req, res) {
    strainRepo.findAllStrains().then((err, strains) => {
      if (err || strains == null) {
        res.status(400).send(JSON.stringify(err));
        return;
      }
      res.json(strains);
    });
  });
  
  app.get("/api/strain/:sname", function (req, res) {
    strainRepo.findStrain().then((err, strain) => {
      if (err) {
        res.status(400).send(JSON.stringify(err));
        return;
      }
      if (strain == null) {
        makeReq(url + "/strains/search/name/" + req.params['sname'], (strains) => {
          var firstTime = {first: true};
          strains.forEach((str) => {
            makeReq(url + "/strains/data/effects/" + str.id, (eff) => { 
              return ((eff, firstTime) => {
                makeReq(url + "/strains/data/flavors/" + str.id, (fla) => { 
                  return ((fla, firstTime) => {
                    var first = false;
                    if (firstTime.first == true) {
                      firstTime.first = false;
                      first = true;
                    }
                    var obj = {};
                    obj._id = str.name;
                    obj.eb_id = str.id;
                    obj.race = str.race.toUpperCase();
                    obj.desc = str.desc;
                    obj.effects = eff.positive.concat(eff.negative.concat(eff.medical)).map((eff) => {
                      return eff.toString();
                    });
                    obj.flavors = fla.map((fla) => {
                      return fla.toString();
                    });
                    console.log(obj);
                    strainRepo.upsertStrain(obj);
                    if (first) {
                      res.json(obj);
                    }
                  })(fla, firstTime)
                });
              })(eff, firstTime)
            });
          });
          //res.json(strain);
        });
        return;
      }
      res.json(strain);
    });
  });
}
