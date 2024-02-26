import moment from "moment";
const DateWithTime = (props) => {
  const offset = props.weather.timezone - 1000;
  const time = props.weather.dt;

  const currentTime = new Date((time + offset) * 1000);
  const formattedTime = moment(currentTime).format(
    "dddd, MMMM Do YYYY, h:mm A z"
  );

  return formattedTime && <div className="time">{formattedTime}</div>;
};

export default DateWithTime;
