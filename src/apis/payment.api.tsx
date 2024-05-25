import { api } from "./api"

export function usePaymentAPI() {
    return {
        createCheckoutSession: (payload: {
            products: {
                price: string,
                quantity: number
            }[],
            successUrl: string,
            cancelUrl: string
        }) => {
            return api.post("/payments/createCheckoutSession", payload);
        }
    }
}