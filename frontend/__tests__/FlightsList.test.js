import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FlightsList from "@/app/results/_components/_ListViewComponents/FlightsList.tsx";

describe("<FlightsList />", () => {
  const mockFlightsData = {
    destinationWeather: {
      avgHumidity: "50%",
      avgTemperature: "25°C",
      icon: "sunny",
      maxTemperature: "28°C",
      maxWind: "15km/h",
      minTemperature: "20°C",
    },
    flights: [
      {
        journeys: [
          {
            departureAirport: "LHR",
            departureScheduledTime: "2023-08-16T14:35:00",
            arrivalAirport: "BCN",
            arrivalScheduledTime: "2023-08-16T17:40:00",
            duration: "PT2H5M",
          },
          {
            departureAirport: "BCN",
            departureScheduledTime: "2023-08-23T13:05:00",
            arrivalAirport: "LHR",
            arrivalScheduledTime: "2023-08-23T14:25:00",
            duration: "PT2H20M",
          },
        ],
        price: "$300",
      },
    ],
  };

  jest.mock("firebase/app", () => {
    return { initializeApp: jest.fn(), auth: jest.fn() };
  });

  it("renders without crashing", () => {
    render(
      <FlightsList
        flightsData={mockFlightsData}
        outboundTimesFilterRange={[0, 24]}
        returnTimesFilterRange={[0, 24]}
      />
    );
  });

  it("filters flights correctly based on time range", () => {
    render(
      <FlightsList
        flightsData={mockFlightsData}
        outboundTimesFilterRange={[10, 12]}
        returnTimesFilterRange={[20, 23]}
      />
    );
    setTimeout(() => {
      const noFlightsMessage = screen.getByText(
        "No flights available for the selected timings."
      );
      expect(noFlightsMessage.toBeInTheDocument());
    }, 1000);
  });

  it("renders JourneyInfo for each flight", async () => {
    render(
      <FlightsList
        flightsData={mockFlightsData}
        outboundTimesFilterRange={[0, 24]}
        returnTimesFilterRange={[0, 24]}
      />
    );

    const journeyInfoItems = await screen.findAllByTestId("flight-cards-test");
    expect(journeyInfoItems.length).toBe(2);
  });
});
