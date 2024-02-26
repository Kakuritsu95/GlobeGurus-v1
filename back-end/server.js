const express = require("express");
const app = express();
const connectMongo = require("./config/connectMongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const guidesRouter = require("./routes/guidesRouter");
const nearbyPlacesRouter = require("./routes/nearbyPlacesRouter");
const usersAuthRouter = require("./routes/usersAuthRouter");
app.use(express.json());
app.use(cookieParser());
require("dotenv").config(".env");
connectMongo(process.env.MONGOURI);
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/guides", guidesRouter);
app.use("/nearby-places", nearbyPlacesRouter);
app.use("/auth", usersAuthRouter);

app.listen(process.env.PORT, () => {
  console.log(`server listening to port ${process.env.PORT}`);
});
