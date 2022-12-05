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
    Button, Box
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import SystemService from "../../services/api/system.service";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PryInfo from "../../components/PryInfo";
import {useSnackbar} from "notistack";

/** Translation */
import { useTranslation } from 'react-i18next';

const License = () => {
    const { t } = useTranslation('license');

    const { enqueueSnackbar } = useSnackbar();

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

    const handleUploadLicense = async (event) => {
        const response = await SystemService.setLicense(event.target.files[0]);

        if (response.error) {
            enqueueSnackbar(t("messages.upload.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.upload.success"), {variant: 'success'});
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
                    <ReceiptLongIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('title')}
                </Grid>
            </Typography>

            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <PryInfo
                text={t("info")}
            />

            <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
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
                                value={getLicenseValue('exp_date_formatted')}
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
                                value={getLicenseValue('amp_formatted')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("dicom_nodes")}
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
                                label={t("portal_users")}
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
                                label={t("retention_days")}
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
                                name={t("secondary_storage")}
                                checked={getLicenseValue('secondary_storage')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("report_retrieval")}
                                checked={getLicenseValue('report_retrieval')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("transfer")}
                                checked={getLicenseValue('transfer')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("delete_after_transfer")}
                                checked={getLicenseValue('delete_after_transfer')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("forwarding")}
                                checked={getLicenseValue('forwarding')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("diagnostic_report")}
                                checked={getLicenseValue('diagnostic_report_creator')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("hl7")}
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
                                name={t("media_burner")}
                                checked={getLicenseValue('media_burner')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("delete_after_burning")}
                                checked={getLicenseValue('delete_after_burning')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("anonymization")}
                                checked={getLicenseValue('anonymization')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("encryption")}
                                checked={getLicenseValue('encryption')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("efilm")}
                                checked={getLicenseValue('efilm')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DisplayFeature
                                name={t("iqview")}
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
                                {t("actions.upload")}
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