const userModel = require('../model/user.model');

findAllUsers = () => {
  return userModel.find();
}

findUser = (name) => {
  return userModel.findById(name);
}

findUserByNameAndPassword = (username, password) => {
  return userModel.findOne({username: username, password: password});
}

saveUser = (user) => {
  return userModel(user).save();
}

upsertUser = (user) => {
  return userModel.findByIdAndUpdate(user._id, user, {upsert:true,new:true}).exec();
}

updateUser = (user) => {
  return userModel.findByIdAndUpdate(user._id, 
                                     {$set: {username: user.username, 
                                             email: user.email}}, 
                                     {new:true}).exec();
}

updateUserPassword = (user) => {
  return 
}

saveUsers = (users) => {
  users.forEach((user) => {
    saveUser(user).then((err) => {if (err) {throw JSON.stringify(err);}});
  });
}

upsertUsers = (users) => {
  users.forEach((user) => {
    upsertUser(user).then((err) => {});
  });
}

searchUsersByName = (q) => {
  return users.find({_id: new RegExp('^'+q+'$', "i")})
}

module.exports = {
  findAllUsers,
  findUser, 
  findUserByNameAndPassword,
  saveUser,
  saveUsers,
  upsertUser,
  updateUser,
  upsertUsers,
  searchUsersByName
}
