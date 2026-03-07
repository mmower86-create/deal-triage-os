import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    console.log("Creating Stripe checkout session...");
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Deal Triage OS - Lifetime Access",
              description: "Structural acquisition intelligence for wholesalers",
            },
            unit_amount: 4700, // $47.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    });

    console.log("Session created:", session.id);
    return NextResponse.json({ sessionId: session.id });
    
  } catch (error: any) {
    console.error("Stripe error details:", error.message);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error.message },
      { status: 500 }
    );
  }
}