import React, { useEffect, useState } from "react";
import moment from "moment";

const Daily = (props) => {
  const openWeather = "https://api.openweathermap.org/data/2.5/";
  const [DaysData, setDaysData] = useState([]);
  const town = props.weather.cityName;
  useEffect(() => {
    const getDaysWeather = async (city) => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const apiUrl = `${openWeather}forecast?q=${city}&cnt=7&units=metric&appid=${apiKey}`;

      await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setDaysData(data.list))
        .catch((error) => console.error("Error fetching data:", error));
    };
    getDaysWeather(town);
  }, [town]);
  console.log(DaysData);
  return (
    DaysData && (
      <div className="forecast">
        {DaysData.map((item) => (
          <span className="days" key={item.dt}>
            <span>{moment(item.dt_txt).format("dddd, MMM, D")}</span>
            <span>{item.main.temp}°C</span>{" "}
            <span>{item.weather[0].description}</span>
          </span>
        ))}
      </div>
    )
  );
};

export default Daily;