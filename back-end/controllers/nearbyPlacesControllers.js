async function getNearbyPlaces(req, res) {
  const { lat, lng } = req.query;

  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10&key=${process.env.GMAPSKEY}`
    );
    const nearbyPlaces = await resp.json();
    if (!nearbyPlaces)
      throw new Error(
        "Couldnt find any places around, please click somewhere else or fill the next form"
      );

    const nearbyPlacesWithImgUrl = nearbyPlaces.results.reduce(
      (nearbyPlaces, currentPlace) => {
        if (
          currentPlace.types.includes("locality") ||
          currentPlace.types.includes("vicinity") ||
          currentPlace.types.includes("political")
        )
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
        console.log(currentPlace.photos);

        const imageUrl = currentPlace?.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${currentPlace?.photos[0]?.photo_reference}&key=${process.env.GMAPSKEY}`
          : "";

        return [...nearbyPlaces, { name, coords, types, address, imageUrl }];
      },
      []
    );

    res.json(nearbyPlacesWithImgUrl);
  } catch (error) {
    res.json(error.message);
  }
}
module.exports = getNearbyPlaces;
