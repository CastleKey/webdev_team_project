const flavorModel = require('../model/flavor.model');

findAllFlavors = () => {
  return flavorModel.find();
}

findFlavor = (name) => {
  return flavorModel.findById(name);
}

saveFlavor = (flavor) => {
  return flavorModel(flavor).save();
}

upsertFlavor = (flavor) => {
  return flavorModel.findByIdAndUpdate(flavor._id, flavor, {upsert:true}).exec();
}

saveFlavors = (flavors) => {
  flavors.forEach((flavor) => {
    saveFlavor(flavor).then((err) => {if (err) {throw JSON.stringify(err);}});
  });
}

upsertFlavors = (flavors) => {
  flavors.forEach((flavor) => {
    upsertFlavor(flavor).then((err) => {});
  });
}

searchFlavorsByName = (q) => {
  return flavors.find({_id: new RegExp('^'+q+'$', "i")})
}

module.exports = {
  findAllFlavors,
  findFlavor, 
  saveFlavor,
  saveFlavors,
  upsertFlavor,
  upsertFlavors,
  searchFlavorsByName
}
