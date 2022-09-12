const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sportsSchema = new mongoose.Schema({
  text: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("SportsTag", sportsSchema);
