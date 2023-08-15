'use client'
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/app/_context/AuthProvider";
import { db } from "@/firebaseAuth";
import { doc, getDoc } from "firebase/firestore";

function Page() {
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(!user);  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchBooking = async () => {
        try {
          const docRef = doc(db, "bookings", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBooking(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchBooking();
    } 
  }, [user]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-4">Error: {error}</div>;
  }

  if (!booking) {
    return <div className="text-center mt-4">No booking found for this user.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">
        Your Flight Booking
      </h2>

      <div className="mb-4">
        <span className="font-bold">From:</span> {booking.departureAirport}
      </div>

      <div className="mb-4">
        <span className="font-bold">To:</span> {booking.arrivalAirport}
      </div>

      <div className="mb-4">
        <span className="font-bold">Departure Time:</span> {booking.departureTime}
      </div>

      <div className="mb-4">
        <span className="font-bold">Arrival Time:</span> {booking.arrivalTime}
      </div>

      <div className="mb-4">
        <span className="font-bold">Departing Flight Number:</span> {booking.departingFlightNumber}
      </div>

      <div className="mb-4">
        <span className="font-bold">Returning Flight Number:</span> {booking.returningFlightNumber}
      </div>

      <div className="mb-4">
        <span className="font-bold">Price:</span> £{booking.price}
      </div>

      <div className="mb-4">
        <span className="font-bold">Email:</span> {booking.userEmail}
      </div>
    </div>
  );
}

export default Page;
