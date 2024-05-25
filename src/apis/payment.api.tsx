import { api } from "./api"

export function usePaymentAPI() {
    return {
        createCheckoutSession: (payload: {
            uid: string,
            products: {
                price_data: {
                    currency: string,
                    product_data: {
                        name: string
                    },
                    unit_amount: number
                },
                quantity: number
            }[],
            successUrl: string,
            cancelUrl: string
        }) => {
            return api.post("/payments/createCheckoutSession", payload);
        }
    }
}