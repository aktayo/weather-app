const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const openWeather = "https://api.openweathermap.org/data/2.5/";
const weatherType = "weather?";

const GetWetherInfo = async (city) => {
  const url = new URL(
    `${openWeather}${weatherType}q=${city}&units=metric&APPID=${API_KEY}`
  );
  return await fetch(url)
    .then(async (res) => await res.json())
    .catch(console.log("Error: No result"));
};
const GetWeatherFormattedData = async (result) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    name,
    sys: { country, sunrise, sunset },
    timezone,
    visibility,
    wind: { speed },
    dt,
    weather: [{ main, icon }],
  } = result;
  const weatherUpdate = {
    temp: temp.toFixed(1),
    feels_like: feels_like,
    temp_min: temp_min,
    temp_max: temp_max,
    pressure: pressure,
    humidity: humidity,
    cityName: name,
    country: country,
    sunrise: sunrise,
    sunset: sunset,
    timezone: timezone,
    visibility: visibility,
    speed: speed,
    dt: dt,
    lon: lon,
    lat: lat,
    main: main,
    icon: icon,
  };
  return weatherUpdate;
};
const GetWeatherData = async (city) => {
  const getCurrentWeather = await GetWetherInfo(city).then(
    GetWeatherFormattedData
  );
  return getCurrentWeather;
};

export default GetWeatherData;
