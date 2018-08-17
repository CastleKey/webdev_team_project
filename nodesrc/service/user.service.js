module.exports = (app) => {
  const crypto = require('crypto');
  const userRepo = require('../repository/user.repository');
  const commonSalt = "webdev-user::";

  //fetch("http://localhost:3200/api/register", {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username: "Username1",password: "1234"})});
  app.post("/api/user/register", function (req, res) {
    var user = req.body;
    var newUser = {
      username: user.username,
      password: crypto.createHash('md5').update(commonSalt + user.password).digest('hex')
    };
    userRepo.saveUser(newUser).then((dbUser) => {
      if (dbUser == null) {
        res.sendStatus(400);
        return;
      }
      userRepo.findUserByNameAndPassword(dbUser.username, dbUser.password).then((dbUser) => {
        if (dbUser == null) {
          dbUser.sendStatus(400);
          return;
        }
        req.session["user"] = dbUser;
        res.json(dbUser);
      }).catch((err) => {
        console.log(err);
        try {
          res.sendStatus(400);
          return;
        } catch (err) {
          console.log(err);
          //Nothing
        }
      });
    }).catch((err) => {
      console.log(err);
      try {
        res.sendStatus(400);
        return;
      } catch (err) {
        console.log(err);
        //Nothing
      }
    });
  });

  //fetch("http://localhost:3200/api/login", {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username: "Username1",password: "1234"})});
  app.post("/api/user/login", function (req, res) {
    var user = req.body;
    userRepo.findUserByNameAndPassword(user.username, 
                                       crypto
                                           .createHash('md5')
                                           .update(commonSalt + user.password)
                                           .digest('hex'))
        .then((dbUser) => {
           if (dbUser == null) {
             res.sendStatus(400);
             return;
           }
           req.session["user"] = dbUser;
           res.json(dbUser);
        }).catch((err) => {
          console.log(err);
          try {
            res.sendStatus(400);
            return;
          } catch (err) {
            console.log(err);
            //Nothing
          }
        });
  });

  //fetch("http://localhost:3200/api/logout", {method:'POST'});
  app.post("/api/user/logout", function (req, res) {
    req.session.destroy();
    res.sendStatus(200);
  });

  //fetch("http://localhost:3200/api/profile", {method:'GET'});
  app.get("/api/user/profile", function (req, res) {
    if (req.session["user"] === null || req.session["user"] === undefined) {
      res.sendStatus(400);
      return;
    }
    res.json(req.session["user"]);
  });

  //fetch("http://localhost:3200/api/profile", {method:'PUT'});
  app.put("/api/user/profile", function (req, res) {
    if (req.session["user"] === null || req.session["user"] === undefined) {
      res.sendStatus(400);
      return;
    }
    var user = req.body;
    userRepo.updateUser(req.session["user"]._id, user)
        .then((dbUser) => {
          if (dbUser === null) {
            res.sendStatus(400);
            return;
          }
          req.session["user"] = dbUser;
          res.json(dbUser);
        });
  });

  app.put("/api/user/updatePassword", function (req, res) {
    if (req.session["user"] === null || req.session["user"] === undefined) {
      res.sendStatus(400);
      return;
    }
    var pass = req.body;
    userRepo.updateUserPassword(req.session["user"]._id, 
                                crypto
                                    .createHash('md5')
                                    .update(commonSalt + pass.password)
                                    .digest('hex')).then((dbUser) => {
      if (dbUser === null) {
        res.sendStatus(400);
        return;
      }
      req.session["user"] = dbUser;
      res.json(dbUser);
    });
  });
  
  app.get("/api/user/search", function (req, res) {
    let query = req.query["q"];
    userRepo.searchUsersByName(query).then((users) => {
      res.send(users);
    });
  });
  
  app.get("/api/user/profile/:userId", function (req, res) {
    let userId = req.params["userId"];
    userRepo.findUser(userId).then((dbUser) => {
      if (dbUser === null) {
        res.sendStatus(400);
        return;
      }
      res.send(dbUser);
    });
  })
  
  //fetch("http://localhost:3200/api/profile", {method:'DELETE'});
  //app.delete("/api/user/profile", function (req, res) {
    // Not implemented
  //});
};
