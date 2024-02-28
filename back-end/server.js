const express = require("express");
const connectMongo = require("./config/connectMongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config(".env");
const { v2: cloudinary } = require("cloudinary");
const app = express();
connectMongo(process.env.MONGOURI);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const guidesRouter = require("./routes/guidesRouter");
const nearbyPlacesRouter = require("./routes/nearbyPlacesRouter");
const usersAuthRouter = require("./routes/usersAuthRouter");
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/guides", guidesRouter);
app.use("/nearby-places", nearbyPlacesRouter);
app.use("/auth", usersAuthRouter);

app.listen(process.env.PORT, () => {
  console.log(`server listening to port ${process.env.PORT}`);
});
