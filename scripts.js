// Variaveis e seleçao de elementos

const apikey = "52565e063045c56977ddeafaa403f2e9";
const apicountryURL = "https://flagsapi.com/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const umidityElement = document.querySelector("#umidity span")
const windElement = document.querySelector("#wind span")
const errorMessageContainer = document.querySelector("#error-message");
const weatherContainer = document.querySelector("#weather-data")

// Funçoes
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=Pt_br`;
    const res = await fetch(apiWeatherURL)
    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
    hideInformation();
    const data = await getWeatherData(city);
    if (data.cod === "404") {
        showErrorMessage();
        return;
        }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute("src", apicountryURL + data.sys.country + "/shiny/64.png");
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}Km/h`;

    weatherContainer.classList.remove("hide")

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove("hide");

};

// Eventos

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})

// Tratamento de erro
    const showErrorMessage = () => {
        errorMessageContainer.classList.remove("hide");
    };

    const hideInformation = () => {
        errorMessageContainer.classList.add("hide");
        weatherContainer.classList.add("hide");

  };
