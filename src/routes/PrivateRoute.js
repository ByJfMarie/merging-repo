// eslint-disable-next-line
import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import { Container } from '@mui/material';
import { useTheme } from '@emotion/react';
import Footer from '../layouts/Footer';
import UserStorage from "../services/storage/user.storage";
import UserContext from "../components/UserContext";
import Announcement from "../layouts/Announcement";
import AuthService from "../services/api/auth.service";

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

    const [user, setUser] = React.useState();
    const loadUser = () => {
        UserStorage.getUser()
            .then(rsp => {
                setUser(rsp);
            });
    }

    const [privileges, setPrivileges] = React.useState();
    const loadPrivileges = () => {
        UserStorage.getPrivileges()
            .then(rsp => {
                setPrivileges(rsp);
            });
    }

    const [settings, setSettings] = React.useState();
    const loadSettings = () => {
        UserStorage.getSettings()
            .then(rsp => {
                setSettings(rsp);
            });
    }

    React.useEffect(() => {
        UserStorage.check2FA()
            .then(rsp => {
                if (!rsp && !rsp.approved) AuthService.logout();
                else {
                    loadUser();
                    loadPrivileges();
                    loadSettings();

                    if (rsp.configure ) {
                        let path = window.location.pathname;
                        if (path !== "/profile") window.location.href = "/profile";
                    }
                }
            })
    }, [])

    if (user && privileges) {

        if (privileges.role !== "administrator" && props.path === "/") {
            return window.location.href = "/studies";
        }

        return (<Route {...rest} render={(props) => {
            if (Menu === undefined) {
                return (Component)
            } else {
                return (<>
                    <UserContext.Provider value={{user, privileges, settings}}>
                        <Menu {...props}/>
                        <Container style={{marginBottom: '50px'}}
                            maxWidth="false"
                            className={classes.mainContainer}>
                           {Component}
                        </Container>
                        <Footer />
                        <Announcement />
                    </UserContext.Provider>
                </>)
            }
        }} />)

    } else {
        //AuthService.logout();
        return (<></>)
    }

}