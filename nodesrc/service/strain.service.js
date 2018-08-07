module.exports = app => {
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
  
  //takes func and query string, if loS is true, func will be called with flase and list of resulting query, otherwise, false and the first complete result. If error, true and message;
  var loadExternal = (str, loS, func) => {
    makeReq(url + "/strains/search/name/" + str, (strains) => {
      var firstTime = {first: true};
      if (strains.length == 0) {
        func(true, "Cannot find strain in external api");
        return;
      }
      if (loS) {
        func(false, strains.map((str) => {
          return str.name;
        }));
      }
      strains.forEach((str) => {
        strainRepo.findStrain(str.name).then((dbStr) => {
          if (firstTime.first && dbStr != null && !loS) {
            firstTime.first = false;
            func(false, dbStr);
          }
          if (dbStr == null) {
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
                      if (!loS && first) {
                        strainRepo.findStrain(dbObj._id).then((dbObj) => {
                          if (dbObj == null) {
                            func(true, "Failed to add to database");
                          }
                          func(false, dbObj);
                        });
                      }
                    });
                  })(fla, firstTime)
                });
              })(eff, firstTime)
            });
          }
        });
      });
    });
  }
  
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
        loadExternal(req.params['sname'], true, (err, loS) => {
          if (err) {
            res.status(400).send(loS);
          }
          res.json(loS);
        });
      /**
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
        });*/
        return;
      }
      res.json(strain.map((strain) => {
        return strain._id;
      }));
    });
  });
  
  app.get("/api/strain/:sname", function (req, res) {
    strainRepo.findStrain(req.params['sname']).then((strain) => {
      if (strain == null) {
        
        loadExternal(req.params['sname'], false, (err, str) => {
          if (err) {
            res.status(400).send(str);
          }
          res.json(str);
        });
      /**
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
        */
        return;
      }
      res.json(strain);
    });
  });
}
