import {
    Card,
    CardContent,
    TextField,
    Grid,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Container,
    Typography,
    Button, Alert, Snackbar
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import t from "../../../services/Translation";
import * as React from "react";
import SettingsService from "../../../services/api/settings.service";
import ResetSave from "../../../components/settings/ResetSave";

export default function Storage() {
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

        gap: {
            paddingLeft: "200px !important",
            marginBottom: '15px',
            display: " flex",
            flexDirection: 'column',

            [theme.breakpoints.down('sm')]: {
                padding: '24px !important',
            },
        },


    });
    const classes = useStyles();

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });
    function Message() {
        if (!message || !message.show) return <></>;
        return <Alert severity={message.severity}>{message.message}</Alert>;
    }

    /** SETTINGS VALUES */
    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async () => {
        const response = await SettingsService.getStorage();

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items == null) return;
        setSettingsValue(response.items);
    }

    React.useEffect(() => {
        refreshSettings();
    }, []);

    const getSettingsValue = (id) => {
        if (!settingsValue[id]) return '';
        return settingsValue[id]['value'] || '';
    }
    const handleSettingsChange = (id, value) => {
        let cfg = settingsValue[id];
        if (!cfg) return;
        cfg['value'] = value;
        setSettingsValue({...settingsValue, [id]: cfg});
    }

    const handleSave = async () => {
        const response = await SettingsService.saveStorage(settingsValue);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        refreshSettings();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Settings successfully saved!"
        });
    };

    const handleCancel = () => {
        refreshSettings();
    };

    return (
        <>
            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>
            <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <Container maxWidth="sm" style={{marginLeft: "0px", marginBottom: '15px', paddingLeft: "0px"}}>
                        <Grid container rowSpacing={2} style={{marginBottom: '15px'}}>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("storage_path")}
                                    variant="standard"
                                    value={getSettingsValue('DCMS.storage_folder')}
                                    onChange={(e) => {
                                        handleSettingsChange('DCMS.storage_folder', e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("secondary_path")}
                                    variant="standard"
                                    value={getSettingsValue('DCMS.storage_folder_secondary')}
                                    onChange={(e) => {
                                        handleSettingsChange('DCMS.storage_folder_secondary', e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs="auto">
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={getSettingsValue('SDS.keep_images') === "true"}
                                                        onChange={(e) => handleSettingsChange('SDS.keep_images', e.target.checked + "")}
                                                    />
                                                }
                                                label={t("keep_images_for")}
                                            />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs="auto">
                                        <TextField
                                            style={{width: '50px'}}
                                            id="filled-basic"
                                            variant="standard"
                                            value={getSettingsValue('SDS.keep_images_retention')}
                                            onChange={(e) => {
                                                handleSettingsChange('SDS.keep_images_retention', e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs="auto">
                                        <Typography
                                            style={{marginLeft: '10px', marginTop: '8px'}}>{t("days")}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={getSettingsValue('SDS.use_treshold') === "true"}
                                                onChange={(e) => handleSettingsChange('SDS.use_treshold', e.target.checked + "")}
                                            />
                                        }
                                        label={t("capacity_treshold")}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid container direction="row-reverse" rowSpacing={2} style={{marginBottom: '15px'}}>
                                <Grid item xs={11}>
                                    <TextField
                                        className={classes.field}
                                        id="filled-basic"
                                        label={t("maximum")}
                                        variant="standard"
                                        value={getSettingsValue('SDS.clean_auto_treshold')}
                                        onChange={(e) => {
                                            handleSettingsChange('SDS.clean_auto_treshold', e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        className={classes.field}
                                        id="filled-basic"
                                        label={t("drop_to")}
                                        variant="standard"
                                        value={getSettingsValue('SDS.clean_auto_treshold_target')}
                                        onChange={(e) => {
                                            handleSettingsChange('SDS.clean_auto_treshold_target', e.target.value)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </CardContent>
            </Card>
        </>
    )
}