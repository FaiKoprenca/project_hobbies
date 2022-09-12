const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema({
    text: {
      type:String,
      unique: true,
    },
})

module.exports = mongoose.model('LocationTag', locationSchema);