const { uploadImage } = require("../helpers/handleImageBuckets");

async function addPlace(req, res) {
  try {
    const guide = req.guide;
    const place = req.body;
    const imageFile = req.file;
    const imageUrl = await uploadImage("placesImage", imageFile);
    guide.places.push({ ...place, imageUrl });
    const updatedGuide = await guide.save();
    return res.json(updatedGuide);
  } catch (err) {
    res.json(err.message);
  }
}

async function updatePlace(req, res) {
  try {
    const guide = req.guide;
    const { placeId } = req.params;
    const updatedPlace = guide.places
      .find((el) => el._id == placeId)
      .set(req.body);
    if (!updatedPlace)
      res.status(500).json({ message: "ERROR: place not found!" });
    const updatedGuide = await guide.save();
    res.json(updatedGuide);
  } catch (err) {
    res.json({ error: err.message });
  }
}

async function deletePlace(req, res) {
  try {
    const guide = req.guide;
    const { placeId } = req.params;
    const index = guide.places.findIndex((place) => place.id == placeId);
    guide.places.splice(index, 1);
    const updatedGuide = await guide.save();
    res.json(updatedGuide);
  } catch (err) {
    res.json({ message: err });
  }
}
module.exports = { addPlace, updatePlace, deletePlace };
