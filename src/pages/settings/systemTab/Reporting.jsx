import React from 'react';
import { MenuItem, FormGroup, FormControlLabel, Checkbox, Grid, Select, InputLabel, FormControl, Card, CardContent, Link, Typography, TextField } from "@mui/material";
import { useTheme } from '@emotion/react';
import SettingsService from "../../../services/api/settings.service";
// import t from "../../../services/Translation";

export default function Reporting(props) {
    const theme = useTheme();

    const [config, setConfig] = React.useState({});
    const refresh = async() => {
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

    return (<Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
        <CardContent>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={config["RRS.enabled"]==="true" || false}/>}
                    label="Enable"
                />
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={4} lg={2} style={{ display: "flex" }}>
                        <FormControlLabel
                            control={<Checkbox checked={config["RRS.print_report"]==="true" || false}/>}
                            label="Print Report"
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} lg={10} style={{ display: "flex" }}>
                        <FormControl style={{ width: "200px" }}>
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


                    <Grid item xs={12} sm={4} lg={2} style={{ display: "flex" }}>
                        <FormControlLabel
                            control={<Checkbox checked={config["RRS.useHtmlTemplate"]==="true" || false}/>}
                            label="Template"
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} lg={10} style={{ display: "flex", alignItems: 'center' }}>
                        <Typography variant="h8" style={{ textAlign: 'left' }}>
                            <Link>Configure</Link>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4} lg={2} style={{ display: "flex", alignItems: 'center' }}>
                        <Typography variant="h8" style={{ textAlign: 'left' }}>
                            Request Type
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} lg={10} style={{ display: "flex" }}>
                        <FormControl style={{ width: "200px" }}>
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

                <Typography variant="h8" style={{ textAlign: 'left' }}>
                    Request
                </Typography>

                <TextField
                    variant="outlined"
                    multiline={true}
                    rows={4}
                    style ={{maxWidth : "700px"}}
                    value={config["RRS.requestURL"] || ''}
                />

            </FormGroup>
        </CardContent>
    </Card >)
}