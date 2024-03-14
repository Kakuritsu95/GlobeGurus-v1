const express = require("express");
const connectMongo = require("./config/connectMongo");
const configureCloudinary = require("./config/configureCloudinary");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config(".env");

const app = express();
connectMongo(process.env.MONGOURI);
configureCloudinary();

const router = require("./routes/guidesRouter");

const nearbyPlacesRouter = require("./routes/nearbyPlacesRouter");

const usersAuthRouter = require("./routes/usersAuthRouter");

app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/guides", router);

app.use("/nearby-places", nearbyPlacesRouter);

app.use("/auth", usersAuthRouter);

app.post("/try", (req, res) => {
  res.json({ data: req.body });
});

app.listen(process.env.PORT, () => {
  console.log(`server listening to port ${process.env.PORT}`);
});
