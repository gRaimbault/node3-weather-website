const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    process.env.OPEN_WEATHER_API_KEY;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (!body.weather) {
      callback(
        "Unable to find weather for this location. Try another search.",
        undefined
      );
    } else {
      callback(undefined, {
        weather_descriptions: body.weather[0].description,
        temperature: body.main.temp,
      });
    }
  });
};

module.exports = forecast;
