const reviewModel = require('../model/review.model');
const userModel = require('../model/user.model');

findAllReviews = () => {
  return reviewModel.find();
}

findReview = (id) => {
  return reviewModel.findById(id);
}

saveReview = (review) => {
  return reviewModel(review).save();
}

upsertReview = (review) => {
  return reviewModel.findByIdAndUpdate(review._id, review, {upsert:true,new:true}).exec();
}

updateReview = (id, review) => {
  return reviewModel.findByIdAndUpdate(id, 
                                     {$set: {star: review.star,
                                             desc: review.desc}}, 
                                     {new:true}).exec();
}

saveReviews = (reviews) => {
  reviews.forEach((review) => {
    saveReview(review).then((err) => {if (err) {throw JSON.stringify(err);}});
  });
}

upsertReviews = (reviews) => {
  reviews.forEach((review) => {
    upsertReview(review).then((err) => {});
  });
}

searchReviewsByUser = (userId) => {
  return reviewModel.find({user: userId});
}

searchReviewsByUsers = (loUser) => {
  return reviewModel.find({user: {$in: loUser}});
}

searchReviewsByStrain = (strainName) => {
  return reviewModel.find({strain: strainName});
}

deleteReview = (reviewId) => {
  return reviewModel.deleteOne({_id: reviewId}).exec();
}

module.exports = {
  findAllReviews,
  findReview, 
  saveReview,
  saveReviews,
  upsertReview,
  updateReview,
  upsertReviews,
  searchReviewsByUser,
  searchReviewsByUsers,
  searchReviewsByStrain,
  deleteReview
}
