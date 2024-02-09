const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const guide = new Schema(
  {
    cityName: String,
    description: String,
    likes: Number,
    locations: [String],
  },
  { timestamps: true }
);
const Guide = model("Guide", guide);
module.exports = Guide;
// {
//   "guides": [
//     {
//       "city": "xanthi",
//       "id": 1,
//       "guideSummary": "A step by step adventurous guide in the town of Xanthi",
//       "locations": [
//         {
//           "title": "nestos",
//           "type": "Hotel",
//           "summary": "The best out there",
//           "coords": [15, 12]
//         },
//         {
//           "title": "Nestos River",
//           "type": "attraction",
//           "summary": "The best out there",
//           "coords": [125, 112]
//         }
//       ]
//     },
//     {
//         "city": "Thessaloniki",
//         "id": 2,
//         "guideSummary": "Entertainment and nightlife in Thessaloniki",
//         "locations": [
//           {
//             "title": "ladadika",
//             "type": "food",
//             "summary": "good food",
//             "coords": [115, 122]
//           },
//           {
//             "title": "leukos pyrgos",
//             "type": "attraction",
//             "summary": "nothing interestin  g",
//             "coords": [151, 212]
//           }
//         ]
//       }
//   ]
// }

// {
//   "guides": [
//     {
//       "authorId": "1",
//       "id": "1",
//       "createdAt": "01/01/2024",
//       "area": "Xanthi",
//       "title": "Welcome to the city of chuk-chuk genim",
//       "description": "good guide with good places and tips to have a bad weekend",
//       "votes": { "negative": 5, "positive": 10 },
//       "hints"🙁"Natives will fuck you in the ass if you..."],
//       "comments": [
//         {
//           "commentId": "1",
//           "commentatorsId": "1",
//           "createdDate": "05/01/2024",
//           "commentText": "nice guide i love it!"
//         }
//       ],
//       "places": [
//         {
//           "placeName": "Hotel Marine",
//           "address": "Athanasiou korai 21, Xanthi",
//           "placeTags": ["point of interest", "park", "freeOfCharge"],
//            "placeCoords":{"lat":14.00223,"lng":14.02003},
//            "imageUrl":"http/googlemaps/images/placeImage",
//            "estimCost":{"from":10, "to": 20},

//         }
//       ]
//     }
//   ]
// }
