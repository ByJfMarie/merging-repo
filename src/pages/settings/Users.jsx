import React from 'react';
import { Typography, Divider, Card, CardContent, TextField, Grid, Button, Dialog, Slide, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import SettingsTable from "../../components/SettingsTable";
import t from "../../services/Translation";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Users = () => {
    /** THEME */
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
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },

    });
    const classes = useStyles();

    /** HEADERS AND ROWS FOR THE TABLE */
    const headers = ["login", "name", "email", "role", "status"];
    const rows = [
        { "row": ["Admin", "Bruno Volant", "bruno@fix-it.be", "Administrator", "Active"] },
        { "row": ["Test", "Name Test", "test@fix-it.be", "Test", "Active"] },
    ];

    /** ROLE SELECT */
    const [addRole, setAddRole] = React.useState('');

    const handleChangeAddRole = (event) => {
        setAddRole(event.target.value);
    };

    /** ADD/EDIT POP UP */
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('users')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                <CardContent>

                    <Card style={{ width: "100% !important", marginBottom: '20px' }} className={classes.card} >
                        <CardContent style={{ display: "flex" }}>
                            <InfoOutlinedIcon sx={{ color: theme.palette.textfield.text, marginRight: '15px' }} />
                            <Typography style={{ color: theme.palette.textfield.text, textAlign: "left" }}>Informations concernant les paramètres utilisateurs</Typography>
                        </CardContent>
                    </Card>

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={4}>
                            <TextField className={classes.field} id="filled-basic" label={t("username/email")} variant="standard" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField className={classes.field} id="filled-basic" label={t("role")} variant="standard" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField style={{ width: '100%' }} id="filled-basic" label={t("status")} variant="standard" />
                        </Grid>

                        <Grid item xs />

                        <Grid item >
                            <Button variant="contained" component="label" onClick={handleClickOpen}>+ {t('add')}</Button>
                        </Grid>
                    </Grid>

                    <SettingsTable headers={headers} rows={rows} actions />
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
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("username")} variant="standard" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("name")} variant="standard" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("email")} variant="standard" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.field} variant="standard">
                                    <InputLabel id="demo-simple-select-standard-label">{t("role")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={addRole}
                                        onChange={handleChangeAddRole}
                                        label="Age"
                                    >
                                        <MenuItem value={10}>{t('administrator')}</MenuItem>
                                        <MenuItem value={20}>{t('doctor')}</MenuItem>
                                        <MenuItem value={20}>{t('radiologist')}</MenuItem>
                                        <MenuItem value={30}>{t('patient')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.field} id="filled-basic" label={t("email")} variant="standard" />
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

        </React.Fragment>
    )
}
export default Users