import { useState } from "react";
import {
  Journey,
  FlightsData,
} from "@/app/results/_interfaces/flightsInterfaces";
import JourneyInfo from "./Journey";
import ConnectingFlightsModal from "./ConnectingFlightsModal";
interface FlightsListProps {
  flightsData: FlightsData;
  outboundTimesFilterRange: number[];
  returnTimesFilterRange: number[];
}

export default function FlightsList({
  flightsData,
  outboundTimesFilterRange,
  returnTimesFilterRange,
}: FlightsListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<Journey[]>([]);

  const handleStopsClick = (journeys: Journey[]) => {
    setSelectedJourney(journeys);
    setShowModal(true);
  };

  const isWithinTimeRange = (time: string, [startHour, endHour]: number[]) => {
    const date = new Date(time);
    const hours = date.getHours();
    return hours >= startHour && hours <= endHour;
  };

  const filteredFlights = flightsData?.flights?.filter(
    (flight) =>
      isWithinTimeRange(
        flight.journeys[0].departureScheduledTime,
        outboundTimesFilterRange
      ) &&
      (flight.journeys.length % 2 === 0
        ? isWithinTimeRange(
            flight.journeys[flight.journeys.length / 2].departureScheduledTime,
            returnTimesFilterRange
          )
        : true)
  );

  if (filteredFlights && filteredFlights.length === 0) {
    return (
      <div className="text-xl text-center">
        No flights available for the selected timings.
      </div>
    );
  }

  return (
    <>
      {filteredFlights?.map((flight, idx) => {
        const outboundStops = Math.floor(flight.journeys.length / 2) - 1;
        const returnStops =
          flight.journeys.length - Math.floor(flight.journeys.length / 2) - 1;

        return (
          <div key={idx} className="rounded-lg py-4 flex bg-white shadow-xl">
            <div className="flex-1 space-y-4 px-3">
              {/* Departure journey */}
              <JourneyInfo
                startJourney={flight.journeys[0]}
                endJourney={
                  flight.journeys[Math.floor(flight.journeys.length / 2) - 1]
                }
                showStops={outboundStops > 0}
                stopsCount={outboundStops}
                connections={flight.journeys.slice(
                  1,
                  Math.floor(flight.journeys.length / 2) - 1
                )}
                handleStopsClick={handleStopsClick}
              />

              {/* Return journey */}
              {flight.journeys.length % 2 === 0 && (
                <JourneyInfo
                  startJourney={flight.journeys[flight.journeys.length / 2]}
                  endJourney={flight.journeys[flight.journeys.length - 1]}
                  showStops={returnStops > 0}
                  stopsCount={returnStops}
                  connections={flight.journeys.slice(
                    flight.journeys.length / 2 + 1,
                    flight.journeys.length - 1
                  )}
                  handleStopsClick={handleStopsClick}
                />
              )}
            </div>
            <div className="flex-3 border-l px-3 flex flex-col justify-evenly">
              <div className="text-2xl sm:text-lg font-bold">
                ${flight.price}
              </div>
              <button className="bg-skyBlue text-white py-1 rounded-full w-full mt-4">
                Book
              </button>
            </div>
          </div>
        );
      })}

      {showModal && (
        <ConnectingFlightsModal
          selectedJourney={selectedJourney}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
