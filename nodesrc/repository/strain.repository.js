const strainModel = require('../model/strain.model');
const effectModel = require('../model/effect.model');
const flavorModel = require('../model/flavor.model');

findAllStrains = () => {
  return strainModel.find();
}

findStrain = (name) => {
  return strainModel.findById(name).populate("effects").exec();
}

saveStrain = (strain) => {
  return strainModel(strain).save();
}

upsertStrain = (strain) => {
  return strainModel.findByIdAndUpdate(strain._id, strain, {upsert:true, new:true}).exec();
}

saveStrains = (strains) => {
  strains.forEach((strain) => {
    saveStrain(strain).then((err) => {if (err) {throw JSON.stringify(err);}});
  });
}

upsertStrains = (strains) => {
  strains.forEach((strain) => {
    upsertStrain(strain).then((err) => {});
  });
}

searchStrainsByName = (q) => {
  return strainModel.find({_id: new RegExp(q, "i")}).limit(20)
}

module.exports = {
  findAllStrains,
  findStrain, 
  saveStrain,
  saveStrains,
  upsertStrain,
  upsertStrains,
  searchStrainsByName
}
