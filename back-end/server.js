const express = require("express");
const app = express();
const connectMongo = require("./config/connectMongo");
const Guide = require("./schemas/GuideSchema");
const cors = require("cors");
app.use(express.json());
require("dotenv").config(".env");
connectMongo(process.env.MONGOURI);
app.use(cors({ origin: "http://localhost:5173" }));
app.get("/", (req, res) => {
  console.log("received request");
  res.json({ message: "hi", number: 15 });
});
app.get("/:name/:age", (req, res) => {
  const { name, age } = req.params;
  console.log(name, age);
  res.json({ message: `hi ${name}, you are ${age} years old` });
});
app.put("/guide/new", async (req, res) => {
  try {
    const guide = req.body;
    const newGuide = new Guide(guide);
    await newGuide.save();
    console.log(newGuide.toObject());
  } catch (err) {
    console.log(err);
  } finally {
    res.end();
  }
});
app.get("/nearbyplaces", async (req, res) => {
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.142060,24.886975&radius=20&key=${process.env.GMAPSKEY}`
    );
    const data = await resp.json();
    if (!data)
      throw new Error(
        "Couldnt find any places around, please click somewhere else or fill the next form"
      );

    const dataWithImgUrl = data.results.reduce((places, currentPlace) => {
      if (
        currentPlace.types.includes("locality") &&
        currentPlace.types.includes("political")
      )
        return places;
      const {
        name,
        geometry: {
          location: { lat, lng },
        },
        types,
        vicinity: address,
      } = currentPlace;
      const coords = [lat, lng];
      const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${currentPlace?.photos[0]?.photo_reference}&key=${process.env.GMAPSKEY}`;

      return [...places, { name, coords, types, address, imageUrl }];
    }, []);
    res.json(dataWithImgUrl);
  } catch (error) {
    res.json(error);
  }
});
app.listen(process.env.PORT, () => {
  console.log(`server listening to port ${process.env.PORT}`);
});
