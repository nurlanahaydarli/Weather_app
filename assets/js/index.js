let search_input = document.querySelector("#search_input")
let search_btn = document.querySelector("#search_btn")
let weather_box = document.querySelector(".weather")


let temp_type = ['drizzle', 'clear', 'mist', 'rainy', 'smoke', 'snow']

async function getSearchCityWeather(city) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c17bc3b039b1b73de4e0175c6792ff96`;
        const response = await fetch(url);
        const data = await response.json();
        if(response.status === 404){
           return weather_box.innerHTML = `<img class="weather-icon" src="assets/img/error.png" alt="...">
                <h2 class="error">${data.message}</h2>`
        }
        if(response.status === 400){
           return weather_box.innerHTML = `<img class="weather-icon" src="assets/img/error.png" alt="...">
                <h2 class="error">${data.message}</h2>`
        }
        let weather = data.weather[0].main
        weather_box.innerHTML = `
            <img class="weather-icon" src="assets/img/${weather.toLowerCase()}.png " alt="${data.name}">
                <h1 class="temp">${Math.ceil(data.main.temp)}°C </h1>
                <h2 class="city">${data.name}</h2>
                <div class="details">
                    <div style="display: flex;" class="col">
                        <img class="humi" src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png">
                        <div class="info">
                            <p class="humidity">${data.main.humidity} %</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="col">
                        <img src="https://cdn-icons-png.flaticon.com/512/136/136712.png">
                        <div class="info">
                            <p class="wind">${data.wind.speed} km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
        `
        return data;
    } catch (err) {
        console.log("err", err);
    }
}

search_btn.addEventListener("click", async function () {
    let city_name = search_input.value;
    city_name = city_name.toLowerCase()
    await getSearchCityWeather(city_name)
    search_input.value = ""
})

