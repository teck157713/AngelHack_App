import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <Stack
            justifyContent="center" 
            p={1}
            onClick={() => navigate("/", { replace: true })}
            sx={{
                height: "100dvh"
            }}>
            <Typography>
                Payment Successful! <br /><br />
                Click anywhere to return to the homepage.
            </Typography>
        </Stack>
    )
}