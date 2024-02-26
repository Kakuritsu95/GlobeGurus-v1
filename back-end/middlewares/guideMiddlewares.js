const Guide = require("../schemas/guideSchema");
async function getGuideById(req, res, next) {
  const { id } = req.params;
  try {
    const guide = await Guide.findById(id);

    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }
    req.guide = guide;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { getGuideById };
