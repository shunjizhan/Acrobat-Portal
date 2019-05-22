// /backend/case_report.js
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/***
*	Mongo Messafe Model
*	@param {Number} id - id of the Case Report
*	@param {String} title - title of the Case Report
*	@param {String} description - description of the Case Report
*	@param {{ type: Date, default: Date.now }} date - date of the Case Report
*/
const UserSchema = new Schema(
  {
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
    var user = this;
    console.log('in hashing');

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);