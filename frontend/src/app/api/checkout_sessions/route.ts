import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  maxNetworkRetries: 2,
});

export async function POST(req: Request) {
  const body = await req.json();
  const headersList = headers();
  const origin = headersList.get("origin");
  const fullUrl = headersList.get("referer");
  console.log(body);

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: body.userEmail,
      metadata: {
        userId: body.userId,
        userEmail: body.userEmail,
        price: body.price,
        departureAirport: body.departureAirport,
        arrivalAirport: body.arrivalAirport,
        departureDate: body.departureDate,
        arrivalDate: body.arrivalDate,
        departureTime: body.departureTime,
        arrivalTime: body.arrivalTime,
        departingFlightNumber: body.departingFlightNumber,
        returningFlightNumber: body.returningFlightNumber,
      },
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${body.departureAirport} to ${body.arrivalAirport}`,
              description: `Departing flight number: ${body.departingFlightNumber}, returning flight number: ${body.returningFlightNumber}.`,
              metadata: {
                userId: body.userId,
                userEmail: body.userEmail,
                price: body.price,
                departureAirport: body.departureAirport,
                arrivalAirport: body.arrivalAirport,
                departureDate: body.departureDate,
                arrivalDate: body.arrivalDate,
                departureTime: body.departureTime,
                arrivalTime: body.arrivalTime,
                departingFlightNumber: body.departingFlightNumber,
                returningFlightNumber: body.returningFlightNumber,
              },
            },
            unit_amount: Math.floor(body.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/mybookings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${fullUrl}?canceled=true`,
    });

    return NextResponse.json(session);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
