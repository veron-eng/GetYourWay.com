import React from 'react'
import { WeatherData } from '../../_interfaces/flightsInterfaces'

interface WeatherTableProps {
  weather: WeatherData
}

function WeatherTable({ weather }: WeatherTableProps) {
  return (
    <div>
      <h2>Weather at destination:</h2>
      <ul>
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