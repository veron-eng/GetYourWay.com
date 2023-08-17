import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/firebaseAuth";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  maxNetworkRetries: 2,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata;

        if (metadata) {
          const userDocRef = doc(db, "bookings", metadata.userId);
          const docSnap = await getDoc(userDocRef);
          const newBooking = {
            arrivalAirport: metadata.arrivalAirport,
            arrivalTime: metadata.arrivalTime,
            arrivalDate: metadata.arrivalDate,
            departingFlightNumber: metadata.departingFlightNumber,
            departureAirport: metadata.departureAirport,
            departureTime: metadata.departureTime,
            departureDate: metadata.departureDate,
            price: metadata.price,
            returningFlightNumber: metadata.returningFlightNumber,
          };

          if (docSnap.exists()) {
            // Document exists, update the existing document by adding the new booking to the array.
            await updateDoc(userDocRef, {
              bookings: arrayUnion(newBooking),
            });
          } else {
            // Document doesn't exist, create it with the initial booking.
            await setDoc(userDocRef, {
              userEmail: metadata.userEmail,
              bookings: [newBooking],
            });
          }
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ status: 200 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}

// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { db } from "@/firebaseAuth";
// import { doc, setDoc } from "firebase/firestore";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2022-11-15",
//   maxNetworkRetries: 2,
// });

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(req: Request) {
//   const body = await req.text();
//   const headersList = headers();
//   const sig = headersList.get("stripe-signature");

//   let event: Stripe.Event;
//   try {
//     event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
//     switch (event.type) {
//       case "checkout.session.completed":
//         const session = event.data.object as Stripe.Checkout.Session;
//         const metadata = session.metadata;

//         if (metadata) {
//           await setDoc(doc(db, "bookings", metadata.userId), metadata);
//         }
//         break;
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     return NextResponse.json({ status: 200 });
//   } catch (err: any) {
//     console.error(err.message);
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     );
//   }
// }
