const strainModel = require('../model/strain.model');

findAllStrains = () => {
  return strainModel.find();//.then((err, strains) => {
    
//  });
}

findStrain = (name) => {
  return strainModel.findById(name);
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
  return strainModel.find({_id: new RegExp('^'+q+'$', "i")})
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
