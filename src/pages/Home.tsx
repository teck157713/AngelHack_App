import { Fab, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import DBS_Multi_Currency_Card from "../assets/dbs-visa-multi-currency.webp";
import POSB_Passion_Card from "../assets/posb-passion.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Add } from "@mui/icons-material";
import { theme } from "../theme";
import { useNavigate } from "react-router-dom";
import { useUserAPI } from "../apis/user.api";
import useFirebase from "../hooks/firebase.hook";

export function Home() {
    const { user } = useFirebase();
    const navigate = useNavigate();
    const userAPI = useUserAPI();
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        if (user) {
            userAPI
                .getUserPreferences({
                    uid: user.uid
                })
                .then((res) => {
                    // User will always have a preference, go to onboarding screen if the user does not have one
                    if (!res.data) {
                        navigate("/onboarding");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    // We are not going to handle errors for now :)
                })
        }
    }, []);

    return (
        <Stack
            alignItems="center"
            spacing={4}
            pt={2}>
            <Stack
                alignItems="center"
                spacing={2}>
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
                }}
                onClick={() => navigate("/card")}>
                <Add />
            </Fab>
        </Stack>
    )
}