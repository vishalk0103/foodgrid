const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const restaurantRoute = require("./routes/restaurants");
const foodRoute = require("./routes/food-route");
const addressRoute = require("./routes/address-route");
const userRoute = require("./routes/user-route");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/restaurants", restaurantRoute);
app.use("/api/foods", foodRoute);
app.use("/api/address", addressRoute);
app.use("/api/user", userRoute);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An error occured" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wdpxo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("APP LISTNING ON PORT:8000");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
