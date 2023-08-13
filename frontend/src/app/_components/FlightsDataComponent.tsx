import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface Flight {
  flightNumber: string;
  airline: string;
  departureAirport: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  flightDuration: string;
}

interface FlightPeriod {
  outboundFlight: Flight;
  returnFlight: Flight;
  roundTripPrice: string;
}

interface FlightData {
  morning: FlightPeriod;
  afternoon: FlightPeriod;
  evening: FlightPeriod;
  night: FlightPeriod;
}

interface FlightCardProps {
    period: string;
    data?: FlightPeriod; // data can be optional
    isLoading: boolean; // new isLoading prop
  }
interface LoadingFlightData {
    morning?: FlightPeriod;
    afternoon?: FlightPeriod;
    evening?: FlightPeriod;
    night?: FlightPeriod;
  }

  interface FlightsDisplayProps {
    flightsData:   FlightData | LoadingFlightData | null;
    isLoading: boolean;
  }

  const FlightCard: React.FC<FlightCardProps> = ({ period, data, isLoading }) => (
    <div className={`${isLoading ? "animate-pulse" : ""} bg-white rounded-lg shadow p-6 mt-6`} style={{animationDuration:"0.5s"}}>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {isLoading ? <Skeleton width={100} /> : period}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-600">
            {isLoading ? <Skeleton width={150} /> : "Outbound Flight"}
          </h3>
          <p>{isLoading ? <Skeleton  /> : `${data?.outboundFlight.airline} (${data?.outboundFlight.flightNumber})`}</p>
          <p>{isLoading ? <Skeleton /> : `Departure: ${data?.outboundFlight.departureAirport} at ${data?.outboundFlight.departureTime}`}</p>
          <p>{isLoading ? <Skeleton /> : `Arrival: ${data?.outboundFlight.arrivalAirport} at ${data?.outboundFlight.arrivalTime}`}</p>
          <p>{isLoading ? <Skeleton /> : `Duration: ${data?.outboundFlight.flightDuration}`}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-600">
            {isLoading ? <Skeleton width={150} /> : "Return Flight"}
          </h3>
          <p>{isLoading ? <Skeleton /> : `${data?.returnFlight.airline} (${data?.returnFlight.flightNumber})`}</p>
          <p>{isLoading ? <Skeleton /> : `Departure: ${data?.returnFlight.departureAirport} at ${data?.returnFlight.departureTime}`}</p>
          <p>{isLoading ? <Skeleton /> : `Arrival: ${data?.returnFlight.arrivalAirport} at ${data?.returnFlight.arrivalTime}`}</p>
          <p>{isLoading ? <Skeleton /> : `Duration: ${data?.returnFlight.flightDuration}`}</p>
        </div>
      </div>
      
      <p className="text-lg font-semibold text-gray-700 mt-4">
        {isLoading ? <Skeleton width={100} /> : `Price: ${data?.roundTripPrice}`}
      </p>
    </div>
  );
  
  
  

const FlightsDisplay: React.FC<FlightsDisplayProps> = ({ flightsData, isLoading }) => (
    <div className="p-4">
      <FlightCard period="Morning" data={flightsData?.morning} isLoading={isLoading} />
      <FlightCard period="Afternoon" data={flightsData?.afternoon} isLoading={isLoading} />
      <FlightCard period="Evening" data={flightsData?.evening} isLoading={isLoading} />
      <FlightCard period="Night" data={flightsData?.night} isLoading={isLoading} />
    </div>
  );
  
  export default FlightsDisplay;
  
  
  
  
  
  
