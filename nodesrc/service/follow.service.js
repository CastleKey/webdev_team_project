module.exports = (app) => {
  const userRepo = require('../repository/user.repository');
  const reviewRepo = require('../repository/review.repository');
  
  app.post("/api/follow/user/:fromUserId/:toUserId", function (req, res) {
    userRepo.findUser(req.params["fromUserId"]).then((user) => {
      userRepo.addUserFollowing(user, req.params["toUserId"]).then((user) => {
        res.send(user);
      });
    });
  })
  
  app.get("/api/follow/user/:userId", function (req, res) {
    userRepo.findUser(req.params["userId"])
        .populate("follows").then((user) => {
      res.send(user.follows);
    });
  })
  
  app.delete("/api/follow/user/:fromUserId/:toUserId", function (req, res) {
    userRepo.findUser(req.params["fromUserId"]).then((user) => {
      userRepo.removeUserFollowing(user, req.params["toUserId"]).then((user) => {
        res.send(user);
      });
    });
  })
  
  app.get("/api/follow/stream/:userId", function (req, res) {
    userRepo.findUser(req.params["userId"]).then((user) => {
      reviewRepo.searchReviewsByUsers(user.follows)
          .sort([['date', -1]]).limit(20).then((reviews) => {
        res.send(reviews);
      });
    });
  })
  
  app.get("/api/follow/stream", function (req, res) {
    reviewRepo.findAllReviews().sort([['date', -1]]).limit(20).then((reviews) => {
      res.send(reviews);
    });
  })
}
