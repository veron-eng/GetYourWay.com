import React from "react";
import { render, fireEvent } from "@testing-library/react";
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

  it("opens the modal when See Stops button is clicked", () => {
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
          departureAirport: "LAX",
          departureScheduledTime: "2023-08-15T20:55:00",
          duration: "PT2H25M",
        },
        {
          departureAirport: "LGW",
          departureScheduledTime: "2023-08-19T18:30:00",
          arrivalAirport: "FCO",
          arrivalScheduledTime: "2023-08-16T00:20:00",
          duration: "PT3H",
        },
        {
          arrivalAirport: "FCO",
          arrivalScheduledTime: "2023-08-16T00:20:00",
          duration: "PT2H45M",
        },
      ],
      handleStopsClick: jest.fn(),
    };

    const { getByRole, getAllByText } = render(<Journey {...mockProps} />);
    // Get all "See Stops" buttons
    const seeStopsButtons = getAllByText(/See Stops/i);

    // Fire a click event on the first button
    fireEvent.click(seeStopsButtons[0]);

    expect(mockProps.handleStopsClick).toHaveBeenCalled();
  });

  it("displays the See Stops button only when there are no connecting flights", () => {
    const mockData = [
      {
        departureAirport: "LHR",
        departureScheduledTime: "2023-08-17T20:55:00",
        arrivalAirport: "SYD",
        arrivalScheduledTime: "2023-08-19T05:10:00",
        duration: "PT23H15M",
        flightNumber: "QF2",
      },
      {
        departureAirport: "SYD",
        departureScheduledTime: "2023-08-23T15:10:00",
        arrivalAirport: "LHR",
        arrivalScheduledTime: "2023-08-24T06:55:00",
        duration: "PT24H45M",
        flightNumber: "QF1",
      },
    ];

    const { getByText } = render(
      <Journey
        startJourney={mockData[0]}
        endJourney={mockData[1]}
        showStops={true}
        stopsCount={0}
        connections={[]}
        handleStopsClick={jest.fn()} // Mocked click handler
      />
    );

    // Check if the "See Stops" button is in the document with "See Stops (0)"
    const seeStopsButton = getByText(/See Stops \(0\)/i);
    expect(seeStopsButton).toBeInTheDocument();
  });
});
