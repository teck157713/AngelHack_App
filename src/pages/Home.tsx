import { Button, Fab, Stack, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import DBS_Multi_Currency_Card from "../assets/dbs-visa-multi-currency.webp";
import POSB_Passion_Card from "../assets/posb-passion.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Add } from "@mui/icons-material";
import { theme } from "../theme";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAPI } from "../apis/user.api";
import useFirebase from "../hooks/firebase.hook";
import { usePaymentAPI } from "../apis/payment.api";
import { useTransactionAPI } from "../apis/transaction.api";

export function Home() {
    const { user } = useFirebase();
    const navigate = useNavigate();
    const location = useLocation();
    const userAPI = useUserAPI();
    const paymentAPI = usePaymentAPI();
    const transactionAPI = useTransactionAPI();
    const [selectedTab, setSelectedTab] = useState(0);
    const [ donated, setDonated ] = useState(0);
    const [ taxDeducted, setTaxDeducted ] = useState(0);

    const tabs: {
        label: string,
        value?: "M" | "Y"
    }[] = [
        {
            label: "Monthly",
            value: "M"
        },
        {
            label: "Yearly",
            value: "Y"
        },
        {
            label: "All-Time",
            value: undefined
        }
    ]

    const loadUserPreferences = () => {
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
    }

    const loadAmount = (tab: number) => {
        if (user) {
            transactionAPI
                .getAmount({
                    uid: user.uid,
                    timeframe: tabs[tab].value
                })
                .then((res) => {
                    setDonated(res.data?.donatedAmount || 0);
                    setTaxDeducted(res.data?.taxDeducted || 0);
                })
                .catch((error) => {
                    console.log(error);
                    // We are not going to handle errors for now :)
                })
        }
    }

    const handleSelectTab = (_: SyntheticEvent, newValue: number) => {
        loadAmount(newValue);
        setSelectedTab(newValue);
    }

    useEffect(() => {
        loadUserPreferences();
        loadAmount(selectedTab);
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
                    onChange={handleSelectTab}
                    variant="fullWidth"
                    sx={{
                        textDecoration: "none"
                    }}>
                    {
                        tabs.map(tab => (
                            <Tab 
                                key={tab.label}
                                label={tab.label}
                            />
                        ))
                    }
                </Tabs>
                <Stack
                    direction="row"
                    spacing={2}>
                    <Stack
                        spacing={1}
                        alignItems="center">
                        <Typography
                            variant="h4">
                            ${donated.toFixed(2)}
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
                            ${taxDeducted.toFixed(2)}
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
                spaceBetween={16}
                style={{
                    maxWidth: "100%"
                }}>
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

            <Button
                onClick={() => {
                    paymentAPI
                        .createCheckoutSession({
                            uid: user?.uid || "",
                            products: [
                                {
                                    price_data: {
                                        currency: "sgd",
                                        product_data: {
                                            name: "Test Product"
                                        },
                                        unit_amount: 960
                                    },
                                    quantity: 1
                                }
                            ],
                            successUrl: `${window.location.href}payment-success`,
                            cancelUrl: window.location.href
                        })
                        .then((res) => window.location.href = res.data.url)
                        .catch(() => {})
                }}>
                Test Payment
            </Button>

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