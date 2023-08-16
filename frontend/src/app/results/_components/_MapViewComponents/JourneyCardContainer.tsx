import React from 'react';
import { Flight } from '@/app/results/_interfaces/flightsInterfaces';
import JourneyCard from '@/app/results/_components/_MapViewComponents/JourneyCard';

interface JourneyCardContainerProps {
  index: number;
  onInspectClick: any;
  flight: Flight;
  updateMarkerCenter: any;
}

function JourneyCardContainer({ index, onInspectClick, flight, updateMarkerCenter }: JourneyCardContainerProps) {
  return (
    <div key={index} className="journey-card-container gap-y-10">
      <div className="flex flex-row bg-gray-200 border border-gray-300 gap-x-10">
        <h3 className="text-center">Result {index + 1}</h3>
        <button
          onClick={() => onInspectClick(index)}
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
          <JourneyCard
            index={journeyIndex}
            journey={journey}
            updateMarkerCenter={updateMarkerCenter}
          />
        </div>
      ))}
    </div>
  )
}

export default JourneyCardContainer