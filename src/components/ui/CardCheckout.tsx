import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface CardCheckoutProps {
    items: Array<{
        name: string;
        confidence: number;
        price: number;
    }>;
}

export function CardCheckout({ items }: CardCheckoutProps) {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem>
                    <div className="space-y-4 w-full">
                        <h3 className="text-xl font-bold">Checkout</h3>
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center w-full gap-4">
                                <span className="capitalize flex-shrink-0">{item.name}</span>
                                <span className="flex-grow text-right">${item.price.toFixed(2)}</span>
                            </div>
                        ))}
                        {items.length > 0 && (
                            <div className="border-t pt-4 mt-4 w-full">
                                <div className="flex justify-between items-center font-bold w-full gap-4">
                                    <span className="flex-shrink-0">Total</span>
                                    <span className="flex-grow text-right">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        )}
                        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Checkout
                        </button>
                    </div>
                </CardItem>
            </CardBody>
        </CardContainer>
    );
} 