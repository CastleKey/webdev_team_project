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

findUserByName = (username) => {
  return userModel.findOne({username: username});
}

deleteUser = (username) => {
  return userModel.deleteOne({username: username}).exec();
}

saveUser = (user) => {
  return userModel(user).save();
}

upsertUser = (user) => {
  return userModel.findByIdAndUpdate(user._id, user, {upsert:true,new:true}).exec();
}

updateUser = (id, user) => {
  return userModel.findByIdAndUpdate(id,
                                     {$set: {email: user.email}},
                                     {new:true}).exec();
}

adminUpdateUser = (id, user) => {
  return userModel.findByIdAndUpdate(id,
                                     {$set: {password: user.password, role: user.role}},
                                     {new:true}).exec();
}

updateUserPassword = (id, password) => {
  return userModel.findByIdAndUpdate(id,
                                     {$set: {password: password}},
                                     {new:true}).exec();
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
  findUserByName,
  deleteUser,
  saveUser,
  saveUsers,
  upsertUser,
  updateUser,
  adminUpdateUser,
  updateUserPassword,
  upsertUsers,
  searchUsersByName
}
