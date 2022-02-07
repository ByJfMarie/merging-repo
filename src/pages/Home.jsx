import { Container, Typography } from "@mui/material"
import React from 'react';
import { useTheme } from '@emotion/react';
import t from "../services/Translation"

const Home = () => {

    const theme = useTheme();

    return (
        <Container>
            <Typography variant="h1" style={{ color: theme.palette.primary.main }}>
                {t("welcome")},
            </Typography>

            <Typography variant="h5">
                Firstname Lastname
            </Typography>
        </Container>
    )
}
export default Home