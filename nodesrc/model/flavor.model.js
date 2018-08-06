var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flavorSchema = new Schema({
  _id: { type: String }
});

flavorSchema.virtual("name")
    .get(function() {
      return this._id;
    })
    .set(function(n) {
      this._id = n;
    });

var Flavor = mongoose.model("Flavor", flavorSchema);

module.exports = Flavor;
