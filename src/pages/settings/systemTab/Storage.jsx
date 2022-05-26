
import { Card, CardContent, TextField, Grid, FormGroup, FormControlLabel, Checkbox, Stack, Container, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";
import * as React from "react";
import SettingsService from "../../../services/api/settings.service";

export default function Storage() {
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

        gap: {
            paddingLeft: "200px !important",
            marginBottom: '15px',
            display: " flex",
            flexDirection: 'column',

            [theme.breakpoints.down('sm')]: {
                padding: '24px !important',
            },
        },


    });
    const classes = useStyles();

    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async() => {
        const response = await SettingsService.getStorage();

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        setSettingsValue(response.items);
    }

    React.useEffect(() => {
        refreshSettings();
    }, []);

    return (
        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <Container maxWidth="sm" style={{ marginLeft: "0px", marginBottom: '15px', paddingLeft : "0px" }}>
                    <Grid container rowSpacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12} >
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("storage_path")}
                                variant="standard"
                                value={settingsValue['DCMS.storage_folder'] || ''}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("secondary_path")}
                                variant="standard"
                                value={settingsValue['DCMS.storage_folder_secondary'] || ''}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs="auto">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={settingsValue['SDS.keep_images']==='true' || false} />}
                                            label={t("keep_images_for")}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs="auto">
                                    <TextField
                                        style={{ width: '50px' }}
                                        id="filled-basic"
                                        variant="standard"
                                        value={settingsValue['SDS.keep_images_retention'] || ''}
                                    />
                                </Grid>
                                <Grid item xs="auto">
                                    <Typography style={{ marginLeft: '10px' ,marginTop: '8px' }}>{t("days")}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={settingsValue['SDS.use_treshold']==='true' || false} />}
                                    label={t("capacity_treshold")}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid container direction="row-reverse" rowSpacing={2} style={{ marginBottom: '15px' }}>
                            <Grid item xs={11} >
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("maximum")}
                                    variant="standard"
                                    value={settingsValue['SDS.clean_auto_treshold'] || ''}
                                />
                            </Grid>
                            <Grid item xs={11} >
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("drop_to")}
                                    variant="standard"
                                    value={settingsValue['SDS.clean_auto_treshold_target'] || ''}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </CardContent>
        </Card>)
}