var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: false, unique: true, sparse: true },
  role: { type: String, 
          required: true,
          default: "REGULAR",
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