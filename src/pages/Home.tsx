import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";

export function Home() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Stack
            alignItems="center"
            spacing={2}
            pt={2}>
            <Typography
                variant="h5">
                $1000 Donated
            </Typography>
            <Tabs 
                value={selectedTab}
                onChange={(_: SyntheticEvent, newValue: number) => setSelectedTab(newValue)}
                variant="fullWidth"
                sx={{
                    textDecoration: "none"
                }}>
                <Tab label="Weekly" />
                <Tab label="Monthly" />
                <Tab label="All-Time" />
            </Tabs>
        </Stack>
    )
}