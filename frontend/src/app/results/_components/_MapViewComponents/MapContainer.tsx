import React from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

interface MapContainerProps {
  mapContainerStyle: any;
  markerCenter: { lat: any; lng: any };
  zoom: number;
  markers: { lat: any; lng: any }[];
}

function MapContainer({ mapContainerStyle, markerCenter, zoom, markers }: MapContainerProps) {
  return (
    <div>
      <LoadScript
        googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={markerCenter}
          zoom={zoom}
        >
          <Marker position={markerCenter} />
          {markers.map((marker, index) => (
            <Marker
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