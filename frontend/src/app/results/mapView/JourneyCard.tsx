import React from "react";
import axios from "axios";

export default function Card({
  journey,
  updateMarkerCenter,
}: {
  journey: any;
  updateMarkerCenter: any;
}) {
  const handleInspectClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getLocation/${journey.arrivalAirport}+airport`
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
  );
}
