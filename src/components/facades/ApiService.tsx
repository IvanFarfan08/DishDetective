// src/components/facades/ApiService.ts
export class ApiService {
    async createCheckoutSession(items: Array<{ name: string; confidence: number; price: number }>): Promise<any> {
        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ products: items })
        });

        if (!response.ok) {
            throw new Error("Failed to create checkout session.");
        }

        return response.json();
    }
}