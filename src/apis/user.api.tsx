import { api } from "./api";

export function useUserAPI() {
    return {
        saveUserPreferences: (payload: {
            uid: string,
            donationlimit: number,
            donationpref: string
        }) => {
            return api.post("/users/saveUserPreferences", payload);
        },
        getUserPreferences: (payload: {
            uid: string
        }) => {
            return api.post("/users/getUserPreferences", payload);
        }
    }
}