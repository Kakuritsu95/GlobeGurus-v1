const express = require("express");
const app = express();
const connectMongo = require("./config/connectMongo");
const Guide = require("./schemas/GuideSchema");
app.use(express.json());
require("dotenv").config(".env");
connectMongo(process.env.MONGOURI);
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
app.listen(process.env.PORT, () => {
  console.log(`server listening to port ${process.env.PORT}`);
});
