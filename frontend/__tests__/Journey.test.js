import React from "react";
import { render } from "@testing-library/react";
import Journey from "@/app/results/_components/_ListViewComponents/Journey.tsx";

describe("<Journey />", () => {
  it("displays the departure and arrival airport for both start and end journeys", () => {
    const mockProps = {
      startJourney: {
        departureAirport: "LAX",
        departureScheduledTime: "2023-08-15T20:55:00",
        duration: "PT2H25M",
      },
      endJourney: {
        arrivalAirport: "FCO",
        arrivalScheduledTime: "2023-08-16T00:20:00",
        duration: "PT2H45M",
      },
      showStops: true,
      stopsCount: 1,
      connections: [
        {
          departureAirport: "FCO",
          departureScheduledTime: "2023-08-19T18:30:00",
          arrivalAirport: "LGW",
          arrivalScheduledTime: "2023-08-19T20:15:00",
          duration: "PT3H",
        },
      ],
      handleStopsClick: jest.fn(),
    };
    
    const { getByText } = render(<Journey {...mockProps} />);

    expect(getByText("LAX")).toBeInTheDocument();
    expect(getByText("FCO")).toBeInTheDocument();
  });
});
