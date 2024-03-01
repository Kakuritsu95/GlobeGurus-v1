const Guide = require("../schemas/guideSchema");
const uploadImage = require("../helpers/uploadImage");
async function createGuide(req, res) {
  const user = req.user;
  try {
    const guide = req.body;
    const imageFile = req.file;
    const imageUrl = await uploadImage("guideImages", imageFile);
    const newGuide = new Guide({ ...guide, imageUrl, owner: user._id });
    const savedGuide = await newGuide.save();
    if (!savedGuide)
      return res.status(500).json({
        message:
          "Something went wrong the guide wasn't submitted to the database",
      });

    res.json(savedGuide);
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

async function deleteGuide(req, res) {
  try {
    const guideId = req.guide._id;
    const deletedGuide = await Guide.findByIdAndDelete(guideId);
    if (!deletedGuide)
      res.status(500).json({ message: "Guide couldnt be deleted" });

    res.json("guide deleted");
  } catch (error) {}
}

async function getUserGuides(req, res) {
  const user = req.user;
  console.log(user);

  try {
    const userGuides = await Guide.find({ owner: user._id });

    if (!userGuides)
      return res.status(404).json({ message: "Could not find guides" });
    res.json(userGuides);
  } catch (err) {
    res.json(err.message);
  }
}

module.exports = { createGuide, updateGuide, getUserGuides, deleteGuide };
