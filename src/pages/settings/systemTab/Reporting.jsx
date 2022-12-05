import React from 'react';
import {
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid,
    Select,
    FormControl,
    Card,
    CardContent,
    Typography,
    TextField,
} from "@mui/material";
import {useTheme} from '@emotion/react';
import SettingsService from "../../../services/api/settings.service";
import Index from "../../../layouts/settings/actions";
import {makeStyles} from "@mui/styles";
import {useSnackbar} from "notistack";

/** Translation */
import { useTranslation } from 'react-i18next';

export default function Reporting(props) {
    const { t } = useTranslation('system');

    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        }
    });
    const classes = useStyles();

    /** SETTINGS VALUES */
    const [config, setConfig] = React.useState({});
    const [printers, setPrinters] = React.useState({});
    const refresh = async () => {
        const response = await SettingsService.getReporting();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setConfig(response.items);
    }
    const refreshPrinters = async () => {
        const response = await SettingsService.getPrinters();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setPrinters(response.items);
    }
    React.useEffect(() => {
        refresh();
        refreshPrinters();
    }, []);

    const getSettingsValue = (id) => {
        if (!config || !config[id]) return '';
        return config[id]['value'];
    }
    const handleSettingsChange = (id, value) => {
        let cfg = config[id];
        if (!cfg) return;
        cfg['value'] = value;
        setConfig({...config, [id]: cfg});
    }

    const handleSave = async () => {
        const response = await SettingsService.saveReporting(config);

        if (response.error) {
            enqueueSnackbar(t("messages.save_settings.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.save_settings.success"), {variant: 'success'});
        refresh();
    };

    const handleCancel = () => {
        refresh();
    };

    return (
        <>
            <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getSettingsValue('RRS.enabled') === "true"}
                                    onChange={(e) => handleSettingsChange('RRS.enabled', e.target.checked + "")}
                                />
                            }
                            label={t("tab_reporting.enable")}
                        />
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={4} lg={2} style={{display: "flex"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={getSettingsValue('RRS.print_report') === "true"}
                                            onChange={(e) => handleSettingsChange('RRS.print_report', e.target.checked + "")}
                                        />
                                    }
                                    label={t("tab_reporting.print_report")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} lg={10} style={{display: "flex"}}>
                                <FormControl fullWidth variant="standard">
                                    <Select
                                        labelId="print_selection"
                                        id="printer_selection"
                                        label={t("tab_reporting.print_selection")}
                                        value={getSettingsValue("RRS.printer_name")}
                                        onChange={(e) => handleSettingsChange('RRS.printer_name', e.target.value)}
                                    >
                                        {
                                            Object.keys(printers).map((printer) => {
                                                return <MenuItem key={printer} value={printer}>{printer}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>


                            {
                                /*<Grid item xs={12} sm={4} lg={2} style={{display: "flex"}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={getSettingsValue('RRS.useHtmlTemplate') === "true"}
                                                onChange={(e) => handleSettingsChange('RRS.useHtmlTemplate', e.target.checked + "")}
                                            />
                                        }
                                        label={t("fields.template")}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={8} lg={10} style={{display: "flex", alignItems: 'center'}}>
                                    <Typography variant="h8" style={{textAlign: 'left'}}>
                                        <Link>{t("buttons.configure")}</Link>
                                    </Typography>
                                </Grid>*/
                            }

                            <Grid item xs={12} sm={4} lg={2} style={{display: "flex", alignItems: 'center'}}>
                                <Typography variant="h8" style={{textAlign: 'left'}}>
                                    {t("tab_reporting.request_type.name")}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} lg={10} style={{display: "flex"}}>

                                    <Select
                                        labelId="Request_Type"
                                        id="Request_Type"
                                        fullWidth
                                        variant="standard"
                                        label="Request Type"
                                        value={getSettingsValue("RRS.requestType")}
                                        onChange={(e) => handleSettingsChange('RRS.requestType', e.target.value)}
                                    >
                                        <MenuItem value={0}>{t("tab_reporting.request_type.http")}</MenuItem>
                                        <MenuItem value={1}>{t("tab_reporting.request_type.unc")}</MenuItem>
                                        <MenuItem value={2}>{t("tab_reporting.request_type.mitra")}</MenuItem>
                                        <MenuItem value={3}>{t("tab_reporting.request_type.ge")}</MenuItem>
                                        <MenuItem value={4}>{t("tab_reporting.request_type.fuji")}</MenuItem>
                                        <MenuItem value={5}>{t("tab_reporting.request_type.dicom")}</MenuItem>
                                    </Select>

                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h8" style={{textAlign: 'left'}}>
                                    {t("tab_reporting.request")}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    multiline={true}
                                    rows={4}
                                    fullWidth
                                    value={getSettingsValue('RRS.requestURL')}
                                    onChange={(e) => {
                                        handleSettingsChange('RRS.requestURL', e.target.value)
                                    }}
                                />
                            </Grid>
                        </Grid>
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