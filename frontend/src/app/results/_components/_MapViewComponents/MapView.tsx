import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MapModal from "./MapModal";
import { FlightsData } from "../../_interfaces/flightsInterfaces";
import MapContainer from "./MapContainer";

interface MapComponentProps {
  flightsData: FlightsData;
}

const MapView = ({ flightsData }: MapComponentProps) => {
  // marker requests
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(true);
  const [markerCenter, setCenter] = useState<{ lat: any; lng: any }>({
    lat: 40.4948,
    lng: -3.5793544,
  });
  const [markers, setMarkers] = useState<{ lat: any; lng: any }[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: any; lng: any }>({
    lat: 40.4948,
    lng: -3.5793544,
  });
  const [zoom, setZoom] = useState(10);

  const handleAirportCodes = async (codes: string[]) => {
    const locations = [];
    for (let i = 0; i < codes.length; i++) {
      try {
        const response = await axios.get(
          `http://13.43.55.166:8000/getLocation/${codes[i]}+airport`
        );
        const { lat, lon } = response.data;
        if (lat && lon) {
          locations.push({ lat: parseFloat(lat), lng: parseFloat(lon) });
        } else {
          alert(
            "Sorry, This airport cannot be found on the map. Please try another airport"
          );
        }
      } catch (error) {
        alert(error);
      }
    }
    const centerize = findCenter(locations);
    setMarkers(locations);
    setCenter(locations[0]);
    setMapCenter(centerize);
    setZoom(3);
  };

  function findCenter(locations: any) {
    if (locations.length === 0) {
      return { lat: 0, lng: 0 }; // Default center if no locations
    }

    let totalLat = 0;
    let totalLng = 0;

    for (const location of locations) {
      totalLat += location.lat;
      totalLng += location.lng;
    }

    const centerLat = totalLat / locations.length;
    const centerLng = totalLng / locations.length;

    return { lat: centerLat, lng: centerLng };
  }

  const updateMarkercenter = (lat: any, lng: any) => {
    setCenter({ lat, lng });
    setMapCenter({ lat, lng });
    setZoom(10);
    setMarkers([]);
  };

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = {
    lat: 51.4679914,
    lng: -0.455051,
  };

  const [display1, setDisplay1] = useState(false);
  const handleDisplay1 = (value: boolean) => {
    setDisplay1(value);
  };

  if (flightsData === undefined || flightsData === null) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        <div className="flex h-[616px] rounded-lg bg-gray-200 p-2 justify-center border border-gray-300">
          <div id="weatherItems" className="w-1/4 bg-gray-100">
            <MapModal
              display2={display1}
              isOpen={isMapModalOpen}
              onClose={closeMapModal}
              flights={flightsData.flights}
              weather={flightsData.destinationWeather}
              updateMarkerCenter={updateMarkercenter}
              onAirportCodesReceived={handleAirportCodes}
            />
          </div>
          <div className="w-3/4 justify-center">
            <MapContainer
              weather={flightsData.destinationWeather}
              handleDisplay={handleDisplay1}
              mapContainerStyle={mapContainerStyle}
              markerCenter={markerCenter}
              zoom={zoom}
              markers={markers}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MapView;
