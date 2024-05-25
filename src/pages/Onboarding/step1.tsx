import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import useFirebase from "../../hooks/firebase.hook";
import { codelist } from "../../codelist";

export function Step1({
    value,
    onNext,
    emitValue
}: {
    value: any,
    onNext: () => void,
    emitValue: (id: string, value: any) => void
}) {
    const {
        user
    } = useFirebase();

    return (
        <Stack
            p={2}
            spacing={2}
            alignItems="center">
            <Typography>
                Hi { user?.displayName }, <br /><br />
                Thanks for taking the first step to help out humanity :) <br /><br />
                To start off, let us know which demographic of people do you most want to help?
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="demographic-select-label">Demographic</InputLabel>
                <Select
                    labelId="demographic-select-label"
                    id="demographic-select"
                    value={value.demographic}
                    label="Demographic"
                    onChange={(event) => emitValue("demographic", event.target.value)}>
                    {
                        codelist.DEMOGRAPHIC.map(item => (
                            <MenuItem 
                                key={item.value} 
                                value={item.value}>
                                { item.label }
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <Button
                onClick={onNext}>
                Next
            </Button>
        </Stack>
    )
}