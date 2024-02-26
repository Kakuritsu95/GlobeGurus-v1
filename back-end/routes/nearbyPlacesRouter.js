const express = require("express");
const nearbyPlacesRouter = express.Router();
const getNearbyPlaces = require("../controllers/nearbyPlacesControllers");
nearbyPlacesRouter.get("/", getNearbyPlaces);

module.exports = nearbyPlacesRouter;
