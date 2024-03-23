const express = require("express");
const nearbyPlacesRouter = express.Router();
const getNearbyPlaces = require("../controllers/nearbyPlacesControllers");
const { authorizeUser } = require("../middlewares/userAuthMiddlewares");
nearbyPlacesRouter.get("/", authorizeUser, getNearbyPlaces);

module.exports = nearbyPlacesRouter;
