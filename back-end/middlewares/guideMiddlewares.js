const Guide = require("../schemas/guideSchema");
async function getGuideById(req, res, next) {
  const { guideId } = req.params;
  try {
    const guide = await Guide.findById(guideId);
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
  if (req.user._id !== req.guide.owner.toString())
    res.status(500).json({
      message: "Authorization failed has not guide authorization access",
    });
  next();
}

module.exports = { getGuideById, protectGuide };
