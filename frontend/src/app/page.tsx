"use client";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import TextInput from "./_components/TextInput";
import DateInput from "./_components/DateInput";
import DynamicTitle from "./_components/DynamicTitle";
import Dropdown from "./_components/Dropdown";

export default function Search({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) {
  const { from, to } = searchParams;
      
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState("1");

  const router = useRouter();

  useEffect(()=> {
    if (from !== undefined){
      setFromAirport(from)
    }
  
    if (to !== undefined){
      setToAirport(to)
    }

    return ()=>{
      setToAirport("")
      setFromAirport("")
    }

  }, [from, to])

  const getAirportCode = (airport: string) => {
    return airport.substring(airport.length - 4, airport.length - 1);
  }

  const formatDate = (date: any) => {
    if (date == null) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    const fromAirportCode = getAirportCode(fromAirport);
    const toAirportCode = getAirportCode(toAirport);
    const fromDateFormatted = formatDate(fromDate);
    const toDateFormatted = formatDate(toDate);

    router.push(
      "/results?from=" +
        fromAirportCode +
        "&to=" +
        toAirportCode +
        "&leave=" +
        fromDateFormatted +
        "&ret=" +
        toDateFormatted +
        "&passengers=" +
        passengers
    );
  };

  const shapeClass: { [key: string]: string } = {
    "left": "border px-2 h-16 md:rounded-xl w-full rounded-l-xl",
    "centre": "border px-2 h-16 md:rounded-xl w-full",
    "right": "border px-2 h-16 md:rounded-xl w-full rounded-r-xl"
  }


  return (
    <div className="flex flex-col gap-y-8 items-center justify-center h-[calc(100vh-128px)] relative">
      <div className="w-screen absolute top-0 sky-button-gradient h-[5px] z-40"></div>
      <div className="w-screen h-[calc(100vh-128px)] absolute background-image "></div>
      <section className="flex flex-col sm:scale-75 py-10 items-center justify-center bg-[rgba(44,46,93,0.56)] shadow-2xl z-30 w-full px-6 rounded-2xl  md:py-6 gap-y-7">
        <DynamicTitle />
        <div className="flex-col flex gap-y-3 items-end w-full">
          <div className="flex md:flex-col md:gap-y-3 w-full gap-x-0.5">
            {/* From Airport Input */}
            <TextInput
              forId="fromAirport"
              label="From"
              placeholder="Country, city or airport"
              value={fromAirport}
              setValue={setFromAirport}
              relativePosition={shapeClass["left"]}
            />

            {/* To Airport Input */}
            <TextInput
              forId="toAirport"
              label="To"
              placeholder="Country, city or airport"
              value={toAirport}
              setValue={setToAirport}
              relativePosition={shapeClass["centre"]}
            />

            {/* Depart Date Picker */}
            <DateInput
              label="Depart"
              forId="departDate"
              placeholder="Depart date"
              value={fromDate}
              setValue={setFromDate}
              relativePosition={shapeClass["centre"]}
            />

            {/* Return Date Picker */}
            <DateInput
              label="Return"
              forId="returnDate"
              placeholder="Return date"
              value={toDate}
              setValue={setToDate}
              relativePosition={shapeClass["centre"]}
            />

            <Dropdown
              label="Passengers"
              forId="passengers"
              value={passengers}
              setValue={setPassengers}
              relativePosition={shapeClass["right"]}
            />
          </div>

          <button
            id='searchButton'
            onClick={handleSubmit}
            className="bg-skyBlue text-offWhite rounded-md px-4 py-3 font-bold"
          >
            Search Flights
          </button>
        </div>
      </section>
    </div>
  );
}
