const mongoose = require("mongoose");
const placeSchema = require("./placeSchema");
const { Schema, model } = mongoose;

const guide = new Schema(
  {
    territory: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: String,
    thumbsUp: [{ type: Schema.Types.ObjectId, ref: "User" }],
    places: [placeSchema],
    comments: [
      {
        commenter: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String,
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = model("Guide", guide);
