import React from 'react'
import { TextField, Typography, Box, Divider, Grid, Button, Dialog, Slide, Card, CardContent } from '@mui/material';

import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../../../services/Translation";
import SettingsTable from '../../../../../components/SettingsTable';

/** TRANSITION FOR POPUP */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CONF_Anonym() {
    const theme = useTheme();
    const useStyles = makeStyles({
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important"
        },
        field: {
            width: '100%'
        },
        label: {
            fontSize: '14px !important',
        }

    });
    const classes = useStyles();

    /** HEADERS AND ROW FOR THE PROFILES TABLE */
    const headers = ['tag', 'description'];
    const rows = [
        { "row": ["", ""] },
        { "row": ["", ""] },
    ]

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
                <Typography variant="h5" style={{ color: theme.palette.primary.main }} > {t('anonymize_images')} </Typography>
                <Divider style={{ marginBottom: theme.spacing(2) }} />

                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item md={6} xs={12} >
                        <TextField style={{ width: '100%' }} id="filled-basic" label={t("value")} variant="standard" />
                    </Grid>
                    <Grid item xs />
                    <Grid item xs={12} >
                        <Button style={{ float: 'right' }} variant="contained" component="label" onClick={handleClickOpen}>+ {t('add')}</Button>
                    </Grid>
                </Grid>
                <SettingsTable headers={headers} rows={rows} actions/>

                {/* <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item md={4} xs={6} >
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_name")} />
                    </Grid>
                    <Grid item md={4} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_id")} />
                    </Grid>
                    <Grid item md={4} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_birthdate")} />
                    </Grid>

                    <Grid item md={4} xs={6} >
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_sex")} />
                    </Grid>
                    <Grid item md={4} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_birthname")} />
                    </Grid>
                    <Grid item md={4} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_age")} />
                    </Grid>

                    <Grid item md={4} xs={6} >
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_size")} />
                    </Grid>
                    <Grid item md={4} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_weight")} />
                    </Grid>
                    <Grid item md={4} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_address")} />
                    </Grid>

                    <Grid item md={4} xs={6} >
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("patients_mother_birthname")} />
                    </Grid>
                    <Grid item md={4} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("physicians_name")} />
                    </Grid>
                    <Grid item md={4} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("instituion_name")} />
                    </Grid>
                </Grid> */}

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
                                    <TextField className={classes.field} id="filled-basic" label={t("description")} variant="standard" />
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