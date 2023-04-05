var mongoose = require("mongoose");
const { Schema } = mongoose;

const machingSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dropstation: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Maching", machingSchema);
