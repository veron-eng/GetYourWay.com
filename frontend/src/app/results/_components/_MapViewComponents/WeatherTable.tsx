import React from 'react'
import { WeatherData } from '../../_interfaces/flightsInterfaces'

interface WeatherTableProps {
  weather: WeatherData
}

function WeatherTable({ weather }: WeatherTableProps) {
  console.log('MapTable rendering!')
  
  return (
    <div>
      <h2>Weather at destination:</h2>
      <ul id='weatherItems'>
        <li>Max temperature: {weather.maxTemperature}&#x2103;</li>
        <li>Min temperature: {weather.minTemperature}&#x2103;</li>
        <li>Average temperature: {weather.avgTemperature}&#x2103;</li>
        <li>Max wind: {weather.maxWind} mph</li>
        <li>Average humidity: {weather.avgHumidity}&#x25;</li>
      </ul>
    </div>
  )
}

export default WeatherTable