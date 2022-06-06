import React from 'react';
import {
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid,
    Select,
    InputLabel,
    FormControl,
    Card,
    CardContent,
    Link,
    Typography,
    TextField,
    Button, Alert, Snackbar
} from "@mui/material";
import {useTheme} from '@emotion/react';
import SettingsService from "../../../services/api/settings.service";
import t from "../../../services/Translation";
import ResetSave from "../../../components/settings/ResetSave";
// import t from "../../../services/Translation";

export default function Reporting(props) {
    const theme = useTheme();

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
        if (!config[id]) return '';
        return config[id]['value'] || '';
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
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        refresh();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Settings successfully saved!"
        });
    };

    const handleCancel = () => {
        refresh();
    };

    return (
        <>
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
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getSettingsValue('RRS.enabled') === "true"}
                                    onChange={(e) => handleSettingsChange('RRS.enabled', e.target.checked + "")}
                                />
                            }
                            label="Enable"
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
                                    label="Print Report"
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} lg={10} style={{display: "flex"}}>
                                <FormControl fullWidth variant="standard">
                                    <Select
                                        labelId="print_selection"
                                        id="print_selection"
                                        label="Print Selection"
                                        value={getSettingsValue("RRS.printer_name")}
                                        onChange={(e) => handleSettingsChange('RRS.printer_name', e.target.value)}
                                    >
                                        {
                                            Object.keys(printers).map((printer) => {
                                                return <MenuItem value={printer}>{printer}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={4} lg={2} style={{display: "flex"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={getSettingsValue('RRS.useHtmlTemplate') === "true"}
                                            onChange={(e) => handleSettingsChange('RRS.useHtmlTemplate', e.target.checked + "")}
                                        />
                                    }
                                    label="Template"
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} lg={10} style={{display: "flex", alignItems: 'center'}}>
                                <Typography variant="h8" style={{textAlign: 'left'}}>
                                    <Link>Configure</Link>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={4} lg={2} style={{display: "flex", alignItems: 'center'}}>
                                <Typography variant="h8" style={{textAlign: 'left'}}>
                                    Request Type
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
                                        <MenuItem value={0}>Http request</MenuItem>
                                        <MenuItem value={1}>UNC Request (txt, pdf, SR)</MenuItem>
                                        <MenuItem value={2}>Mitra Broker</MenuItem>
                                        <MenuItem value={3}>Database General Electrics request</MenuItem>
                                        <MenuItem value={4}>Fuji Synapse Http Request</MenuItem>
                                        <MenuItem value={5}>Dicom receive</MenuItem>
                                    </Select>

                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h8" style={{textAlign: 'left'}}>
                                    Request
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    multiline={true}
                                    rows={4}
                                    fullWidth
                                    value={getSettingsValue('NOT.requestURL')}
                                    onChange={(e) => {
                                        handleSettingsChange('NOT.requestURL', e.target.value)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </FormGroup>
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </CardContent>
            </Card>
        </>
    )
}