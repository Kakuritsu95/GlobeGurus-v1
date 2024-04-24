const { uploadImage, deleteImage } = require("../helpers/handleImageBuckets");

async function addPlace(req, res) {
  try {
    const guide = req.guide;
    if (req.body.types) req.body.types = req.body.types.split(",");
    const newPlace = req.body;

    newPlace.coords = newPlace.coords.split(",");
    const imageFile = req.file;
    const imageUrl = await uploadImage("placeImages", imageFile);
    guide.places.push({ ...newPlace, imageUrl });

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
    const placeToUpdate = guide.places.find((el) => el._id == placeId);
    if (req.body.types) req.body.types = req.body.types.split(",");
    req.body.coords = req.body.coords.split(",");

    if (req.file) {
      deleteImage("placeImages", placeToUpdate.imageUrl);
      const newImageUrl = await uploadImage("placeImages", req.file);

      placeToUpdate.set({ ...req.body, imageUrl: newImageUrl });
    } else placeToUpdate.set(req.body);
    if (!placeToUpdate)
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

    const imageToDelete = guide.places.splice(index, 1)[0].imageUrl;
    const updatedGuide = await guide.save();
    deleteImage("placeImages", imageToDelete);
    res.json(updatedGuide);
  } catch (err) {
    res.json({ message: err });
  }
}
module.exports = { addPlace, updatePlace, deletePlace };
