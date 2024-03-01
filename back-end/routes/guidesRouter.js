const express = require("express");
const upload = require("multer")();
const router = express.Router();
const { getGuideById } = require("../middlewares/guideMiddlewares");
const { authorizeUser } = require("../middlewares/userAuthMiddlewares");

const {
  createGuide,
  getUserGuides,
  updateGuide,
  deleteGuide,
} = require("../controllers/guideControllers");

router.get("/", authorizeUser, getUserGuides);

router.get("/:id", getGuideById, async (req, res) => {
  res.json(req.guide);
});
router.post("/", authorizeUser, upload.single("guideImage"), createGuide);

router.patch("/:id", getGuideById, updateGuide);

router.delete("/:id", getGuideById, deleteGuide);

module.exports = router;
