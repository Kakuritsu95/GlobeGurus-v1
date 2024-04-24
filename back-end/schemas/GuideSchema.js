const mongoose = require("mongoose");
const placeSchema = require("./placeSchema");
const { Schema, model } = mongoose;

const guideSchema = new Schema(
  {
    territory: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    places: [placeSchema],
    description: { type: String, required: true },
    territoryCoords: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
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

guideSchema.index({ territoryCoords: "2dsphere" });

guideSchema.statics.aggregateMostLiked = function (skip, limit) {
  return this.aggregate([
    {
      $addFields: { numberOfLikes: { $size: "$likes" } },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $project: {
        "owner.password": 0,
        "owner.bookmarks": 0,
        "owner.email": 0,
        "owner.__v": 0,
      },
    },
    { $skip: (skip - 1) * parseInt(limit) },
    { $limit: parseInt(limit) },
    { $sort: { numberOfLikes: -1 } },
  ]);
};
guideSchema.statics.aggregateNearestGuides = function (lat, lng, skip, limit) {
  return this.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(lat), parseFloat(lng)],
        },
        distanceField: "distance",
        spherical: true,
        key: "territoryCoords",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $project: {
        "owner.password": 0,
        "owner.bookmarks": 0,
        "owner.email": 0,
        "owner.__v": 0,
      },
    },
    { $skip: (skip - 1) * parseInt(limit) },
    { $limit: parseInt(limit) },
    { $sort: { distance: 1 } },
  ]);
};

module.exports = model("Guide", guideSchema);
