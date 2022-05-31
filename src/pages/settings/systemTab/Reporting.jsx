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
    const refresh = async () => {
        const response = await SettingsService.getReporting();

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
                                <FormControl style={{width: "200px"}}>
                                    <InputLabel id="print_selection">Print Selection</InputLabel>
                                    <Select
                                        labelId="print_selection"
                                        id="print_selection"
                                        label="Print Selection"
                                        value={config["RRS.printer_name"] || ''}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
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
                                <FormControl style={{width: "200px"}}>
                                    <InputLabel id="Request_Type">Request Type</InputLabel>
                                    <Select
                                        labelId="Request_Type"
                                        id="Request_Type"
                                        label="Request Type"
                                        value={config["RRS.requestType"] || ''}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Typography variant="h8" style={{textAlign: 'left'}}>
                            Request
                        </Typography>

                        <TextField
                            variant="outlined"
                            multiline={true}
                            rows={4}
                            style={{maxWidth: "700px"}}
                            value={getSettingsValue('NOT.requestURL')}
                            onChange={(e) => {
                                handleSettingsChange('NOT.requestURL', e.target.value)
                            }}
                        />

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