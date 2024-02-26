const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  descritpion: String,
  tags: [String],
  coords: [{ type: [String], required: true }],
});

module.exports = placeSchema;
