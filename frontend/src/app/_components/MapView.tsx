import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 10,
    lng: 10,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBQ-7FRus3W2IvCX1Fr3Eis77q0CdL-pOs">
      <a>Map View</a>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;