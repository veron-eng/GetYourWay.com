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

const provider = new GoogleAuthProvider();

export default function Search() {
  const { isSignedIn } = useContext(AuthContext);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [flightsData, setFlightsData] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [shows, setShows] = useState([]); // Initial state is an empty array


  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
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



    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center py-28">
          <h1 className="text-5xl text-center customSm-text-4xl sm:text-3xl font-extrabold">
            <span className="whitespace-nowrap text-darkBlue">
              Plan your next <br />
              <span className="sky-text-gradient">adventure</span>
            </span>
          </h1>
          <p className="text-center text-lg sm:text-base text-gray-700 font-semibold">
            Search destinations, check the weather, view travel information, and
            more.
          </p>

          <div className="flex  items-center justify-center w-[700px] h-[150px] sky-button-gradient">
            <div className="flex flex-col items-center justify-center bg-white w-[690px] h-[140px]">
              <div className="flex flex-col items-end gap-y-1">
                <div className="flex gap-x-3">
                  <input
                    placeholder="Country, city or airport"
                    className="border px-2 h-12 rounded-l-lg"
                    type="text"
                    value={fromInput}
                    onChange={(e) => setFromInput(e.target.value)}
                  />

                  <input
                    placeholder="Country, city or airport"
                    className="border px-2 h-12 rounded-r-lg"
                    type="text"
                    value={toInput}
                    onChange={(e) => setToInput(e.target.value)}
                  />

                </div>

                <button
                  onClick={() => searchFlights(fromInput, toInput)}
                  className="bg-skyBlue text-offWhite rounded-md px-4 py-1 font-bold"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Flight data */}
        {/* {flightsData && <FlightsDisplay flightsData={flightsData} />} */}
        {showSkeleton || flightsData ? (
          <>
          <FlightsDisplay flightsData={flightsData} isLoading={showSkeleton} />
          <ShowRecommendations shows={shows}  />
          </>
        ) : null}
      </>
    );
  }
}
