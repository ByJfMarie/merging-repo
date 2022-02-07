import React from 'react';
import { Card, CardContent, FormGroup, FormControlLabel, TextField, Checkbox, Button, Grid, Dialog, Slide } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";
import SettingsTable from '../../../components/SettingsTable';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RemoteAET() {
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
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },

    });
    const classes = useStyles();

    /** HEADERS AND ROWS FOR THE TABLE */
    const headers = ["aet", "ip", "port", "capabilities", "description"];
    const rows = [
        { "row": ["TEST", "localhost", "104", "Query | Retrieve | Forward", "AET de test"] },
        { "row": ["", "", "", "", ""] },
        { "row": ["", "", "", "", ""] },
        { "row": ["", "", "", "", ""] },
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
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }}>
                <CardContent>
                    <Grid container style={{ marginBottom: '15px' }}>
                        <Grid item className={classes.userNameGrid}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label={t("allow_all_remote_server")} />
                            </FormGroup>
                        </Grid>

                        <Grid item xs />

                        <Grid item className={classes.userNameGrid}>
                            <Button variant="contained" component="label" onClick={handleClickOpen}>+ Add</Button><br />
                        </Grid>
                    </Grid>

                    <SettingsTable headers={headers} rows={rows} actions/>
                </CardContent>
            </Card>

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
                            <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                <TextField className={classes.field} id="filled-basic" label={t("aet")} variant="standard" />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                <TextField className={classes.field} id="filled-basic" label={t("ip")} variant="standard" />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                <TextField className={classes.field} id="filled-basic" label={t("port")} variant="standard" />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                <TextField className={classes.field} id="filled-basic" label={t("capabilities")} variant="standard" />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                <TextField className={classes.field} id="filled-basic" label={t("description")} variant="standard" />
                            </Grid>

                            <Grid item xs />

                            <Grid item >
                                <Button variant="contained" className={classes.button} component="label" onClick={handleClose}>{t('cancel')}</Button>
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