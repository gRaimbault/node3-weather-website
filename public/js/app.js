console.log("js file loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#coucou");
const messageTwo = document.querySelector("#coucou2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  if (location !== "") {
    fetch("/weather?address=" + location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent =
            data.forecast.weather_descriptions +
            ", temperature: " +
            data.forecast.temperature;
        }
      });
    });
  }
});
