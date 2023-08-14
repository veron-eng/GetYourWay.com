import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Journey from "@/app/results/_components/_ListViewComponents/Journey.tsx";

describe.skip("<Journey />", () => {
  it("displays the departure and arrival airport", () => {
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

    it("displays the departure and arrival airport for both start and end journeys", () => {
      const { getByText } = render(<Journey {...mockProps} />);

      expect(getByText("LGW")).toBeInTheDocument();
      expect(getByText("FCO")).toBeInTheDocument();
    });

    // it("displays the correct summed duration", () => {
    //   const { getByText } = render(<Journey {...mockProps} />);
    //   // 2h 25m + 2h 45m + 3h = 8h 10m
    //   expect(getByText("8h 10m")).toBeInTheDocument();
    // });

    // it('handles "See Stops" button click', () => {
    //   const { getByText } = render(<Journey {...mockProps} />);
    //   const button = getByText(/See Stops/);
    //   fireEvent.click(button);
    //   expect(mockProps.handleStopsClick).toHaveBeenCalled();
    // });

    // Add more test scenarios as needed!
  });
});
