import {
    Alert,
    Snackbar,
    Button,
    IconButton,
    AlertTitle,
    Backdrop,
    CircularProgress,
    Typography,
    Box
} from "@mui/material";
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import * as React from "react";
import SettingsService from "../services/api/settings.service";
import SystemService from "../services/api/system.service";
import CloseIcon from '@mui/icons-material/Close';
import UserContext from "../components/UserContext";

/** Translation */
import { useTranslation } from 'react-i18next';
import {useSnackbar} from "notistack";

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

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    /** THEME */
    useTheme();

    /** User & privileges */
    const { privileges } = React.useContext(UserContext);

    let snackbarId = "";

    const refresh = async() => {
        if (!privileges || !privileges.pages.includes("settings")) return;

        const response = await SettingsService.restartNeeded();
        if (response.error) return;
        if (!response.items) return;
        if (!response.items.value) return;
        if (response.items.value==="false") return;

        snackbarId = enqueueSnackbar(t("msg_info.settings_changed"), {
            persist: true,
            preventDuplicate: true,
            variant: "warning",
            action
        });
    }

    React.useEffect(() => {
        refresh();
    }, []);

    const handleRestart = async() => {
        closeSnackbar(snackbarId);
        setOverlayActive(true);
        SystemService.restartPerennity()
            .then((rsp => {
                    handleOverlayClose();

                    if (rsp.error) enqueueSnackbar(t("msg_error.perennity_restart"), {variant: 'error'});
                    else enqueueSnackbar(t("msg_info.perennity_restart"), {variant: 'success'});
                })
            );
    }

    //Progress Overlay
    const [overlayActive, setOverlayActive] = React.useState(false);
    const handleOverlayClose = () => {
        setOverlayActive(false);
    }

    const action = snackbarId => (
        <>
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
                onClick={() => {closeSnackbar(snackbarId);}}
            >
                <CloseIcon
                    fontSize="small"
                />
            </IconButton>
        </>
    );

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={overlayActive}
                onClick={handleOverlayClose}
            >
                <CircularProgress color="inherit" />
                <Box ml={2}>
                    <Typography variant="h3">{t("texts.restart_perennity")}</Typography>
                </Box>
            </Backdrop>
        </>
    )
}