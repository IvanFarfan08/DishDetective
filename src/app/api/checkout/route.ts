import Stripe from 'stripe';
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_KEY as string);

export async function POST(request: Request) {
    const {products} = await request.json()
    
    const lineItems = products.map((product: any) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name,
            },
            unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/error',
    });

    return NextResponse.json({id: session.id});
}