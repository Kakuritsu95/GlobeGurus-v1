async function getTerritoryCoords(req, res) {
  try {
    const { territoryQuery } = req.params;
    const response = await fetch(
      `http://api.geonames.org/searchJSON?q=${territoryQuery}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`
    );
    const territory = await response.json();
    if (territory.geonames.length === 0)
      return res
        .status(400)
        .json({ message: "Please provide a valid territory" });
    const { lat, lng } = territory.geonames[0];
    res.json(`${lat}, ${lng}`);
  } catch (err) {
    res.status(500).json({ message: "couldnt find terriroty" });
  }
}

module.exports = { getTerritoryCoords };
