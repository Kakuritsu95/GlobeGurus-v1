const mongoose = require("mongoose");

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  description: String,
  types: [String],
  coords: { type: [Number], required: true },
});

module.exports = placeSchema;
