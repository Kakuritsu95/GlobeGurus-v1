const EXCLUDED_NEARBY_TYPES = require("../constants");
async function getNearbyPlaces(req, res) {
  const { lat, lng } = req.query;

  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&key=${process.env.GMAPSKEY}`
    );
    const nearbyPlaces = await resp.json();
    if (nearbyPlaces?.results?.length == 0)
      return res.status(404).json({ message: "No nearby places found" });

    const nearbyPlacesWithImgUrl = nearbyPlaces.results.reduce(
      (nearbyPlaces, currentPlace) => {
        if (currentPlace.types.some((el) => EXCLUDED_NEARBY_TYPES.includes(el)))
          return nearbyPlaces;
        const {
          name,
          geometry: {
            location: { lat, lng },
          },
          types,

          vicinity: address,
        } = currentPlace;

        const coords = [lat, lng];
        const imageUrl = currentPlace?.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=10000&maxHeight=10000&photoreference=${currentPlace?.photos?.[0]?.photo_reference}&key=${process.env.GMAPSKEY}`
          : "";

        return [...nearbyPlaces, { name, coords, types, address, imageUrl }];
      },
      []
    );
    const sortedPlacesByImageUrl = nearbyPlacesWithImgUrl.sort(
      (place1, place2) => (place1?.imageUrl && !place2?.imageUrl ? -1 : 1)
    );
    res.json(sortedPlacesByImageUrl);
  } catch (error) {
    res.json(error.message);
  }
}
module.exports = getNearbyPlaces;
