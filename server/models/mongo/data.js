// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
*	Mongo Data Model
*	@param {Number} id - id of the message
*	@param {String} message - content of the message
*/
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);