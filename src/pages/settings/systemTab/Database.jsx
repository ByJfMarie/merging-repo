import {Card, CardContent, TextField, Grid, Alert, Snackbar} from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import React from "react";
import SettingsService from "../../../services/api/settings.service";
import Index from "../../../layouts/settings/actions";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../translations/i18n";

export default function Database() {
    const { t } = useTranslation('settings');

    /** STYLE & THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        },
        field: {
            width: '100%'
        },
        tableCell: {
            padding: "0px 16px !important",
            height: "50px !important",
            borderColor: theme.palette.textfield.border + " !important",
        },
        hover: {
            "&:hover": {
                transition: '0.3s',
                backgroundColor: theme.palette.table.hover + "! important"
            },
            height: "50px ! important",
            backgroundColor: theme.palette.textfield.background + "! important"
        },

    });
    const classes = useStyles();

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });
    /*function Message() {
        if (!message || !message.show) return <></>;
        return <Alert severity={message.severity}>{message.message}</Alert>;
    }*/

    /** SETTINGS VALUES */
    const [config, setConfig] = React.useState({});
    const refresh = async() => {
        const response = await SettingsService.getDatabase();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setConfig(response.items);
    }
    React.useEffect(() => {
        refresh();
    }, []);

    const getSettingsValue = (id) => {
        return config[id] || '';
    }
    const handleSettingsChange = (id, value) => {
        setConfig({...config, [id]: value});
    }

    const handleSave = async () => {
        const response = await SettingsService.saveDatabase(config);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: t("msg_error.settings_saved", {error: response.error})
            });
            return;
        }

        refresh();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: t("msg_info.settings_saved")
        });
    };

    const handleCancel = () => {
        refresh();
    };

    return (
        <>
            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>
        <Card className={classes.card} style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item xs={9}>
                        <TextField
                            className={classes.field}
                            id="DB.host"
                            label={t("fields.host")}
                            variant="standard"
                            value={getSettingsValue('DB.host')}
                            onChange={(e) => {
                                handleSettingsChange('DB.host', e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            className={classes.field}
                            id="DB.port"
                            label={t("fields.port")}
                            variant="standard"
                            value={getSettingsValue('DB.port')}
                            onChange={(e) => {
                                handleSettingsChange('DB.port', e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="DB.user"
                            label={t("fields.user")}
                            variant="standard"
                            value={getSettingsValue('DB.user')}
                            onChange={(e) => {
                                handleSettingsChange('DB.user', e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="DB.password"
                            label={t("fields.password")}
                            type={"password"}
                            variant="standard"
                            value={getSettingsValue('DB.password')}
                            onChange={(e) => {
                                handleSettingsChange('DB.password', e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="DB.name"
                            label={t("fields.database_name")}
                            variant="standard"
                            value={getSettingsValue('DB.name')}
                            onChange={(e) => {
                                handleSettingsChange('DB.name', e.target.value)
                            }}
                        />
                    </Grid>
                </Grid>
                <Index
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                />
            </CardContent>
        </Card>
            </>
            )
}