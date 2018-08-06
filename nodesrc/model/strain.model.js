var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var strainSchema = new Schema({
  _id: { type: String },
  eb_id: { type: Number, required: true, unique: true },
  desc: { type: String, required: false },
  race: { type: String, 
          required: true,
          default: "HYBRID",
          validate: {
              validator: function(text) {
                return text === "HYBRID" || text === "SATIVA" || text === "INDICA";
              },
              message: "Race is hybrid or sativa or indica"
          }
        },
  flavors: 
      { type: [{ type: Schema.Types.String, ref: 'Flavor' }], 
        required: true,
        default: []
      },
  effects: 
      { type: [{ type: Schema.Types.String, ref: 'Effect' }], 
        required: true,
        default: []
      }
});

strainSchema.virtual("name")
    .get(function() {
      return this._id;
    })
    .set(function(n) {
      this._id = n;
    });
    
var Strain = mongoose.model("Strain", strainSchema);

module.exports = Strain;
