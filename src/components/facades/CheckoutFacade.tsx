import { loadStripe } from '@stripe/stripe-js';


export class CheckoutFacade {
    async initiateCheckout(items: Array<{ name: string; confidence: number; price: number }>) {
        try {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ products: items })
            });

            if (!response.ok) {
                throw new Error("Failed to initiate checkout.");
            }

            const session = await response.json();
            const result = await stripe?.redirectToCheckout({ sessionId: session.id });

            if (result?.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("There was an issue processing your checkout. Please try again.");
        }
    }
}
