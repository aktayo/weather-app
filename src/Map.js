import React from "react";

const Map = (props) => {
  const city = props.weather.cityName;
  console.log(city);
  return (
    city && (
      <div className="map">
        <iframe
          width="100%"
          height="300"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://maps.google.com/maps?width=100%25&height=300&hl=en&q=${city}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>
    )
  );
};

export default Map;
