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
  getAllGuides,
  getGuidesByQuery,
  getNearbyGuides,
  toggleLike,
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/guideControllers");

const {
  addPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placeControllers");

const { toggleBookmark } = require("../controllers/userControllers");

router.get("/popular", getAllGuides);

router.get("/nearby", getNearbyGuides);

router.get("/search", getGuidesByQuery);

router.get("/user/:userId", getUserGuides);

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

router.delete(
  "/:guideId",
  authorizeUser,
  getGuideById,
  protectGuide,
  deleteGuide
);

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
router.put("/:guideId/like", authorizeUser, getGuideById, toggleLike);
router.put("/:guideId/bookmark", authorizeUser, getGuideById, toggleBookmark);
router.put("/:guideId/comment", authorizeUser, getGuideById, addComment);
router.patch(
  "/:guideId/comment/:commentId",
  authorizeUser,
  getGuideById,
  editComment
);
router.delete(
  "/:guideId/comment/:commentId",

  authorizeUser,
  getGuideById,
  deleteComment
);
module.exports = router;
