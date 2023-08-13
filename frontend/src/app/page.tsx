"use client";
import { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
//Router
import { useRouter } from "next/navigation";

export default function Search() {
  const [flightsData, setFlightsData] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [shows, setShows] = useState([]); // Initial state is an empty array
  const [showReturnSelector, setShowReturnSelector] = useState(false);
  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    leaveDate: "",
    returnDate: "",
  });
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("na");
  const [fromDateValue, setFromDateValue] = useState<Date | null>(null);
  const [toDateValue, setToDateValue] = useState<Date | null>(null);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [toDateFormatted, setToDateFormatted] = useState("");
  const [fromDateFormatted, setFromDateFormatted] = useState("");
  const [suggestedFromAirports, setSuggestedFromAirports] = useState([]);
  const [suggestedToAirports, setSuggestedToAirports] = useState([]);

  const [selectedDepartDate, setSelectedDepartDate] = useState<Date | null>(
    null
  );
  const [selectedReturnDate, setSelectedReturnDate] = useState<Date | null>(
    null
  );
  const prevFromValue = useRef("");
  const prevToValue = useRef("");
  const fromInputRef = useRef<HTMLInputElement>(null);
  const fromSuggestionRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const toSuggestionRef = useRef<HTMLDivElement>(null);

  // navigation hook
  const router = useRouter();

  const handleFromChange = async (event: any) => {
    try {
      const value = event.target.value;
      setFromValue(value);

      if (!value.trim()) {
        setSuggestedFromAirports([]);
        return;
      }

      // Check if backspace was pressed
      if (value.length < prevFromValue.current.length) {
        prevFromValue.current = value;
        return; // Exit the function early if backspace was pressed
      }

      if (value.length > 2) {
        const res = await fetch(
          `https://airlabs.co/api/v9/suggest?q=${value}&api_key=${process.env.NEXT_PUBLIC_AIRLABS_API_KEY}`
        );
        const data = await res.json();
        if (data && data.response && data.response.airports) {
          setSuggestedFromAirports(data.response.airports);
        }
      } else {
        setSuggestedFromAirports([]); // Clear suggestions for short input values
      }

      prevFromValue.current = value;
    } catch (error) {
      console.error("Error handling the change:", error);
      // Handle the error accordingly, e.g., by setting an error state, showing an alert, etc.
    }
  };

  const handleFromDateChange = (date: Date | null) => {
    setFromDateValue(date);
  };

  const handleToChange = async (event: any) => {
    const value = event.target.value;
    setToValue(value);

    // Clear the autosuggestions if the input is empty
    if (!value.trim()) {
      setSuggestedToAirports([]);
      return;
    }

    // Check if the backspace was pressed by comparing lengths
    if (value.length < prevToValue.current.length) {
      prevToValue.current = value; // Update the ref to the new value
      return; // Exit without making an API call
    }

    if (value.length > 2) {
      const res = await fetch(
        `https://airlabs.co/api/v9/suggest?q=${value}&api_key=${process.env.NEXT_PUBLIC_AIRLABS_API_KEY}`
      );
      const data = await res.json();
      if (data && data.response && data.response.airports) {
        setSuggestedToAirports(data.response.airports);
      }
    } else {
      setSuggestedToAirports([]); // Clear suggestions if less than 3 characters
    }

    prevToValue.current = value; // Update the ref to the new value for the next check
  };

  const handleToDateChange = (date: Date | null) => {
    if (showReturnSelector) {
      setToDateValue(date);
    } else {
      setToDate("");
    }
  };

  const handleformSubmit = (e: any) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleCheckboxChange = (event: any) => {
    setShowReturnSelector(event.target.checked);
    if (!event.target.checked) {
      setToDate("");
    }
  };

  const printData = () => {
    const fromAirportCode = fromValue.substring(
      fromValue.length - 4,
      fromValue.length - 1
    );
    const toAirportCode = toValue.substring(
      toValue.length - 4,
      toValue.length - 1
    );

    router.push(
      "/results?from=" +
        fromAirportCode +
        "&to=" +
        toAirportCode +
        "&leave=" +
        fromDateFormatted +
        "&ret=" +
        toDateFormatted
    );
  };

  const searchFlights = async (fromInput: string, toInput: string) => {
    try {
      setShowSkeleton(true); // Set showSkeleton to true when the search starts

      const res = await axios.post("http://localhost:8080/search", {
        from: fromInput,
        to: toInput,
      });
      setFlightsData(res.data); // Store the flights data in the state.
      setShowSkeleton(false);
      console.log(typeof res.data);
      console.log(res.data);
      getEPGRecommendations(toInput);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const getEPGRecommendations = async (toInput: string) => {
    try {
      const res = await axios.post("http://localhost:8080/EPG", {
        to: toInput,
      });

      console.log(res.data);
      setShows(res.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDepartDate(date);
    handleFromDateChange(date);
  };

  const formatDate = (date: any) => {
    if (date == null) {
      return String(date);
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };

  // Close autosuggestions when the user clicks outside the input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromInputRef.current &&
        !fromInputRef.current.contains(event.target as Node) &&
        fromSuggestionRef.current &&
        !fromSuggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestedFromAirports([]);
      }

      if (
        toInputRef.current &&
        !toInputRef.current.contains(event.target as Node) &&
        toSuggestionRef.current &&
        !toSuggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestedToAirports([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const words = ["adventure", "journey", "expedition", "quest", "voyage"];

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 8000); // Change word every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center h-[calc(100vh-128px)] relative">
      <div className="w-screen absolute top-0 sky-button-gradient h-[5px] z-40"></div>
      <div className="w-screen h-[calc(100vh-128px)] absolute background-image "></div>
      <section className="flex flex-col items-center justify-center bg-[rgba(44,46,93,0.56)] shadow-2xl z-30 w-full px-6 rounded-2xl min-h-[360px] md:py-6 gap-y-7">
        <h1 className="relative sm:text-4xl md:text-5xl  text-7xl text-glow  text-white font-bold w-full tracking-wide">
          Find your next{" "}
          <span className="bg-gradient-text bg-clip-text text-transparent px-1 rounded-lg typewriter-text">
            {words[wordIndex]}
          </span>
        </h1>
        <div className="flex-col flex gap-y-3 items-end w-full">
          <div className="flex md:flex-col md:gap-y-3 w-full gap-x-0.5">
            {/* From Airport Input */}
            <div className="relative flex-1 flex flex-col">
              <label
                htmlFor="fromAirport"
                className="mb-1 text-white font-semibold"
              >
                From
              </label>
              <input
                id="fromAirport"
                placeholder="Country, city or airport"
                className="border px-2 h-16 rounded-l-xl md:rounded-xl w-full"
                type="text"
                value={fromValue}
                onChange={handleFromChange}
                ref={fromInputRef}
              />
              <div
                ref={fromSuggestionRef}
                className="absolute top-full w-full bg-white rounded shadow-lg divide-y z-10"
              >
                {suggestedFromAirports.length > 0 && (
                  <div className="absolute mt-2 w-full bg-white border rounded shadow-lg divide-y z-10">
                    {suggestedFromAirports
                      .filter((airport: any) => airport.iata_code)
                      .map((airport: any, index) => (
                        <div
                          key={index}
                          className="cursor-pointer hover:bg-gray-200 p-2"
                          onClick={() => {
                            setFromValue(
                              `${airport.name} (${airport.iata_code})`
                            );
                            setSuggestedFromAirports([]);
                          }}
                        >
                          {airport.name} ({airport.iata_code})
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* To Airport Input */}
            <div className="relative flex-1 flex flex-col">
              <label
                htmlFor="toAirport"
                className="mb-1 text-white font-semibold"
              >
                To
              </label>
              <input
                ref={toInputRef}
                id="toAirport"
                placeholder="Country, city or airport"
                className="border px-2 h-16 w-full md:rounded-xl"
                type="text"
                value={toValue}
                onChange={handleToChange}
              />
              <div
                ref={toSuggestionRef}
                className="absolute top-full w-full bg-white rounded shadow-lg divide-y z-10"
              >
                {suggestedToAirports.length > 0 && (
                  <div className="absolute mt-2 w-full bg-white border rounded shadow-lg divide-y z-10">
                    {suggestedToAirports
                      .filter((airport: any) => airport.iata_code)
                      .map((airport: any, index) => (
                        <div
                          key={index}
                          className="cursor-pointer hover:bg-gray-200 p-2"
                          onClick={() => {
                            setToValue(
                              `${airport.name} (${airport.iata_code})`
                            );
                            setSuggestedToAirports([]);
                          }}
                        >
                          {airport.name} ({airport.iata_code})
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Depart Date Picker */}
            <div className="flex flex-col justify-between">
              <label
                htmlFor="departDate"
                className="mb-1 text-white font-semibold"
              >
                Depart
              </label>
              <DatePicker
                id="departDate"
                selected={selectedDepartDate}
                className="border px-2 h-16 w-full md:rounded-xl"
                onChange={(date) => {
                  setSelectedDepartDate(date);
                  handleFromDateChange(date);
                  setFromDateFormatted(formatDate(date));
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Depart date"
                isClearable
              />
            </div>

            {/* Return Date Picker */}
            <div className="flex flex-col justify-between">
              <label
                htmlFor="returnDate"
                className="mb-1 text-white font-semibold"
              >
                Return
              </label>
              <DatePicker
                id="returnDate"
                selected={selectedReturnDate}
                className="border px-2 rounded-r-xl md:rounded-xl h-16 w-full"
                onChange={(date) => {
                  setSelectedReturnDate(date);
                  handleToDateChange(date);
                  setToDateFormatted(formatDate(date));
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Return date"
                isClearable
              />
            </div>
          </div>

          <button
            onClick={printData}
            className="bg-skyBlue text-offWhite rounded-md px-4 py-3 font-bold"
          >
            Search Flights
          </button>
        </div>
      </section>
    </div>
  );
}
