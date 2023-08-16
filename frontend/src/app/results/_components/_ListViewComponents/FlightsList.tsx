import { useState, useContext, useEffect } from "react";
import {
  Journey,
  FlightsData,
} from "@/app/results/_interfaces/flightsInterfaces";
import JourneyInfo from "./Journey";
import ConnectingFlightsModal from "./ConnectingFlightsModal";
import LoginModal from "@/app/_components/LoginModal";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "@/app/_context/AuthProvider";
import { formatTime } from "@/utils/formatTime";

interface FlightsListProps {
  flightsData: FlightsData;
  outboundTimesFilterRange: number[];
  returnTimesFilterRange: number[];
}

export default function FlightsList({
  flightsData,
  outboundTimesFilterRange,
  returnTimesFilterRange,
}: FlightsListProps) {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<Journey[]>([]);
  const { isSignedIn, user } = useContext(AuthContext);

  const triggerStripe = async (body: any) => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    try {
      const result = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = (await result.json()) as Stripe.Checkout.Session;
      const sessionId = data.id;
      stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const extractDate = (date: string) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // This useEffect will trigger the booking process if a user has logged in
  // and they previously attempted to book.
  useEffect(() => {
    const attemptedToBook = localStorage.getItem("attemptedToBook");
    const bookingBody = localStorage.getItem("bookingBody");
    if (user && attemptedToBook && bookingBody) {
      let body = JSON.parse(bookingBody);
      body = { ...body, userId: user.uid, userEmail: user.email };
      triggerStripe(body);
      localStorage.removeItem("attemptedToBook");
      localStorage.removeItem("bookingBody");
    }
  }, [user]);

  const handleBooking = async () => {
    if (isSignedIn && user) {
      // Your existing booking logic
    } else {
      // Set the flag indicating the user attempted to book
      setShowLoginModal(true);
    }
  };

  const handleStopsClick = (journeys: Journey[]) => {
    setSelectedJourney(journeys);
    setShowModal(true);
  };

  const isWithinTimeRange = (time: string, [startHour, endHour]: number[]) => {
    const date = new Date(time);
    const hours = date.getHours();
    return hours >= startHour && hours <= endHour;
  };

  const filteredFlights = flightsData?.flights?.filter(
    (flight) =>
      isWithinTimeRange(
        flight.journeys[0].departureScheduledTime,
        outboundTimesFilterRange
      ) &&
      (flight.journeys.length % 2 === 0
        ? isWithinTimeRange(
            flight.journeys[flight.journeys.length / 2].departureScheduledTime,
            returnTimesFilterRange
          )
        : true)
  );

  if (filteredFlights && filteredFlights.length === 0) {
    return (
      <div className="text-xl text-center">
        No flights available for the selected timings.
      </div>
    );
  }

  return (
    <>
      {filteredFlights?.map((flight, idx) => {
        const outboundStops = Math.floor(flight.journeys.length / 2) - 1;
        const returnStops =
          flight.journeys.length - Math.floor(flight.journeys.length / 2) - 1;

        return (
          <div key={idx} className="rounded-lg py-4 flex bg-white shadow-xl">
            <div className="flex-1 space-y-4 px-3">
              {/* Departure journey */}
              <JourneyInfo
                startJourney={flight.journeys[0]}
                endJourney={
                  flight.journeys[Math.floor(flight.journeys.length / 2) - 1]
                }
                showStops={outboundStops > 0}
                stopsCount={outboundStops}
                connections={flight.journeys.slice(
                  1,
                  Math.floor(flight.journeys.length / 2) - 1
                )}
                handleStopsClick={handleStopsClick}
              />

              {/* Return journey */}
              {flight.journeys.length % 2 === 0 && (
                <JourneyInfo
                  startJourney={flight.journeys[flight.journeys.length / 2]}
                  endJourney={flight.journeys[flight.journeys.length - 1]}
                  showStops={returnStops > 0}
                  stopsCount={returnStops}
                  connections={flight.journeys.slice(
                    flight.journeys.length / 2 + 1,
                    flight.journeys.length - 1
                  )}
                  handleStopsClick={handleStopsClick}
                />
              )}
            </div>
            <div className="flex-3 border-l px-3 flex flex-col justify-evenly">
              <div className="text-2xl sm:text-lg font-bold">
                £{flight.price}
              </div>
              <button
                onClick={async () => {
                  let body = {
                    userId:user?.uid,
                    userEmail:user?.email,
                    price: flight.price,
                    departureAirport: flight.journeys[0].departureAirport,
                    arrivalAirport:
                      flight.journeys[flight.journeys.length / 2 - 1]
                        .arrivalAirport,
                    departureDate: extractDate(
                      flight.journeys[0].departureScheduledTime
                    ),
                    arrivalDate: extractDate(
                      flight.journeys[flight.journeys.length - 1]
                        .arrivalScheduledTime
                    ),
                    departureTime: formatTime(
                      flight.journeys[0].departureScheduledTime
                    ),
                    arrivalTime: formatTime(
                      flight.journeys[flight.journeys.length - 1]
                        .arrivalScheduledTime
                    ),
                    departingFlightNumber: flight.journeys[0].flightNumber,
                    returningFlightNumber:
                      flight.journeys[flight.journeys.length - 1].flightNumber,
                  };

                  if (isSignedIn && user) {
                    body = { ...body, userId: user.uid, userEmail: user.email };
                    triggerStripe(body);
                  } else {
                    localStorage.setItem("attemptedToBook", "true");
                    localStorage.setItem("bookingBody", JSON.stringify(body));
                    setShowLoginModal(true);
                  }
                }}
                className="bg-skyBlue text-white py-1 rounded-full w-full mt-4"
              >
                Book
              </button>
            </div>
          </div>
        );
      })}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {showModal && (
        <ConnectingFlightsModal
          selectedJourney={selectedJourney}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
