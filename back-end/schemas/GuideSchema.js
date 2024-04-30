const mongoose = require("mongoose");
const placeSchema = require("./placeSchema");
const { Schema, model } = mongoose;

const guideSchema = new Schema(
  {
    territory: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
        commenter: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String,
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

guideSchema.index({ territoryCoords: "2dsphere" });
function populateOwnerFields(next) {
  this.populate("owner", "avatarUrl _id username");
  this.populate("comments.commenter", "avatarUrl _id username");
  next();
}

guideSchema.pre("find", populateOwnerFields);
guideSchema.pre("findOne", populateOwnerFields);

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
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "comments.commenter",
        foreignField: "_id",
        as: "commenter",
      },
    },

    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
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
        "commenter.password": 0,
        "commenter.bookmarks": 0,
        "commenter.email": 0,
        "owner.password": 0,
        "owner.bookmarks": 0,
        "owner.email": 0,
      },
    },
    {
      $group: {
        _id: "$_id",
        territory: { $first: "$territory" },
        title: { $first: "$title" },
        imageUrl: { $first: "$imageUrl" },
        likes: { $first: "$likes" },
        places: { $first: "$places" },
        description: { $first: "$description" },
        territoryCoords: { $first: "$territoryCoords" },
        owner: { $first: { $arrayElemAt: ["$owner", 0] } },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        distance: { $first: "$distance" },
        comments: {
          $push: {
            $cond: {
              if: { $eq: [{ $type: "$comments" }, "missing"] },
              then: "$$REMOVE",
              else: {
                _id: "$comments._id",
                comment: "$comments.comment",
                commenter: { $arrayElemAt: ["$commenter", 0] },
              },
            },
          },
        },
      },
    },
    { $skip: (skip - 1) * parseInt(limit) },
    { $limit: parseInt(limit) },
    { $sort: { distance: 1 } },
  ]);
};

// guideSchema.statics.aggregateMostLiked = function (skip, limit) {
//   return this.aggregate([
//     {
//       $addFields: {
//         likesCount: { $size: "$likes" },
//       },
//     },
//     {
//       $unwind: {
//         path: "$comments",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "comments.commenter",
//         foreignField: "_id",
//         as: "commenter",
//       },
//     },
//     {
//       $unwind: {
//         path: "$comments",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "owner",
//         foreignField: "_id",
//         as: "owner",
//       },
//     },
//     {
//       $project: {
//         "commenter.password": 0,
//         "commenter.bookmarks": 0,
//         "commenter.email": 0,
//         "owner.password": 0,
//         "owner.bookmarks": 0,
//         "owner.email": 0,
//       },
//     },
//     {
//       $group: {
//         _id: "$_id",
//         territory: { $first: "$territory" },
//         title: { $first: "$title" },
//         imageUrl: { $first: "$imageUrl" },
//         likes: { $first: "$likes" },
//         places: { $first: "$places" },
//         description: { $first: "$description" },
//         territoryCoords: { $first: "$territoryCoords" },
//         owner: { $first: "$owner" },
//         createdAt: { $first: "$createdAt" },
//         updatedAt: { $first: "$updatedAt" },
//         likesCount: { $first: "$likesCount" },
//         comments: {
//           $push: {
//             $cond: {
//               if: { $eq: [{ $type: "$comments" }, "missing"] },
//               then: "$$REMOVE",
//               else: {
//                 _id: "$comments._id",
//                 comment: "$comments.comment",
//                 commenter: { $arrayElemAt: ["$commenter", 0] },
//               },
//             },
//           },
//         },
//       },
//     },
//     { $skip: (skip - 1) * parseInt(limit) },
//     { $limit: parseInt(limit) },
//     {
//       $sort: { likesCount: -1 },
//     },
//   ]);
// };

module.exports = model("Guide", guideSchema);
