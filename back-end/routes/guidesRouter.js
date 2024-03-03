const express = require("express");
const upload = require("multer")();
const router = express.Router();
const {
  getGuideById,
  protectGuide,
} = require("../middlewares/guideMiddlewares");
const { authorizeUser } = require("../middlewares/userAuthMiddlewares");

const {
  createGuide,
  getUserGuides,
  updateGuide,
  deleteGuide,
} = require("../controllers/guideControllers");
const {
  addPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placeControllers");
router.get("/", authorizeUser, getUserGuides);

router.get("/:guideId", getGuideById, async (req, res) => {
  res.json(req.guide);
});
router.post("/", authorizeUser, upload.single("guideImage"), createGuide);

router.patch(
  "/:guideId",
  authorizeUser,
  getGuideById,
  protectGuide,
  upload.single("guideImage"),
  updateGuide
);

router.delete("/:guideId", getGuideById, deleteGuide);

router.put(
  "/:guideId/place/",
  authorizeUser,
  getGuideById,
  protectGuide,
  upload.single("placeImage"),
  addPlace
);
router.patch(
  "/:guideId/place/:placeId",
  authorizeUser,
  getGuideById,
  protectGuide,
  upload.single("placeImage"),
  updatePlace
);
router.delete(
  "/:guideId/place/:placeId",
  authorizeUser,
  getGuideById,
  protectGuide,
  deletePlace
);
module.exports = router;
