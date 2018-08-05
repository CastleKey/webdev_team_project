var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var effectSchema = new Schema({
  _id: { type: String }
  catagory: { type: String, 
              required: true,
              default: "POSITIVE",
              validate: {
                  validator: function(text) {
                    return text === "POSITIVE" || text === "NEGATIVE" || text === "MEDICAL";
                  },
                  message: "effect must be one of positive, negative or medical"
              }
            }
});

effectSchema.virtual("name").get(function() {
  return this._id;
});

var Effect = mongoose.model("Effect", effectSchema);

module.exports = Effect;
