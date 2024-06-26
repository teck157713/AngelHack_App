import { useState } from "react";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { useNavigate } from "react-router-dom";
import { useUserAPI } from "../../apis/user.api";
import useFirebase from "../../hooks/firebase.hook";

export function Onboarding() {
    const { user } = useFirebase();
    const navigate = useNavigate();
    const userAPI = useUserAPI();

    const [ form, setForm ] = useState<any>({
        demographic: "ANY",
        limit: 0
    });
    const [ step, setStep ] = useState<number>(0);

    const onNext = () => setStep((prev) => prev + 1);
    const onPrevious = () => setStep((prev) => prev - 1);

    const emitValue = (id: string, value: any) => {
        setForm({
            ...form,
            [id]: value
        });
    }

    const onSubmit = () => {
        if (user) {
            userAPI
                .saveUserPreferences({
                    uid: user.uid,
                    donationpref: form.demographic,
                    donationlimit: form.limit
                })
                .then(() => navigate("/", { replace: true }))
                .catch(() => console.log("GG"));
        }
    }

    switch (step) {
        case 0:
            return <Step1 onNext={onNext} value={form} emitValue={emitValue} />
        case 1:
            return <Step2 onPrevious={onPrevious} onSubmit={onSubmit} value={form} emitValue={emitValue} />
    }

    return null;
}