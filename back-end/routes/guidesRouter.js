const express = require("express");
const multer = require("multer");
const { getGuideById } = require("../middlewares/guideMiddlewares");
const { authorizeUser } = require("../middlewares/userAuthMiddlewares");
const {
  createGuide,
  getAllGuides,
  updateGuide,
} = require("../controllers/guideControllers");

const guidesRouter = express.Router();
const upload = multer();
guidesRouter
  .route("/")
  .get(authorizeUser, getAllGuides)
  .post(upload.single("guideImage"), createGuide);

guidesRouter
  .route("/:id")
  .get(getGuideById, async (req, res) => {
    res.json(req.guide);
  })
  .patch(getGuideById, updateGuide);

module.exports = guidesRouter;
