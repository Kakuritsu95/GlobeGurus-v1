const Guide = require("../schemas/guideSchema");
async function getGuideById(req, res, next) {
  const { guideId } = req.params;

  try {
    const guide = await Guide.findById(guideId).populate({
      path: "owner",
      select: "username",
    });

    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }
    req.guide = guide;

    next();
  } catch (err) {
    next(err);
  }
}

function protectGuide(req, res, next) {
  try {
    if (req.user.id !== req.guide.owner._id.toString())
      return res.status(500).json({
        message: "Authorization failed, user has no permission to modify guide",
      });
    next();
  } catch (err) {
    res.json({ message: err.message });
  }
}

module.exports = { getGuideById, protectGuide };
