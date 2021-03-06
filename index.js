require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require('morgan');
const errorHandler = require('./error');
const indexRoutes = require("./routes");
const weatherRoutes = require("./routes/weather");
const profileRoutes = require("./routes/profileRoutes");
const lostRoutes = require("./routes/lost");
const { dbQuery } = require("./dbConnection");
dbQuery();

app.use(cors());
app.set("port", process.env.PORT);
app.set("ip", process.env.IP);
app.use(logger('dev'));

app.use(express.json());

app.use("/", indexRoutes);
app.use("/weather", weatherRoutes);
app.use("/lost", lostRoutes);
app.use("/profile", profileRoutes);

app.get("*", (req, res) => {
  return res.send("error 404, page not found");
});

app.use(errorHandler);

app.listen(app.get("port"), app.get("ip"), (err) => {
  if (err) {
    throw Error;
  } else {
    console.log("hello world server is running on port 8080");
  }
});
