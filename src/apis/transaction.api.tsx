import { api } from "./api"

export function useTransactionAPI() {
    return {
        getAmount: (payload: {
            uid: string,
            timeframe?: "M" | "Y"
        }) => {
            return api.post("/transactions/getAmount", payload);
        }
    }
}