import React from 'react';
import {
    Typography,
    Divider,
    Card,
    CardContent,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Button, Alert, Snackbar, Box
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import SystemService from "../../services/api/system.service";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";
import PryInfo from "../../components/PryInfo";

const License = () => {
    const { t } = useTranslation('settings');

    /** THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        },
        field: {
            width: '100%',
            marginBottom: '15px !important',
        }
    });
    const classes = useStyles();

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    const [license, setLicense] = React.useState({});
    const getLicenseValue = (id) => {
        if (!license) return '';
        return license[id] || '';
    }
    const refresh = async () => {
        const response = await SystemService.getLicense();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setLicense(response.items);
    }

    React.useEffect(() => {
        refresh();
    }, []);

    const getDate = (date) => {
        if (!date) return '';
        if (!date.day || !date.month || !date.year) return '';
        return date.day + "/" + date.month + '/' + date.year;
    }

    const handleUploadLicense = async (event) => {
        const response = await SystemService.setLicense(event.target.files[0]);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: t("msg_error.license_uploaded", {error: response.error})
            });
            return;
        }

        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: t("msg_info.license_uploaded")
        });

        refresh();
    }

    const DisplayFeature = (params) => {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={params.checked}
                        inputProps={{
                            disabled: true
                        }}

                    />
                }
                label={params.name}
            />
        )
    }

    return (
        <React.Fragment>

            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <ReceiptLongIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.license')}
                </Grid>
            </Typography>

            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={() => {
                          setMessage({...message, show: !message.show})
                      }}>
                <Alert onClose={() => {
                    setMessage({...message, show: !message.show})
                }} severity={message.severity} sx={{width: '100%'}}>
                    {message.message}
                </Alert>
            </Snackbar>

            <PryInfo
                text={t("info.license")}
            />

            <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <Grid container rowSpacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("fields.serial")}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getLicenseValue('serial')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("fields.computer_id")}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getLicenseValue('hardware_id')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("fields.exp_date")}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getDate(getLicenseValue('hardware_id'))}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("fields.amp_valid_until")}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getDate(getLicenseValue('amp'))}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("fields.dicom_nodes")}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getLicenseValue('dicom_nodes') || '0'}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("fields.portal_users")}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getLicenseValue('portal_users') || '0'}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("fields.retention_days")}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getLicenseValue('retention_days') || '0'}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.secondary_storage")}
                                checked={getLicenseValue('secondary_storage')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.report_retrieval")}
                                checked={getLicenseValue('report_retrieval')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.transfer")}
                                checked={getLicenseValue('transfer')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.delete_after_transfer")}
                                checked={getLicenseValue('delete_after_transfer')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.forwarding")}
                                checked={getLicenseValue('forwarding')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.diagnostic_report")}
                                checked={getLicenseValue('diagnostic_report_creator')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.hl7")}
                                checked={getLicenseValue('hl7')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.media_burner")}
                                checked={getLicenseValue('media_burner')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.delete_after_burning")}
                                checked={getLicenseValue('delete_after_burning')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.anonymization")}
                                checked={getLicenseValue('anonymization')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.encryption")}
                                checked={getLicenseValue('encryption')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.efilm")}
                                checked={getLicenseValue('efilm')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("fields.iqview")}
                                checked={getLicenseValue('iqview')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>
                        </Grid>

                        <Grid item xs={10}/>
                        <Grid item xs/>
                        <Grid item xs="auto">
                            <Button
                                size="small"
                                variant="contained"
                                component="label"
                            >
                                {t("buttons.upload_license")}
                                <input type="file" hidden onChange={handleUploadLicense} accept=".txt"/>
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
export default License