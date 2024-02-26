
const TemperatureData = (props) => {
    const atmosphereData=[{id:1, value:props.weather.humidity + " Humidity"},
    {id:2, value:props.weather.speed+' Wind'},
    {id:3, value:props.weather.pressure+' Pressure'},
    {id:4, value:'Feels like '+props.weather.feels_like+ '°C'}]
    return ( 
        <div>
        <div className="temperature">
           
          {props.weather.temp}°C { props.place} {props.weather.country} 
        </div>
        <span className="atmData" >
        {atmosphereData.map((data)=>(
            <span key={data.id}>
            {data.value}
            </span>
        
        )

        )}
        </span>
        </div>
     );
}
 
export default TemperatureData;