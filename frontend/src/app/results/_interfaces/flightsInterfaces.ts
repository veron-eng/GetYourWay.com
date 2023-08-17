export interface Journey {
  departureAirport: string;
  departureScheduledTime: string;
  arrivalAirport: string;
  arrivalScheduledTime: string;
  duration: string;
  flightNumber: string;

}

export interface Flight {
  journeys: Journey[];
  price: string;
}

export interface WeatherData {
  avgHumidity: string;
  avgTemperature: string;
  icon: string;
  maxTemperature: string;
  maxWind: string;
  minTemperature: string;
}

export interface FlightsData {
  destinationWeather: WeatherData;
  flights: Flight[];
}

export interface FlightJourneyProps {
  startJourney: Journey;
  endJourney: Journey;
  showStops: boolean;
  stopsCount?: number;
  connections?: Journey[];
  handleStopsClick: (journeys: Journey[]) => void;
}