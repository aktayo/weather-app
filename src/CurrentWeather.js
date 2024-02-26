import Hour from "./Hour";
import Daily from "./Daily";
import DateWithTime from "./DateTime";
import cloud from "./resources/cloudy.png";
import thunder from "./resources/thunder.png";
import rain from "./resources/rain.png";
import snow from "./resources/snow.png";
import sun from "./resources/sun.png";
import TemperatureData from "./TemperatureData";
import Map from "./Map";
import { useEffect, useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import GetWeatherData from "./GetWeatherData";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const CurrentWeather = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("Lagos");
  const [cityName, setCityName] = useState("");
  const [abuja, setAbuja] = useState(" ");
  const [port, setPort] = useState(" ");
  const [lag, setLag] = useState(" ");
  const [lon, setlon] = useState("");
  const [lat, setlat] = useState("");
  let greetings;
  let image;
  let attr;
  const topCity = ["Abuja", "Lagos", "Port Harcourt"];

// get location name using position icon
  const searchLocation = () => {
    let latitude = "";
    let longitude = "";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          setlon(longitude);
          setlat(latitude);

          const getCityName = async () => {
            if (lat && lon) {
              // Fetch city name using reverse geocoding
              await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
              )
                .then((response) => response.json())
                .then((data) => {
                  setCityName(data.name);
                })
                .catch((error) => {
                  console.error("Error fetching city name:", error);
                });
            }
          };
          getCityName();
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };
// get weather for the seach location
  const getSearchData = () => {
    if (cityName !== "") {
      GetWeatherData(cityName);
      setCity(cityName);
    }
  };

//get temperature for city at the top 
  const topCit = async () => {
    const top = await GetWeatherData(topCity[0]);
    setAbuja(top.temp);
    const top1 = await GetWeatherData(topCity[1]);
    setLag(top1.temp);
    const top2 = await GetWeatherData(topCity[2]);
    setPort(top2.temp);
  };

  // , temp1:top2.temp
  const cities = [
    { id: 1, value: "PortHarcourt", topTemp: port },
    { id: 2, value: "Abuja", topTemp: abuja },
    { id: 3, value: "Lagos", topTemp: lag },
  ];
// re-render when city changes
  useEffect(() => {
    const getData = async () => {
      const dataUpdate = await GetWeatherData(city).catch(console.log("err"));
      setData(dataUpdate);
      setCity(dataUpdate.cityName);
      console.log(dataUpdate);
    };

    getData();
    topCit();
    condition();
  }, [city]);
  // switch weather icon
  const stat = data.main;
  console.log(stat);
  const condition = (stat) => {
    switch (stat) {
      case "Rain":
        image = rain;
        attr = stat;
        break;
      case "Clouds":
        image = cloud;
        attr = stat;
        break;
      case "Snow":
        image = snow;
        attr = stat;
        break;
      case "Clear":
        image = sun;
        attr = stat;
        break;
      case "Thunderstorm":
        image = thunder;
        attr = stat;
        break;
      default:
        image = sun;
        attr = stat;
        break;
    }
  };
  // check time to display greetings
  condition(stat);
  const offset = data.timezone;
  const time = data.dt;
  const currentTime = new Date(
    (time + offset - 1000) * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    hour12: false,
  });
  if (currentTime < 12) {
    greetings = "Hello, it's morning here in";
  } else if (currentTime >= 12 && currentTime < 16) {
    greetings = "Yellow, it's afternoon here in";
  } else if (currentTime >= 16 && currentTime < 19) {
    greetings = "Yellow, it's evening here in";
  } else {
    greetings = "Yellow, it's night here in";
  }

  return (
    data && (
      <div className="envelop">
        <div className="navbar">
          {cities.map((city) => (
            <span key={city.id}>
              {city.topTemp}°C | {city.value}
            </span>
          ))}
          <span className="searchComp">
            <input
              type="text"
              className="search"
              name="searchCity"
              onChange={(e) => setCityName(e.target.value)}
            />
            <span className="searchIcon">
              <UilSearch
                size="25"
                color="#D1DAFB"
                margin="12px"
                onClick={getSearchData}
              />
              <UilLocationPoint
                size="25"
                color="#D1DAFB"
                margin="12px"
                onClick={searchLocation}
              />
            </span>
          </span>
        </div>

        <div className="topbox">
          <div className="display">
            <span className="imageCont">
              <h1>
                {greetings} {city}
              </h1>
              <span className="png">
                <img src={image} alt={attr} height={50} />
                <span>{attr}</span>
              </span>
            </span>
            <DateWithTime weather={data} />
            <TemperatureData place={city} weather={data} />
          </div>
          <Map weather={data} />
        </div>
        <span>7 Days Forecast..</span>
        <Daily weather={data} />
        <Hour />
      </div>
    )
  );
};

export default CurrentWeather;
