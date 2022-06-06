import React from 'react';
import {Typography, Divider, Link, Card, CardContent, TextField, FormControlLabel, Checkbox, Grid} from '@mui/material';
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

    const [license, setLicense] = React.useState({});
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

            <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={t("serial")}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={license.serial || ''}
                    />
                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={t("computer_id")}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={license.hardware_id || ''}
                    />
                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={t("exp_date")}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={getDate(license.exp_date)}
                    />
                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={t("amp_valid_until")}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={getDate(license.amp)}
                    />
                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={"Dicom Nodes"}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={license.dicom_nodes || '0'}
                    />
                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={"Portal Users"}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={license.portal_users || '0'}
                    />
                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={"Retention Days"}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={license.retention_days || '0'}
                    />

                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Secondary Storage"}
                                checked={license.secondary_storage || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Report Retrieval"}
                                checked={license.report_retrieval || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Transfer"}
                                checked={license.transfer || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Delete After Transfer"}
                                checked={license.delete_after_transfer || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Forwarding"}
                                checked={license.forwarding || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Diagnostic Report Creator"}
                                checked={license.diagnostic_report_creator || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"HL7"}
                                checked={license.hl7 || false}
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
                                checked={license.media_burner || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Delete After Burning"}
                                checked={license.delete_after_burning || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Anonymization"}
                                checked={license.anonymization || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Encryption"}
                                checked={license.encryption || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Efilm"}
                                checked={license.efilm || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={"Iqview"}
                                checked={license.iqview || false}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" style={{textAlign: 'right', marginTop: '15px'}}><Link>Upload License
                        File</Link></Typography>
                </CardContent>
            </Card>

        </React.Fragment>
    )
}
export default License