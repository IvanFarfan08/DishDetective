// src/components/facades/StripeService.ts
import { loadStripe, Stripe } from '@stripe/stripe-js';

export class StripeService {
    private stripe: Stripe | null = null;

    async initialize(): Promise<Stripe | null> {
        if (!this.stripe) {
            this.stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
        }
        return this.stripe;
    }
}