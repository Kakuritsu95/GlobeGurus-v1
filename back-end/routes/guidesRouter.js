const express = require("express");
const { getGuideById } = require("../middlewares/guideMiddlewares");
const userAuth = require("../middlewares/userAuthorizationMiddleware");
const {
  createGuide,
  getAllGuides,
  updateGuide,
} = require("../controllers/guideControllers");

const guidesRouter = express.Router();

guidesRouter.route("/").get(userAuth, getAllGuides).post(createGuide);

guidesRouter
  .route("/:id")
  .get(getGuideById, async (req, res) => {
    res.json(req.guide);
  })
  .patch(getGuideById, updateGuide);

module.exports = guidesRouter;
