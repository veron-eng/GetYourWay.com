import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import MapModal from "./MapModal";

const MapComponent = ({ flightsData }: { flightsData: any }) => {
  const [latitude, setLatitude] = useState(null); //marker requests
  const [longitude, setLongitude] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(true);
  const [MarkerCenter, setCenter] = useState<{ lat: any; lng: any }>({
    lat: 40.4948,
    lng: -3.5793544,
  });
  const [markers, setMarkers] = useState<{ lat: any; lng: any }[]>([]);
  const [MapCenter, setMapCenter] = useState<{ lat: any; lng: any }>({
    lat: 40.4948,
    lng: -3.5793544,
  });
  const [zoom, setZoom] = useState(10);

  const handleAirportCodes = async (codes: string[]) => {
    const locations = [];
    for (let i = 0; i < codes.length; i++) {
      try {
        const response = await axios.get(
          `http://localhost:8000/getLocation/${codes[i]}+airport`
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

  const [data, setData] = useState<any>([]);
  useEffect(() => {
    if (flightsData) {
      setData(flightsData);
    }
  }, [flightsData]);

  if (data.length === 0) {
    return <>Loading...</>;
  }

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

  return (
    <>
      <div>
        <div className="flex h-[616px] rounded-lg bg-gray-200 p-2 justify-center border border-gray-300">
          <div className="w-1/4 bg-gray-100">
            <MapModal
              isOpen={isMapModalOpen}
              onClose={closeMapModal}
              flights={data.flights}
              updateMarkerCenter={updateMarkercenter}
              onAirportCodesReceived={handleAirportCodes}
            />
          </div>
          <div className="w-3/4 justify-center">
            <div>
              <LoadScript
                googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={MarkerCenter}
                  zoom={zoom}
                >
                  <Marker position={MarkerCenter} />
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
          </div>
        </div>
        <div className="flex flex-row justify-center items-center rounded-lg bg-gray-200 h-[50px] border border-gray-300 gap-x-20">
          <button
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-bold w-[300px]"
            onClick={openMapModal}
          >
            Flight results
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-bold w-[300px]">
            Things to do
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-bold w-[300px]">
            TV Reccomendations
          </button>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
