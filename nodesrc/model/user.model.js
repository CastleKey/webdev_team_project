var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true, select: false },
  role: { type: String, 
          required: true,
          default: "HYBRID",
          validate: {
              validator: function(text) {
                return text === "STORE" || text === "REGULAR" || text === "CURATOR" || text === "ADMIN";
              },
              message: "Race is hybrid or sativa or indica"
          }
        },
  reviews: 
      { type: [{ type: Schema.Types.ObjectId, ref: 'Review' }], 
        required: true,
        default: []
      },
  follows: 
      { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
        required: true,
        default: []
      }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
