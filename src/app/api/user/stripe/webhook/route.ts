import connectDb from "@/app/lib/db";
import Order from "@/app/models/order.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature")
    const rawBody = await req.text()
    let event;
    try {
        event = Stripe.webhooks.constructEvent(
            rawBody, sig!, process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        console.log("signature verification failed", error)
        return NextResponse.json(
            { message: "Invalid signature" },
            { status: 400 }
        )
    }

    await connectDb()
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderId = session.metadata?.orderId;

        if (!orderId) {
            return NextResponse.json(
                { message: "Missing orderId" },
                { status: 400 }
            );
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 404 }
            );
        }

        if (!order.isPaid) {
            await Order.findByIdAndUpdate(orderId, {
                isPaid: true,
                status: "confirmed"
            });
        }

        return NextResponse.json({ received: true }, { status: 200 });
    }



    return NextResponse.json(
        { received: true },
        { status: 200 }
    )

}
