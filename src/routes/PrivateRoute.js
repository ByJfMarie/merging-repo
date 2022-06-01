// eslint-disable-next-line
import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import { Container } from '@mui/material';
import { useTheme } from '@emotion/react';
import Footer from '../layouts/Footer';

import AuthService from "../services/api/auth.service";

// import { UserContext } from '../service/UserContext';
// import Loading from '../layouts/Loading';

const useStyles = makeStyles((theme) => ({
    mainContainer: {

        minHeight: '100vh',
        position: "relative",

        [theme.breakpoints.up('md')]: {
            padding: '80px calc(20px + 5%) 40px calc(260px + 5%) !important',
        },

        [theme.breakpoints.between('sm', 'md')]: {
            padding: '70px 5% 0px !important',
        },

        [theme.breakpoints.down('sm')]: {
            padding: '70px 2% 0px !important',
        },
    },
}));

export default function PrivateRoute(props) {

    // const { user, isLoading } = useContext(UserContext);
    const { component: Component, menu: Menu, ...rest } = props;


    const theme = useTheme();
    const classes = useStyles(theme);

    const isConnected = AuthService.getCurrentUser();
    if (isConnected) {

        if (AuthService.getCurrentUser().role !== "administrator" && props.path === "/") {
            return window.location.href = "/studies"
        }

        return (<Route {...rest} render={(props) => {
            if (Menu === undefined) {
                return (Component)
            } else {
                return (<>
                    <Menu {...props} />
                    <Container maxWidth="false" className={classes.mainContainer}>
                       {Component}
                    </Container>
                    <Footer />
                </>)
            }
        }} />)

    } else {
        AuthService.logout();
    }

}