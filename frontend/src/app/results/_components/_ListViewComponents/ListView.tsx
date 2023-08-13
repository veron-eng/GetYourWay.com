import React, { useState } from "react";
import FilterTimingsSliders from "./FlightTimingsFilter";
import { ScaleLoader } from "react-spinners";
import FlightCardSkeletonLoader from "./FlightCardSkeletonLoader";
import FlightsList from "./FlightsList";
import { FlightsData } from "@/app/results/_interfaces/flightsInterfaces";

interface ListViewProps {
  flightsData: FlightsData;
}

export default function ListView({ flightsData }: ListViewProps) {
  const [outboundTimesRange, setOutboundTimesRange] = useState<number[]>([
    0, 24,
  ]);
  const [returnTimesRange, setReturnTimesRange] = useState<number[]>([0, 24]);
  const [loading, setLoading] = useState(false);

  // While flights are loading, show a skeleton loader
  if (!flightsData.flights) {
    return <FlightCardSkeletonLoader />;
  }

  // Flights have loaded
  else
    return (
      <>
        {/* Display the flights based on the timings user selects via the slider */}
        <FilterTimingsSliders
          outboundTime={outboundTimesRange}
          returnTime={returnTimesRange}
          setOutboundTime={setOutboundTimesRange}
          setReturnTime={setReturnTimesRange}
          setLoading={setLoading}
        />

        <div className="flex flex-col space-y-6 mb-24 relative">
          {/* If user adjusts flight timings slider, show loader while the flights options rerender */}
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex justify-center items-center z-10">
              <ScaleLoader color="#000FF5" />
            </div>
          )}

          {/* List of journey options as flight cards */}
          <FlightsList
            flightsData={flightsData}
            outboundTimesFilterRange={outboundTimesRange}
            returnTimesFilterRange={returnTimesRange}
          />
        </div>
      </>
    );
}
