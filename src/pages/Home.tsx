import { Fab, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import DBS_Multi_Currency_Card from "../assets/dbs-visa-multi-currency.webp";
import POSB_Passion_Card from "../assets/posb-passion.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Add } from "@mui/icons-material";
import { theme } from "../theme";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Stack
            alignItems="center"
            spacing={4}
            pt={2}>
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
            <Stack
                direction="row"
                spacing={2}>
                <Stack
                    spacing={1}
                    alignItems="center">
                    <Typography
                        variant="h4">
                        ${1000 * (selectedTab + 1)}
                    </Typography>
                    <Typography variant="h5">
                        Donated
                    </Typography>
                </Stack>

                <Stack
                    spacing={1}
                    alignItems="center">
                    <Typography
                        variant="h4">
                        ${1000 * (selectedTab + 1)}
                    </Typography>
                    <Typography variant="h5">
                        Tax Deducted
                    </Typography>
                </Stack>
            </Stack>
            
            <Swiper
                slidesPerView={"auto"}
                centeredSlides={true}
                spaceBetween={16}>
                <SwiperSlide
                    style={{
                        width: 256
                    }}>
                    <img
                        src={DBS_Multi_Currency_Card}
                        width={256}
                    />
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        width: 256
                    }}>
                    <img
                        src={POSB_Passion_Card}
                        width={256}
                    />
                </SwiperSlide>
            </Swiper>

            <Fab
                sx={{
                    position: "absolute",
                    right: theme.spacing(2),
                    bottom: theme.spacing(2)
                }}>
                <IconButton
                    onClick={() => navigate("/card")}>
                    <Add />
                </IconButton>
            </Fab>
        </Stack>
    )
}