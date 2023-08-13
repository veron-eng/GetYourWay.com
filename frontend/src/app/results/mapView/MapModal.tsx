import React, { useState } from "react";
import JourneyCard from "./JourneyCard";
import "./ModalStyles.css";
import axios from "axios";

interface Journey {
  departureAirport: string;
  departureScheduledTime: string;
  arrivalAirport: string;
  arrivalScheduledTime: string;
  duration: string;
  flightNumber: string;
}

interface Flight {
  journeys: Journey[];
  price: string;
}

interface FlightsData {
  flights: Flight[];
  destinationWeather: {
    maxTemperature: string;
    minTemperature: string;
    avgTemperature: string;
    maxWind: string;
    avgHumidity: string;
    icon: string;
  };
}

const MapModal = ({
  isOpen,
  onClose,
  flights,
  updateMarkerCenter,
  onAirportCodesReceived,
}: {
  isOpen: any;
  onClose: any;
  flights: any;
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
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-center font-bold ">Your Results:</h2>
        <div className="modal-scrollable-content">
          {flights.map((flight: any, index: any) => (
            <div key={index} className="journey-card-container gap-y-10">
              <div className="flex flex-row bg-gray-200 border border-gray-300 gap-x-10">
                <h3 className="text-center">Result {index + 1}</h3>
                <button
                  onClick={() => handleInspectClick(index)}
                  className="bg-green-500 text-white text-xs rounded-lg px-4 h-[20px]"
                >
                  Inspect journey
                </button>
              </div>

              {flight.journeys.map((journey: any, journeyIndex: any) => (
                <div
                  key={journeyIndex}
                  className="flex flex-row text-xs gap-x-5 bg-gray-100 rounded-lg journey-card items-center"
                >
                  <div>Flight {journeyIndex + 1}:</div>
                  <JourneyCard
                    journey={journey}
                    updateMarkerCenter={updateMarkerCenter}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapModal;
