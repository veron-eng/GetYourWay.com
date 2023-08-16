import React from 'react'
// const google = window.google
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { sys } from 'typescript';
import { WeatherData } from '../../_interfaces/flightsInterfaces';

interface MapContainerProps {
  weather:WeatherData
  handleDisplay: any
  mapContainerStyle: any;
  markerCenter: { lat: any; lng: any };
  zoom: number;
  markers: { lat: any; lng: any }[];
}

function MapContainer({ weather, handleDisplay, mapContainerStyle, markerCenter, zoom, markers }: MapContainerProps) {
  console.log(weather.icon.substring(2))
  const customIcon = {
    // url: "https://cdn.weatherapi.com/weather/64x64/day/356.png",
    url: "https:"+weather.icon,
    // scaledSize: new google.maps.Size(80, 80)
  }
  const displayWeather = (value:boolean) => {
    handleDisplay(value)
  }
  return (
    <div>
      <LoadScript
        googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={markerCenter}//needs to be changed to destination + line 26
          zoom={zoom}
        >
          <Marker position={markerCenter} icon = {customIcon}/>
          {markers.map((marker, index) => (
            <Marker
              onClick = {(e: google.maps.MapMouseEvent) => {displayWeather(true)}}
              icon = {customIcon}
              key={index}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapContainer