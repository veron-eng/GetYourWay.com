import React from "react";
import { Journey } from "@/app/results/_interfaces/flightsInterfaces";

const formatTime = (time: string) => {
  const date = new Date(time);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Arrow = () => <span className="text-3xl">✈</span>;

const renderLinearJourney = (journeys: Journey[]) => {
  const segments: JSX.Element[] = [];

  const parseDurationToHoursMinutes = (duration: string): string => {
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);

    const hours = hoursMatch ? hoursMatch[1] : "0"; // Use "0" if no hour is found
    const minutes = minutesMatch ? minutesMatch[1] : "0"; // Use "0" if no minute is found

    return `${hours}h ${minutes}m`;
  };

  journeys.forEach((journey, idx) => {
    // For the first segment, show only the departure airport and time
    if (idx === 0) {
      segments.push(
        <span key={`dep-${idx}`}>{`${journey.departureAirport} ${formatTime(
          journey.departureScheduledTime
        )}`}</span>
      );
    }

    // Arrow with Duration above
    segments.push(
      <div className="flex flex-col items-center" key={`arrow-div-${idx}`}>
        <span className="text-xs text-gray-600">
          {parseDurationToHoursMinutes(journey.duration)}
        </span>
        <Arrow key={`arrow-${idx}`} />
      </div>
    );

    // For every segment, show the arrival time, airport code, and the departure time
    segments.push(
      <span key={`arr-${idx}`}>{`${formatTime(journey.arrivalScheduledTime)} ${
        journey.arrivalAirport
      }`}</span>
    );

    // For the final flight, show just the arrival time and airport
    if (idx !== journeys.length - 1) {
      segments.push(
        <span key={`next-dep-${idx}`}>
          {formatTime(journeys[idx + 1].departureScheduledTime)}
        </span>
      );
    }
  });

  return (
    <div className="flex gap-x-2 gap-y-6 items-center flex-wrap">
      {segments}
    </div>
  );
};

export default function ConnectingFlightsModal({
  selectedJourney,
  showModal,
  setShowModal,
}: {
  selectedJourney: any;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    showModal && (
      <div
        className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center"
        onClick={() => setShowModal(false)}
      >
        <div
          className="bg-white p-2 py-10 rounded-lg flex flex-col gap-y-4 items-center relative sm:text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-2 right-2">
            <button onClick={() => setShowModal(false)}>X</button>
          </div>
          {renderLinearJourney(selectedJourney)}
          <div className="text-gray-500">
            Note: All times shown are local to that country.
          </div>
        </div>
      </div>
    )
  );
}
