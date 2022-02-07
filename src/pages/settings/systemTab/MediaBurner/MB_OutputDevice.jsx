import React from 'react'
import { TextField, Typography, FormControlLabel, FormControl, FormGroup, Checkbox, InputLabel, Select, MenuItem, Box, Grid, Button, Dialog, Card, CardContent, Slide } from '@mui/material';

import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../../services/Translation";
import SettingsTable from '../../../../components/SettingsTable'
import EditableTable from "../../../../components/EditableTable";

/** TRANSITION FOR POPUP */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;  
});

export default function MB_OutputDevice() {
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

    const headersExtra = ['name', 'value'];

    const createData = (name, value) => ({
        id: name.replace(" ", "_"),
        name,
        value,
        isEditMode: false
    });

    const [rowsExtra] = React.useState([
        createData("Host", "localhost"),
        createData("Port", "4664"),
        createData("PerfectPrint", "true"),
        createData("PerfectPrintAngle", "0")
    ]);

    /** HEADERS & ROWS FOR MEDIAS TABLE */
    const headersMedias = ["name", "capacity", "status"];
    const rowsMedias = [
        { "row": ['CD', "660", "enabled" ] },
        { "row": ['DVDR', "4000", "disabled" ] },
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
                <FormControl style={{ width: "100%" }} variant="standard">
                    <InputLabel id="print_selection">Type</InputLabel>
                    <Select
                        labelId="print_selection"
                        id="print_selection"
                        label="Print Selection"
                        variant='standard'
                    >
                        <MenuItem value={10}>Virtual</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <TextField style={{ width: '100%' }} id="filled-basic" label={t("name")} variant="standard" />
                <TextField style={{ width: '100%' }} id="filled-basic" label={t("buffer")} variant="standard" />

                <FormGroup style={{ marginTop: '25px', marginBottom: '25px' }}>
                    <FormControlLabel control={<Checkbox />} label={t("keep_jobs_in_buffer")} />
                    <FormControlLabel control={<Checkbox />} label={t("use_symbolic_links")} />
                </FormGroup>

                <Typography variant="h6" style={{ textAlign: 'left', marginBottom: '10px' }} > {t('extra_parameters')} </Typography>
                <EditableTable headers={headersExtra} rows={rowsExtra} actions />

                <Grid container style={{ marginBottom: '15px' }}>
                    <Grid item className={classes.userNameGrid}>
                        <Typography variant="h6" style={{ textAlign: 'left', marginTop: '25px', marginBottom: '10px' }} > {t('medias')} </Typography>
                    </Grid>

                    <Grid item xs />

                    <Grid item className={classes.userNameGrid}>
                        <Button variant="contained" component="label" style={{ marginTop: '35px' }} onClick={handleClickOpen}>+ {t('add')}</Button><br />
                    </Grid>
                </Grid>
                <SettingsTable headers={headersMedias} rows={rowsMedias} actions />
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
                                <TextField className={classes.field} id="filled-basic" label={t("name")} variant="standard" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("capacity")} variant="standard" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("status")} variant="standard" />
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
        </>)
}