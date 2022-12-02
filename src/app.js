require("dotenv").config();
console.log(process.env);
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Guillaume",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help LALALA",
    name: "Guillaume",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error: "geocoding error", errorContent: error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error: "forecast error", errorContent: error });
          }
          console.log(location);
          console.log(forecastData);

          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page help article",
    name: "Guillaume",
    error: "404 NOT FOUND HELP",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Guillaume",
    error: "404 NOT FOUND",
  });
});

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});
