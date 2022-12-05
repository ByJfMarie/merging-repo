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


export default function PrivateRoute(props) {

    // const { user, isLoading } = useContext(UserContext);
    const { component: Component, menu: Menu, ...rest } = props;



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

    const [status2FA, setStatus2FA] = React.useState();
    React.useEffect(() => {
        UserStorage.check2FA()
            .then(rsp => {
                if (!rsp && !rsp.approved) AuthService.logout();
                else {
                    setStatus2FA(rsp);

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
            return (<>
                <UserContext.Provider value={{user, privileges, settings}}>
                    {/* <Menu {...props}/> */}
                    <Container
                        maxWidth="false"
                        className='w-full h-full'>
                       {Component}
                    </Container>
                    <Announcement />
                </UserContext.Provider>
            </>)
        }} />)

    } else {
        //AuthService.logout();
        return (<></>)
    }

}