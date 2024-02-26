const Guide = require("../schemas/guideSchema");
async function createGuide(req, res) {
  try {
    const guide = req.body;
    const newGuide = new Guide(guide);
    const savedGuide = await newGuide.save();
    if (!savedGuide)
      return res.status(500).json({
        message:
          "Something went wrong the guide wasn't submitted to the database",
      });

    res.json(newGuide);
  } catch (err) {
    res.json({ message: err.message });
  }
}
async function updateGuide(req, res) {
  try {
    const guide = req.guide;

    guide.set(req.body);

    const updatedGuide = await guide.save();
    if (!updatedGuide)
      return res.status(500).json({ message: "Could not update guide" });

    res.status(201).json(updatedGuide);
  } catch (err) {
    res.json(err.message);
  }
}

async function getAllGuides(req, res) {
  try {
    const allGuides = await Guide.find({});
    if (!allGuides)
      return res.status(404).json({ message: "Could not find guides" });
    res.json(allGuides);
  } catch (err) {
    res.json(err.message);
  }
}

module.exports = { createGuide, updateGuide, getAllGuides };
