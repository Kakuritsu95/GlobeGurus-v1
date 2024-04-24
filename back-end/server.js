const express = require("express");
const connectMongo = require("./config/connectMongo");
const configureCloudinary = require("./config/configureCloudinary");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config(".env");

const app = express();
connectMongo(process.env.MONGOURI);
configureCloudinary();

const guidesRouter = require("./routes/guidesRouter");

const nearbyPlacesRouter = require("./routes/nearbyPlacesRouter");

const usersRouter = require("./routes/usersRouter");

const geolocationRouter = require("./routes/geolocationRouter");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/guides", guidesRouter);

app.use("/nearby-places", nearbyPlacesRouter);

app.use("/auth", usersRouter);

app.use("/geolocation", geolocationRouter);

app.post("/try", (req, res) => {
  res.json({ data: req.body });
});

app.listen(process.env.PORT, () => {
  `server listening to port ${process.env.PORT}`;
});
