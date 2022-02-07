import * as React from 'react';
import { Card, CardContent, TextField, Typography, FormGroup, FormControlLabel, Checkbox, Button, Slide, Dialog, DialogActions, DialogContent, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import SettingsTable from '../../../components/SettingsTable';
import t from "../../../services/Translation";

import MbOutputDevice from './MediaBurner/MB_OutputDevice';
import MbProduction from './MediaBurner/MB_Production';
import MbProfile from './MediaBurner/MB_Profile';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MediaBurner() {
    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%'
        },
        card: {
            "&.MuiCard-root": {
                padding: '0px !important'
            }
        },
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },

    });
    const classes = useStyles();

    /** HEADERS AND ROW FOR THE PRODUCTION TABLE */
    const headersProduction = ['name', 'criteria', 'profile', 'trigger'];
    const rowsProduction = [    
        { "row": ["All", "Any SCP", "Test 1", "Wait for report"] },
        { "row": ["My Queue", "PACS", "Test 1", "Queue"] },
    ]
    /** HEADERS AND ROW FOR THE PROFILES TABLE */
    const headersProfiles = ['name', 'scu/scp', 'status'];
    const rowsProfiles = [
        { "row": ["(default)", "All", "Active"] },
        { "row": ["Test", "PACS", ""] },
    ]
    /** HEADERS AND ROW FOR THE OUTPUT TABLE */
    const headersOutput = ['name', 'type', 'status'];
    const rowsOutput = [
        { "row": ["Rimage", "Rimage", "Active"] },
        { "row": ["Epson", "Epson", "Active"] },
    ]

    /** ADD/EDIT OUTPUT DEVICE */
    /** FIRST DIALOG POPUP */
    const [scroll] = React.useState('paper');

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    /** SECOND DIALOG POPUP */
    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    /** THIRD DIALOG POPUP */
    const [open3, setOpen3] = React.useState(false);

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };


    return (
        <>
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '25px 0px' }}>
                <CardContent>
                    <FormGroup style={{ marginBottom: '10px' }}>
                        <FormControlLabel control={<Checkbox />} label={t("enable_unattended_mode")} />
                    </FormGroup>
                    <TextField style={{ maxWidth: '300px', marginBottom: '15px' }} id="filled-basic" label={t("scan_interval")} variant="standard" />
                    <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '15px' }}>
                        <Typography variant="h6"> {t('production_rules')} </Typography>
                        <Button variant="contained" component="label" onClick={handleClickOpen1}>+ {t('add')}</Button>
                    </div>
                    <SettingsTable headers={headersProduction} rows={rowsProduction} actions />
                </CardContent>
            </Card>

            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '25px 0px' }}>
                <CardContent>
                    <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '15px' }}>
                        <Typography variant="h6" style={{ textAlign: 'left' }} > {t('profiles')} </Typography>
                        <Button variant="contained" component="label" onClick={handleClickOpen2}>+ {t('add')}</Button>
                    </div>
                    <SettingsTable headers={headersProfiles} rows={rowsProfiles} actions />
                </CardContent>
            </Card>

            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '25px 0px' }}>
                <CardContent>
                    <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '15px' }}>
                        <Typography variant="h6" style={{ textAlign: 'left' }} > {t('output_devices')} </Typography>
                        <Button variant="contained" component="label" onClick={handleClickOpen3}>+ {t('add')}</Button>
                    </div>
                    <SettingsTable headers={headersOutput} rows={rowsOutput} actions />
                </CardContent>
            </Card>

            {/* DIALOG 1  */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open1}
                onClose={handleClose1}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <MbProduction />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>

                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose1}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

            {/* DIALOG 2  */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open2}
                onClose={handleClose2}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <MbProfile />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>
                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose2}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

            {/* DIALOG 3 */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open3}
                onClose={handleClose3}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <MbOutputDevice />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>
                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose3}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>)
}

