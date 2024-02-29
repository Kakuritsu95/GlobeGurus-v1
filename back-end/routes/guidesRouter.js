const express = require("express");
const upload = require("multer")();
const router = express.Router();
const { getGuideById } = require("../middlewares/guideMiddlewares");
const { authorizeUser } = require("../middlewares/userAuthMiddlewares");

const {
  createGuide,
  getAllGuides,
  updateGuide,
} = require("../controllers/guideControllers");

router.get("/", authorizeUser, getAllGuides);

router.get("/:id", getGuideById, async (req, res) => {
  res.json(req.guide);
});
router.post("/", upload.single("guideImage"), createGuide);

router.patch("/:id", getGuideById, updateGuide);

module.exports = router;
