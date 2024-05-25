import { Stack, Typography } from "@mui/material";
import useFirebase from "../hooks/firebase.hook";

export function Onboarding() {
    const {
        user
    } = useFirebase();

    return (
        <Stack
            p={2}
            spacing={2}
            alignItems="center">
            <Typography>
                Hi { user?.displayName }
            </Typography>
        </Stack>
    )
}