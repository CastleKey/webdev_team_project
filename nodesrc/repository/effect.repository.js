const effectModel = require('../model/effect.model');

findAllEffects = () => {
  return effectModel.find();
}

findEffect = (name) => {
  return effectModel.findById(name);
}

saveEffect = (effect) => {
  return effectModel(effect).save();
}

upsertEffect = (effect) => {
  return effectModel.findByIdAndUpdate(effect._id, effect, {upsert:true}).exec();
}

saveEffects = (effects) => {
  effects.forEach((effect) => {
    saveEffect(effect).then((err) => {if (err) {throw JSON.stringify(err);}});
  });
}

upsertEffects = (effects) => {
  effects.forEach((effect) => {
    upsertEffect(effect).then((err) => {});
  });
}

searchEffectsByName = (q) => {
  return effects.find({_id: new RegExp('^'+q+'$', "i")})
}

module.exports = {
  findAllEffects,
  findEffect, 
  saveEffect,
  saveEffects,
  upsertEffect,
  upsertEffects,
  searchEffectsByName
}
