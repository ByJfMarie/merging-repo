import {
    Card,
    CardContent,
    TextField,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid, Alert, Snackbar, Typography
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import * as React from "react";
import SettingsService from "../../../services/api/settings.service";
import Index from "../../../layouts/settings/actions";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../translations/i18n";

const useStyles = makeStyles((theme) => ({
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
    label: {
        fontSize: '14px !important',
    }
}));

export default function LocalServer() {
    const { t } = useTranslation('settings');

    const theme = useTheme();
    const classes = useStyles(theme);

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    /** SETTINGS VALUES */
    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async () => {
        const response = await SettingsService.getLocalServer();

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
    const handleSettingsTSChange = (id, value) => {
        let cfg = settingsValue['DCMS.accepted_ts'];
        if (!cfg) return;
        cfg['value'][id] = value;
        setSettingsValue({...settingsValue, ['DCMS.accepted_ts']: cfg});
    }

    const handleSave = async () => {
        const response = await SettingsService.saveLocalServer(settingsValue);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: t("msg_error.settings_saved", {error: response.error})
            });
            return;
        }

        refreshSettings();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: t("msg_info.settings_saved")
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

            <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <Grid container rowSpacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field} id="filled-basic"
                                label={t("fields.aet")}
                                variant="standard"
                                value={getSettingsValue('DCMS.server_aet')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMS.server_aet', e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: '100%'}}
                                id="filled-basic"
                                label={t("fields.port")}
                                variant="standard"
                                value={getSettingsValue('DCMS.port_dicom')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMS.port_dicom', e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: '100%'}}
                                id="filled-basic"
                                label={t("fields.latency")}
                                variant="standard"
                                value={getSettingsValue('DCMS.latency_time')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMS.latency_time', e.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <Typography variant="h6" align="left"> {t('titles.accepted_transfer_syntax')} </Typography>
                <Divider style={{marginBottom: theme.spacing(2)}}/>
                <CardContent>
                    <FormGroup>
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={
                                <Checkbox
                                    checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2'] || false : false}
                                    onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2', e.target.checked)}
                                />
                            }
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.1'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.1', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_1")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.2'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.2', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_2")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.50'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.50', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_50")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.51'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.51', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_51")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.57'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.57', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_57")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.70'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.70', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_70")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.80'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.80', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_80")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.81'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.81', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_81")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.90'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.90', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_90")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.91'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.91', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_91")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.92'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.92', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_92")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.93'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.93', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_93")}
                        />
                    </FormGroup>

                    <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>

                    <FormGroup>
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.94'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.94', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_94")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.95'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.95', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_95")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.5'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.5', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_5")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.6.1'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.6.1', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_6_1")}
                        />
                    </FormGroup>

                    <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>

                    <FormGroup>
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.100'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.100', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_100")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.102'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.102', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_102")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.103'] || false : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.103', e.target.checked)}
                            />}
                            label={t("fields.transfer_syntax.1_2_840_10008_1_2_4_103")}
                        />
                    </FormGroup>
                    <Index
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </CardContent>
            </Card>
        </>
    )
}