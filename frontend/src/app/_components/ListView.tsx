"use client";
import React from "react";
import { useEffect, useState } from "react";

export default function ListView({ flightsData }: { flightsData: any }) {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    if (flightsData) {
      setData(flightsData);
    }
  }, [flightsData]);

  if (data.length === 0) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        {data.flights.map((flight: any, flightIndex: number) => (
          <div key={flightIndex}>
            {" "}
            <h2>Flight {flightIndex + 1}</h2> <p>Price: {flight.price}</p>{" "}
            {flight.journeys.map((journey: any, journeyIndex: number) => (
              <div key={journeyIndex}>
                {" "}
                <h3>Journey {journeyIndex + 1}</h3>{" "}
                <p>Departure Airport: {journey.departureAirport}</p>{" "}
                <p>Departure Time: {journey.departureScheduledTime}</p>{" "}
                <p>Arrival Airport: {journey.arrivalAirport}</p>{" "}
                <p>Arrival Time: {journey.arrivalScheduledTime}</p>{" "}
                <p>Duration: {journey.duration}</p>{" "}
                <p>Flight Number: {journey.flightNumber}</p>{" "}
              </div>
            ))}{" "}
          </div>
        ))}{" "}
      </div>
    </>
  );
}
