import React, { useState } from "react";
import "./ModalStyles.css";
import WeatherTable from "./WeatherTable";
import { Flight, WeatherData } from "@/app/results/_interfaces/flightsInterfaces"
import JourneyCardContainer from "./JourneyCardContainer";

const MapModal = ({
  display2,
  isOpen,
  onClose,
  flights,
  weather,
  updateMarkerCenter,
  onAirportCodesReceived,
}: {
  display2: boolean,
  isOpen: any;
  onClose: any;
  flights: Flight[];
  weather: WeatherData
  updateMarkerCenter: any;
  onAirportCodesReceived: (codes: string[]) => void;
}) => {
  if (!isOpen) {
    return null;
  }
  const handleInspectClick = async (index: any) => {
    try {
      const Codes = [flights[index].journeys[0].departureAirport];
      Codes.push();
      for (let i = 0; i < flights[index].journeys.length / 2; i++) {
        const code = flights[index].journeys[i].arrivalAirport;
        Codes.push(code);
      }
      onAirportCodesReceived(Codes);
    } catch (error) {
      alert(error);
    }
  };

  if (!flights) {
    return <div>Loading...</div>
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-center font-bold ">Your Results:</h2>
        <WeatherTable weather={weather} display3 = {display2}/>
        <div className="modal-scrollable-content">
          {flights?.map((flight: any, index: any) => (
            <JourneyCardContainer
              key={index}
              index={index}
              onInspectClick={handleInspectClick}
              flight={flight}
              updateMarkerCenter={updateMarkerCenter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapModal;
