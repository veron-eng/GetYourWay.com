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
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${body.departureAirport} to ${body.arrivalAirport}`,
              description: `Departing flight number: ${body.departingFlightNumber}, returning flight number: ${body.returningFlightNumber}.`,
              metadata: {
                departureDate: body.departureDate,
                returnDate: body.returnDate,
              },
            },
            unit_amount: body.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/mybookings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    // return NextResponse.redirect(session.url!, { status: 303 });
    return NextResponse.json(session);
    // res.redirect(303, session.url);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
    // res.status(err.statusCode || 500).json(err.message);
  }
}
