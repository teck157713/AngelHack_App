import { Button, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ICard, ICardResponse } from "../models/card.model";
import { ArrowBackIos } from "@mui/icons-material";

export function EditCard() {
    const navigate = useNavigate();
    const { cardId } = useParams();
    const [ card, setCard ] = useState<ICard>({ cardNumber: "", expiryMonth: "", expiryYear: "", cvv: "" });

    const submit = () => {
        // It will always succeed in this hackathon so that there will be no sudden GG :)

        navigate(-1);
    }

    useEffect(() => {
        // Edit mode, load card information
        if (cardId) {
            // <TODO> Load the card info 
            const cardRes: ICardResponse = {
                last4: "1234",
                expiryMonth: "12",
                expiryYear: "30"
            }

            setCard({
                ...card,
                expiryMonth: cardRes.expiryMonth,
                expiryYear: cardRes.expiryYear
            });
        }
    }, [cardId]);

    return (
        <Container
            disableGutters
            maxWidth="sm">
            <Stack
                p={1}
                gap={2}>
                <Stack
                    direction="row"
                    alignItems="center">
                    <IconButton
                        onClick={() => navigate(-1)}>
                        <ArrowBackIos />
                    </IconButton>
                    <Typography
                        variant="h5">
                        {
                            cardId ?
                                "Edit Card" :
                                "Add Card"
                        }
                    </Typography>
                </Stack>

                <TextField
                    label="Card Number"
                    value={card.cardNumber}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) => setCard({ ...card, cardNumber: event.target.value })}
                />
                <Stack
                    direction="row"
                    spacing={1}>
                    <TextField
                        label="Expiry (MM)"
                        value={card.expiryMonth}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) => setCard({ ...card, expiryMonth: event.target.value })}
                    />
                    <TextField
                        label="Expiry (YY)"
                        value={card.expiryYear}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) => setCard({ ...card, expiryYear: event.target.value })}
                    />
                    <TextField
                        label="CVV"
                        value={card.cvv}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) => setCard({ ...card, cvv: event.target.value })}
                    />
                </Stack>
                <Button
                    variant="contained"
                    onClick={submit}>
                    Submit
                </Button>
            </Stack>
        </Container>
    )
}