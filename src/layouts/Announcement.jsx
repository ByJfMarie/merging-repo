import {Alert, Snackbar, Button, IconButton, AlertTitle} from "@mui/material";
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import * as React from "react";
import SettingsService from "../services/api/settings.service";
import SystemService from "../services/api/system.service";
import CloseIcon from '@mui/icons-material/Close';
import UserContext from "../components/UserContext";

/** Translation */
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        backgroundColor: theme.palette.menu.background,
        //position: 'absolute !important',
        position: 'fixed',
        left: "0",
        bottom: '0',
        color: '#b0b0b0',
        marginTop: '20px',
        textAlign: "center",
        width: "100%"
    },
    link: {
        margin: theme.spacing(1)
    }
}));

export default function Announcement() {
    const { t } = useTranslation('common');

    /** THEME */
    useTheme();

    /** User & privileges */
    const { privileges } = React.useContext(UserContext);

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: "",
        action: null
    });

    const refresh = async() => {
        if (!privileges || !privileges.pages.includes("settings")) return;

        const response = await SettingsService.restartNeeded();
        if (response.error) return;
        if (!response.items) return;
        if (!response.items.value) return;
        if (response.items.value==="false") return;

        setMessage({
            ...message,
            show: true,
            severity: "warning",
            message: t("msg_info.settings_changed"),
            action: restartAction
        });
    }

    React.useEffect(() => {
        refresh();
    }, []);

    const handleRestart = async() => {
        await SystemService.restartPerennity();

        setMessage({...message, show: false});
    }

    const restartAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleRestart}
            >
                {t("buttons.restart")}
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {setMessage({...message, show: false})}}
            >
                <CloseIcon
                    fontSize="small"
                />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <Snackbar
                open={message.show}
                autoHideDuration={null}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                    severity={message.severity}
                    sx={{ width: '100%' }}
                    action={message.action}
                >
                    <AlertTitle>{t("titles.warning")}</AlertTitle>
                    {message.message}
                </Alert>
            </Snackbar>
        </>
    )
}