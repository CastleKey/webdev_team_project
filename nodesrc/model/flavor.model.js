var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flavorSchema = new Schema({
  _id: { type: String }
});

flavorSchema.virtual("name").get(function() {
  return this._id;
});

var Flavor = mongoose.model("Flavor", flavorSchema);

module.exports = Flavor;
