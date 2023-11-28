import React from "react"
const WeatherApp=({weather})=>{
  console.log("wethear",weather);
    return(
      <div>
        <div>
          { weather.main ? <p>temperature {weather.main.temp} Celcius</p>: null }
        </div>
        <div>
          {weather.weather?<div><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="the weather icon"></img></div>:null}
        </div>
        <div>
        {weather.weather? <p>Wind {weather.wind.speed} m/s</p>:null}
        </div>
      </div>
    )
}
export default WeatherApp