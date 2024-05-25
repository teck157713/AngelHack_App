import { Button, Stack, TextField, Typography } from "@mui/material";

export function Step2({
    value,
    onPrevious,
    onSubmit,
    emitValue
}: {
    value: any,
    onPrevious: () => void,
    onSubmit: () => void,
    emitValue: (id: string, value: any) => void
}) {
    return (
        <Stack
            p={2}
            spacing={2}
            alignItems="center">
            <Typography>
                Tell us how much you are willing to donate every month. <br />
                (Please donate within your means)
            </Typography>
            <TextField
                type="number"
                label="Limit"
                value={value.limit}
                onChange={(event) => emitValue("limit", parseInt(event.target.value))}
            />
            <Stack
                width="100%"
                direction="row"
                spacing={1}
                justifyContent="space-between">
                <Button
                    onClick={onPrevious}>
                    Previous
                </Button>
                <Button
                    onClick={onSubmit}>
                    Submit
                </Button>
            </Stack>
        </Stack>
    )
}