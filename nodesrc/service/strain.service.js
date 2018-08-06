module.exports = app => {
  const mongoose = require('mongoose');
  const strainRepo = require('../repository/strain.repository');
  const http = require('http');
  const url = "http://strainapi.evanbusse.com/" + process.env.EVANBUSSE_APIKEY;
  
  var makeReq = (link, func) => {
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
  
  app.get("/api/strain/search/:sname", function (req, res) {
    strainRepo.searchStrainsByName(req.params['sname']).then((strain) => {
      if (strain == null || strain.length == 0) {
        makeReq(url + "/strains/search/name/" + req.params['sname'], (strains) => {
          var firstTime = {first: true};
          if (strains.length == 0) {
            res.sendStatus(400);
            return;
          }
          res.json(strains.map((str) => {
            return str.name;
          }));
          strains.forEach((str) => {
            strainRepo.findStrain(str.name).then((err, dbStr) => {
              if (err || dbStr == null) {
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
                        obj.effects = eff.positive.concat(
                                      eff.negative.concat(
                                      eff.medical)).map((eff) => {
                          return eff.toString();
                        });
                        obj.flavors = fla.map((fla) => {
                          return fla.toString();
                        });
                        strainRepo.upsertStrain(obj).then((dbObj) => {
                          //nothing needed to be done
                        });
                      })(fla, firstTime)
                    });
                  })(eff, firstTime)
                });
              }
            });
          });
          //res.json(strain);
        });
        return;
      }
      res.json(strain.map((strain) => {
        return strain._id;
      }));
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
          if (strains.length == 0) {
            res.sendStatus(400);
            return;
          }
          strains.forEach((str) => {
            strainRepo.findStrain(str.name).then((err, dbStr) => {
              if (err || dbStr == null) {
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
                        obj.effects = eff.positive.concat(
                                      eff.negative.concat(
                                      eff.medical)).map((eff) => {
                          return eff.toString();
                        });
                        obj.flavors = fla.map((fla) => {
                          return fla.toString();
                        });
                        strainRepo.upsertStrain(obj).then((dbObj) => {
                          if (first) {
                            res.json(dbObj);
                          }
                        });
                      })(fla, firstTime)
                    });
                  })(eff, firstTime)
                });
              }
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
