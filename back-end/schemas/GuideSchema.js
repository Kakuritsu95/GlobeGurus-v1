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
    description: { type: String, required: true },
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

guide.statics.aggregatePagination = function (skip, limit) {
  return this.aggregate([{ $skip: (skip - 1) * limit }, { $limit: limit }]);
};
module.exports = model("Guide", guide);
