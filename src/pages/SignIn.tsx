import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useFirebase from "../hooks/firebase.hook";

export function SignIn() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ showPassword, setShowPassword ] = useState<boolean>(false);

    const {
        auth
    } = useFirebase();

    const signin = () => {
        setPersistence(auth!, browserSessionPersistence)
            .then(() =>
                signInWithEmailAndPassword(auth!, email, password)
                    .then(() => navigate("/", { replace: true }))
                    .catch(() => console.log("Haven't handle wrong sign in :)"))
            )
            .catch(() => {});
    }

    return (
        <Container
            disableGutters
            maxWidth="sm">
            <Stack
                p={2}
                spacing={1}>
                <TextField 
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField 
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                                onMouseDown={(event) => event.preventDefault()}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                        )
                    }}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                    onClick={signin}>
                    Sign In
                </Button>
            </Stack>
        </Container>
    )
}