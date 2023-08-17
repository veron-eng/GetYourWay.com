"use client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/app/_context/AuthProvider";
import { db } from "@/firebaseAuth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

function Page() {
  const { user, isSignedIn } = useContext(AuthContext);

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn === true) {
      if (user) {
        const fetchBookings = async () => {
          try {
            const docRef = doc(db, "bookings", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setBookings(docSnap.data().bookings || []);
            } else {
              console.log("No such document!");
            }
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };

        fetchBookings();
      } else {
        setBookings([]);
        setLoading(false);
        setError(null);
      }
    } else if (isSignedIn === false) {
      setBookings([]);
      setLoading(false);
      setError(null);
    } else {
      // isSignedIn === undefined , i.e. we are still determining if the user is signed in or not
      setLoading(true);
    }
  }, [user, isSignedIn]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-4">Error: {error}</div>;
  }

  if (bookings.length === 0 && isSignedIn === false) {
    return (
      <div className="text-center mt-4 font-bold">
        You must be signed in to view your bookings.
      </div>
    );
  }

  if (bookings.length === 0 && isSignedIn === true) {
    return (
      <div className="text-center mt-4 font-bold">
        You have no bookings yet. Head to{" "}
        <Link className="text-indigo-500" href="/">
          home page
        </Link>{" "}
        to book your flights.
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Your Flight Bookings</h2>
      <div className="flex flex-col gap-y-10">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="p-8 bg-white w-[50%] min-w-[400px] sm:min-w-[290px] mx-auto shadow-md rounded-xl"
          >
            <div className="mb-4">
              <span className="font-bold">From:</span>{" "}
              {booking.departureAirport}
            </div>

            <div className="mb-4">
              <span className="font-bold">To:</span> {booking.arrivalAirport}
            </div>

            <div className="mb-4">
              <span className="font-bold">Departure Date:</span>{" "}
              {booking.departureDate}
            </div>

            <div className="mb-4">
              <span className="font-bold">Arrival Date:</span>{" "}
              {booking.arrivalDate}
            </div>

            <div className="mb-4">
              <span className="font-bold">Departure Time:</span>{" "}
              {booking.departureTime}
            </div>

            <div className="mb-4">
              <span className="font-bold">Arrival Time:</span>{" "}
              {booking.arrivalTime}
            </div>

            <div className="mb-4">
              <span className="font-bold">Departing Flight Number:</span>{" "}
              {booking.departingFlightNumber}
            </div>

            <div className="mb-4">
              <span className="font-bold">Returning Flight Number:</span>{" "}
              {booking.returningFlightNumber}
            </div>

            <div className="mb-4">
              <span className="font-bold">Price:</span> £{booking.price}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
