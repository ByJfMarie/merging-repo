
import { Card, CardContent, TextField, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";
import React from "react";
import SettingsService from "../../../services/api/settings.service";

export default function Database() {
    /** STYLE & THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
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

    });
    const classes = useStyles();

    const [config, setConfig] = React.useState({});
    const refresh = async() => {
        const response = await SettingsService.getDatabase();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setConfig(response.items);
    }
    React.useEffect(() => {
        refresh();
    }, []);

    return (
        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item xs={9}>
                        <TextField
                            className={classes.field}
                            id="filled-basic"
                            label={t("host")}
                            variant="standard"
                            value={config["DB.host"] || ""}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            className={classes.field}
                            id="filled-basic"
                            label={t("port")}
                            variant="standard"
                            value={config["DB.port"] || ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-basic"
                            label={t("user")}
                            variant="standard"
                            value={config["DB.user"] || ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-basic"
                            label={t("password")}
                            type={"password"}
                            variant="standard"
                            value={config["DB.password"] || ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-basic"
                            label={t("database_name")}
                            variant="standard"
                            value={config["DB.name"] || ""}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>)
}