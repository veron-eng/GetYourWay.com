import React from "react";
import axios from "axios";

interface JourneyCardProps {
  index: number;
  journey: any;
  updateMarkerCenter: any;
}

export default function JourneyCard({
  index,
  journey,
  updateMarkerCenter,
}: JourneyCardProps) {
  const handleInspectClick = async () => {
    try {
      const response = await axios.get(
        `http://13.43.55.166:8000/getLocation/${journey.arrivalAirport}+airport`
      );
      const { lat, lon } = response.data;
      if (lat && lon) {
        updateMarkerCenter(lat, lon);
      } else {
        alert(
          "Sorry, This airport cannot be found on the map. Please try another airport"
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div>Flight {index + 1}:</div>
      <div className="flex-row flex justify-center text-center gap-x-5 h-[25px] items-center">
        <div className="">Departure: {journey.departureAirport}</div>
        <div className="">Arrival: {journey.arrivalAirport}</div>
        <button
          className="bg-green-500 text-white rounded-lg px-4 h-[20px]"
          onClick={handleInspectClick}
        >
          Inspect
        </button>
      </div>
    </>
  );
}
