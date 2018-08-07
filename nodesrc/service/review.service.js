module.exports = (app) => {
  const reviewRepo = require('../repository/review.repository');

  app.post("/api/review", function (req, res) {
    if (req.session["user"] === null || req.session["user"] === undefined) {
      res.sendStatus(400);
      return;
    }
    var review = req.body;
    var newReview = {
      user: req.session["user"]._id,
      strain: review.strain,
      star: review.star,
      desc: review.desc 
    };
    reviewRepo.saveReview(newReview).then((dbReview) => {
      if (dbReview == null) {
        res.sendStatus(400);
        return;
      }
      res.json(dbReview);
    }).catch((err) => {
      try {
        res.sendStatus(400);
        return;
      } catch (err) {
        //Nothing
      }
    });
  });

  app.get("/api/review/user/:userId", function (req, res) {
    reviewRepo.searchReviewsByUser(req.params["userId"]).then((dbReview) => {
      if (dbReview == null) {
        res.sendStatus(400);
        return;
      }
      res.json(dbReview);
    });
  });

  app.get("/api/review/strain/:strainId", function (req, res) {
    reviewRepo.searchReviewsByStrain(req.params["strainId"]).then((dbReview) => {
      if (dbReview == null) {
        res.sendStatus(400);
        return;
      }
      res.json(dbReview);
    });
  });

  app.get("/api/review/:reviewId", function (req, res) {
    reviewRepo.findReview(req.params["reviewId"]).then((dbReview) => {
      if (dbReview == null) {
        res.sendStatus(400);
        return;
      }
      res.json(dbReview);
    });
  });

  app.put("/api/review/:reviewId", function (req, res) {
    if (req.session["user"] === null || req.session["user"] === undefined) {
      res.sendStatus(400);
      return;
    }
    var review = req.body;
    reviewRepo.findReview(req.params["reviewId"]).then((dbReview) => {
      if (dbReview.user != req.session["user"]._id) {
        res.sendStatus(400);
        return;
      }
      reviewRepo.updateReview(req.params["reviewId"], review)
          .then((dbReview) => {
            if (dbReview === null) {
              res.sendStatus(400);
              return;
            }
            res.json(dbReview);
          });
    });
  });
  
  app.delete("/api/review/:reviewId", function (req, res) {
    if (req.session["user"] === null || req.session["user"] === undefined) {
      res.sendStatus(400);
      return;
    }
    reviewRepo.findReview(req.params["reviewId"]).then((dbReview) => {
      if (dbReview.user != req.session["user"]._id) {
        res.sendStatus(400);
        return;
      }
      reviewRepo.deleteReview(dbReview._id)
          .then((dbReview) => {
            if (dbReview === null) {
              res.sendStatus(400);
              return;
            }
            res.json(dbReview);
          });
    });
  });
};
