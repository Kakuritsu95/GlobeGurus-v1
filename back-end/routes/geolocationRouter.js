const express = require("express");
const router = express.Router();
const { authorizeUser } = require("../middlewares/userAuthMiddlewares");
const { getTerritoryCoords } = require("../controllers/geolocationControllers");

router.get("/:territoryQuery", authorizeUser, getTerritoryCoords);

module.exports = router;
