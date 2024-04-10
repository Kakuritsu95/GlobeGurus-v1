const mongoose = require("mongoose");
const placeSchema = require("./placeSchema");
const { Schema, model } = mongoose;

const guide = new Schema(
  {
    territory: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    places: [placeSchema],
    description: { type: String, required: true },
    comments: [
      {
        commenter: { type: Schema.Types.ObjectId, ref: "user" },
        comment: String,
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

guide.statics.aggregatePagination = function (skip, limit) {
  return this.aggregate([
    { $skip: (skip - 1) * limit },
    { $limit: limit + 1 },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $project: {
        territory: 1,
        title: 1,
        imageUrl: 1,
        thumbsUp: 1,
        places: 1,
        description: 1,
        comments: 1,
        "owner._id": 1,
        "owner.username": 1,
      },
    },
  ]);
};
module.exports = model("Guide", guide);
