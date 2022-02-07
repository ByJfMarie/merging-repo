import React from 'react'
import { Card, CardContent, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Button, Box, Divider, Dialog, Slide } from '@mui/material';

import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../../services/Translation";
import SettingsTable from '../../../../components/SettingsTable'

/** TRANSITION FOR POPUP */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MB_Production() {
    const theme = useTheme();
    const useStyles = makeStyles({
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },
        field: {
            width: '100%'
        },

    });
    const classes = useStyles();

    /** HEADERS AND ROW FOR THE TABLE */
    const headers = ["tag_path", "operator", "value", ""];
    const rows = [
        { "row": ['[0010,0020] - Patient Name', "contains", "Eric Demotte"] },
    ];

    /** ADD/EDIT POP UP */
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box style={{ backgroundColor: theme.palette.dialog.color, width: "100% !important" }}>
                <Typography variant="h5" style={{ color: theme.palette.primary.main }} > {t('general')} </Typography>
                <Divider style={{ marginBottom: theme.spacing(2) }} />

                <TextField style={{ width: '100%', marginBottom: '10px' }} id="filled-basic" label={t("name")} variant="standard" />
                <FormControl style={{ width: "100%", marginBottom: '10px' }} variant="standard">
                    <InputLabel id="print_selection">{t('trigger')}</InputLabel>
                    <Select
                        labelId="print_selection"
                        id="print_selection"
                        label="Print Selection"
                        variant='standard'
                    >
                        <MenuItem value={10}>Wait for report</MenuItem>
                        <MenuItem value={20}>Queue</MenuItem>
                        <MenuItem value={30}>None</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ width: "100%", marginBottom: '10px' }} variant="standard">
                    <InputLabel id="print_selection">{t('profile')}</InputLabel>
                    <Select
                        labelId="print_selection"
                        id="print_selection"
                        label="Print Selection"
                        variant='standard'
                    >
                        <MenuItem value={10}>Profile Test</MenuItem>
                        <MenuItem value={20}>Profile 2</MenuItem>
                        <MenuItem value={30}>Profile 3</MenuItem>
                    </Select>
                </FormControl>

                <TextField style={{ width: '100%', marginBottom: '40px' }} id="filled-basic" label={t("latency_time")} variant="standard" />

                <Typography variant="h5" style={{ color: theme.palette.primary.main }} > {t('criteria')} </Typography>
                <Divider style={{ marginBottom: theme.spacing(2) }} />

                <TextField style={{ width: '100%', marginBottom: '10px' }} id="filled-basic" label={t("calling_aet")} variant="standard" />
                <TextField style={{ width: '100%', marginBottom: '10px' }} id="filled-basic" label={t("called_aet")} variant="standard" />

                <Grid container style={{ marginBottom: '15px' }}>
                    <Grid item className={classes.userNameGrid}>
                        <Typography variant="h6" style={{ textAlign: 'left', marginTop: '35px' }} > {t('custom')} </Typography>
                    </Grid>

                    <Grid item xs />

                    <Grid item className={classes.userNameGrid}>
                        <Button variant="contained" component="label" style={{ marginTop: '35px' }} onClick={handleClickOpen}>+ {t('add')}</Button><br />
                    </Grid>
                </Grid>
                <SettingsTable headers={headers} rows={rows} actions />
            </Box>

            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                    <CardContent>

                        <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("tag_path")} variant="standard" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("operator")} variant="standard" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("value")} variant="standard" />
                            </Grid>

                            <Grid item xs />

                            <Grid item >
                                <Button className={classes.button} variant="contained" component="label" onClick={handleClose}>{t('cancel')}</Button>
                            </Grid>

                            <Grid item >
                                <Button variant="contained" component="label">{t('save')}</Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Dialog>

        </>
    )
}