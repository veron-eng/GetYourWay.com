import { FlightJourneyProps } from "@/app/results/_interfaces/flightsInterfaces";
import { formatTime } from "@/utils/formatTime";

export default function Journey({
  startJourney,
  endJourney,
  showStops,
  stopsCount,
  connections,
  handleStopsClick,
}: FlightJourneyProps) {
  const sumDurations = (durations: string[]): string => {
    let totalMinutes = 0;

    durations.forEach((duration) => {
      const hoursMatch = duration.match(/(\d+)H/);
      const minutesMatch = duration.match(/(\d+)M/);

      const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
      const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

      totalMinutes += hours * 60 + minutes;
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return `${totalHours}h ${remainingMinutes}m`;
  };
  return (
    <div className="flex justify-evenly items-center space-x-4 sm:space-x-2">
      <div>
        <div className="text-lg sm:text-sm">
          {startJourney.departureAirport}
        </div>
        <div className="text-2xl sm:text-lg text-gray-500">
          {formatTime(startJourney.departureScheduledTime)}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-600">
          {sumDurations(
            connections
              ? [
                  startJourney.duration,
                  ...connections.map((j) => j.duration),
                  endJourney.duration,
                ]
              : [startJourney.duration, endJourney.duration]
          )}
        </span>

        <span className="text-3xl sm:text-2xl">✈</span>
        {showStops && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleStopsClick(
                connections
                  ? [startJourney, ...connections, endJourney]
                  : [startJourney, endJourney]
              );
            }}
            className="text-blue-500 text-xs text-center"
          >
            See Stops ({stopsCount})
          </button>
        )}
      </div>
      <div>
        <div className="text-lg sm:text-sm">{endJourney.arrivalAirport}</div>
        <div className="text-2xl sm:text-lg text-gray-500">
          {formatTime(endJourney.arrivalScheduledTime)}
        </div>
      </div>
    </div>
  );
}
