import { StripeService } from '@/components/facades/StripeService';
import { ApiService } from '@/components/facades/ApiService';

export class CheckoutFacade {
    private stripeService = new StripeService();
    private apiService = new ApiService();

    async initiateCheckout(items: Array<{ name: string; confidence: number; price: number }>) {
        try {
            const stripe = await this.stripeService.initialize();
            const session = await this.apiService.createCheckoutSession(items);
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
