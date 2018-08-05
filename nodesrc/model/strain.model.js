var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var strainSchema = new Schema({
  name: { type: String, required: true, unique: true },
  id: { type: Integer, required: true, unique: true },
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
      { type: [{ type: Schema.Types.ObjectId, ref: 'Flavor' }], 
        required: true,
        default: []
      },
  effects: 
      { type: [{ type: Schema.Types.ObjectId, ref: 'Effect' }], 
        required: true,
        default: []
      }
});

var Strain = mongoose.model("Strain", strainSchema);

module.exports = Strain;
