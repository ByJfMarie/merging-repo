import React from 'react';
import {
    Typography,
    Divider,
    Link,
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
import t from "../../services/Translation";
import SystemService from "../../services/api/system.service";

const License = () => {
    /** THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
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
            return;
        }

        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "License successfully uploaded!"
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

            <Typography variant="h4"
                        style={{textAlign: 'left', color: theme.palette.primary.main}}> {t('license')} </Typography>
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

            <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <Grid container rowSpacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("serial")}
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
                                label={t("computer_id")}
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
                                label={t("exp_date")}
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
                                label={t("amp_valid_until")}
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
                                label={"Dicom Nodes"}
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
                                label={"Portal Users"}
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
                                label={"Retention Days"}
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
                                name={"Secondary Storage"}
                                checked={getLicenseValue('secondary_storage')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Report Retrieval"}
                                checked={getLicenseValue('report_retrieval')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Transfer"}
                                checked={getLicenseValue('transfer')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Delete After Transfer"}
                                checked={getLicenseValue('delete_after_transfer')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Forwarding"}
                                checked={getLicenseValue('forwarding')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Diagnostic Report Creator"}
                                checked={getLicenseValue('diagnostic_report_creator')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"HL7"}
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
                                name={"Media Burner"}
                                checked={getLicenseValue('media_burner')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Delete After Burning"}
                                checked={getLicenseValue('delete_after_burning')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Anonymization"}
                                checked={getLicenseValue('anonymization')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Encryption"}
                                checked={getLicenseValue('encryption')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Efilm"}
                                checked={getLicenseValue('efilm')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Iqview"}
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
                                Upload License File
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