"use client";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../_components/Navbar";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebaseAuth";
import { AuthContext } from "../_context/AuthProvider";
import axios from "axios";
import FlightsDisplay from "./_components/FlightsDataComponent";
import ShowRecommendations from "./_components/TVRecommendations";
import ViewToggle from "./_components/ViewToggle";
import DateSelector from "./_components/DateSelector";
import "./styles.css";

const provider = new GoogleAuthProvider();

export default function Search() {
  const { isSignedIn } = useContext(AuthContext);
  const [flightsData, setFlightsData] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [shows, setShows] = useState([]);
  const [showReturnSelector, setShowReturnSelector] = useState(false);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  const [isReturnFlight, setIsReturnFlight] = useState();
  const [fromDestination, setFromDestination] = useState("");
  const [ToDestination, setToDestination] = useState("");
  const [Passengers, setPassengers] = useState("1");

  const [fromDateValue, setFromDateValue] = useState("");
  const [toDateValue, setToDateValue] = useState("");

  function handlePassengerChange(event: any) {
    setPassengers(event.target.value);
  }

  const handleFromChange = (event: any) => {
    setFromDestination(event.target.value);
  };

  const handleFromDateChange = (date: string) => {
    setFromDateValue(date);
  };

  const handleToChange = (event: any) => {
    setToDestination(event.target.value);
  };

  const handleToDateChange = (date: string) => {
    if (showReturnSelector) {
      setToDateValue(date);
    } else {
      setToDateValue("0");
    }
  };

  const handleCheckboxChange = (event: any) => {
    setShowReturnSelector(event.target.checked);
    if (!event.target.checked) {
      setToDateValue("");
    }
  };

  const printData = () => {
    console.log("From location: " + fromDestination);
    console.log("To location: " + ToDestination);
    console.log("From date: " + fromDateValue);
    console.log("To date: " + toDateValue);
    console.log("Number of passengers: " + Passengers);
  };

  // Checking whether user is signed in or not
  if (isSignedIn == undefined) {
    return <>""</>;

    // User is not signed in
  } else if (isSignedIn == false) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col gap-y-14 items-center py-28">
          {/* Heading */}
          <h1 className="text-5xl text-center customSm-text-4xl sm:text-3xl font-extrabold">
            <span className="whitespace-nowrap text-darkBlue">
              Find your next <br />
              <span className="sky-text-gradient">adventure</span>
            </span>
          </h1>
          {/* Description */}
          <p className="text-center text-lg sm:text-base text-gray-700 font-semibold">
            With integrated maps, weather updates, and comprehensive travel
            information, we make travel planning a breeze.
          </p>

          {/* Call to action */}
          <div className="flex flex-col gap-y-5 font-bold">
            <button className="relative bg-white rounded-full w-72 py-3">
              <Image
                src="/apple-logo.svg"
                className="absolute left-8"
                width={18}
                height={18}
                alt="Apple logo"
              />
              <span>Sign in with Apple</span>
            </button>
            <button className="relative bg-[#1877F2] text-offWhite rounded-full w-72 py-3">
              <Image
                src="/fb-logo.svg"
                className="absolute top-[13px] left-8"
                width={18}
                height={18}
                alt="Apple logo"
              />
              <span>Sign in with Facebook</span>{" "}
            </button>
            <button
              onClick={signInWithGoogle}
              className="relative bg-[#DB4437F4] text-offWhite rounded-full w-72 py-3"
            >
              <Image
                src="/google-logo.svg"
                className="absolute left-8 top-[16px]"
                width={60}
                height={60}
                alt="Apple logo"
              />
              <span>Sign in with Google</span>{" "}
            </button>
          </div>
        </div>
      </>
    );
  } // User is signed in
  else {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center pt-5">
          <h1 className="text-5xl text-center customSm-text-4xl sm:text-3xl font-extrabold">
            <span className="whitespace-nowrap text-white">
              Plan your next <br />
              <span className="sky-text-gradient">adventure</span>
            </span>
          </h1>
          <p className="text-center text-lg sm:text-base text-gray-700 font-semibold">
            Search destinations, check the weather, view travel information, and
            more.
          </p>
          <div className="flex items-center justify-center w-full h-[150px] sky-button-gradient barContainer">
            <div className="flex flex-row gap-x-5 gap-y-5 items-center justify-center bar">
              <div className="flex items-center flex-row gap-x-2">
                <label className="text-center">
                  Where are your travelling from?{" "}
                </label>
                <input
                  placeholder="Country, city or airport"
                  className="border px-2 h-12 rounded-l-lg"
                  type="text"
                  value={fromDestination}
                  onChange={handleFromChange}
                />
              </div>
              <div className="flex items-center flex-row gap-x-2">
                <label>Where would you like to go? </label>
                <input
                  placeholder="Country, city or airport"
                  className="border px-2 h-12 rounded-r-lg"
                  type="text"
                  value={ToDestination}
                  onChange={handleToChange}
                />
              </div>
              <div className="flex items-center flex-row gap-x-2">
                <label htmlFor="dropdown">How many passengers?</label>
                <select
                  id="dropdown"
                  value={Passengers}
                  onChange={handlePassengerChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div className="flex items-center flex-row gap-x-2">
                <label>Return flight?</label>
                <input
                  type="checkbox"
                  checked={showReturnSelector}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <label>Leave date: </label>
                  <div className="flex-1 border mx-2 rounded">
                    <DateSelector onDateSelect={handleFromDateChange} />
                  </div>
                </div>
                {showReturnSelector && (
                  <div className="flex justify-center items-center">
                    <label>Return date: </label>
                    <div className="flex-1 border mx-2 rounded">
                      <DateSelector onDateSelect={handleToDateChange} />
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={printData}
                className="bg-skyBlue text-offWhite rounded-md px-4 py-1 font-bold flex-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="text-center back">
          <ViewToggle />
        </div>
      </>
    );
  }
}
