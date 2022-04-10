import { Switch, Container, FormControlLabel, Link, Select, MenuItem, Grid, Card, CardContent, Typography, Divider, Chip, TextField, Dialog, Slide, DialogContent, DialogActions, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import t from "../services/Translation.jsx"
import { useTheme } from '@emotion/react';
import React, { useState } from 'react';
import Masonry from "react-masonry-css";
import MultiSelect from '../components/MultiSelect';
import ChangePassword from "./settings/ChangePassword.jsx";
import AuthService from "../services/api/auth.service";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Settings(props) {
    const priviledges = AuthService.getCurrentUser().priviledges;

    const breakpoints = {
        default: 1,
            1400: 1,
            700: 1
    }

    const theme = useTheme();

    const [dateFormat, setDateFormat] = useState(localStorage.getItem('dateFormat') !== null ? localStorage.getItem('dateFormat') : "dd/MM/yyyy")

    const useStyles = makeStyles({

        settingCard: {
            backgroundColor: theme.palette.card.color + " !important"
        },

        textfield: {
            margin: "10px 0px !important",
        },
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },
    });
    const classes = useStyles();

    const handleChange = (e) => {
        props.themeChange(e.target.checked ? "dark" : "light")
        localStorage.setItem("theme", e.target.checked ? "dark" : "light")
    }

    const handleLanguage = (e) => {
        localStorage.setItem("language", e.target.value)
        props.languageChange(e.target.value)
    }

    const handleDateFormat = (e) => {
        setDateFormat(e.target.value)
        localStorage.setItem("dateFormat", e.target.value)
    }

    /** CHANGE PASSWORD POP UP */
    const [scroll] = React.useState('paper');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /** DRAG N DROP */
    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('profile')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Container maxWidth={false} style={{ padding: 0 }}>

                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">

                    <Card className={classes.settingCard}>
                        <CardContent>

                            <Typography variant="h6" align="left"> {t('general')} </Typography>
                            <Divider style={{ marginBottom: theme.spacing(2) }} />

                            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                                <Grid item xs={4}>
                                    <Chip label={t('theme')} style={{ backgroundColor: theme.palette.chip.background }} />
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <FormControlLabel
                                        control={<Switch onChange={handleChange}
                                            defaultChecked={localStorage.getItem('theme') === "dark" ? true : false} />}
                                        label={t("dark_mode")} />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{ marginBottom: "20px" }} >
                                <Grid item xs={4}>
                                    <Chip label={t('language')} style={{ backgroundColor: theme.palette.chip.background }}/>
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <Select
                                        value={localStorage.getItem('language') !== null ? localStorage.getItem('language') : "en"}
                                        label="Language"
                                        onChange={handleLanguage}
                                    >
                                        <MenuItem value={"fr"}>Français</MenuItem>
                                        <MenuItem value={"en"}>English</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} >
                                <Grid item xs={4}>
                                    <Chip label={t('format')} style={{ backgroundColor: theme.palette.chip.background }} />
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <Select
                                        value={dateFormat}
                                        label={t('dateFormat')}
                                        onChange={handleDateFormat}
                                    >
                                        <MenuItem value={"dd/MM/yyyy"}>dd/MM/yyyy</MenuItem>
                                        <MenuItem value={"MM/dd/yyyy"}>MM/dd/yyyy</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{ marginTop: "0px", paddingTop: "0px !important" }} >
                                <Grid item xs={12} md={6}>
                                    <TextField className={classes.textfield} id="name" fullWidth label={t('name')} variant="standard" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField className={classes.textfield} id="email" fullWidth label={t('email')} variant="standard" />
                                </Grid>
                            </Grid>
                            <Link onClick={handleClickOpen} >{t('change_password')}</Link>

                        </CardContent>
                    </Card>

                    <Card className={classes.settingCard}>
                        <CardContent>
                            <Typography variant="h6" align="left"> {t('studies')} </Typography>
                            <Divider style={{ marginBottom: theme.spacing(2) }} />

                            <Grid container spacing={2} style={{ marginBottom: "50px" }}>
                                <Grid item xs={3}>
                                    <Chip label={t('filters')} style={{ backgroundColor: theme.palette.chip.background }}/>
                                </Grid>

                                <Grid item xs={9}>
                                    <Grid container style={{
                                        flexDirection: 'column',
                                        color: '#333'
                                    }}>
                                        <MultiSelect {...priviledges} page="studies" />

                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Chip label={t('dates')} style={{ backgroundColor: theme.palette.chip.background }}/>
                                </Grid>

                                <Grid item xs={9}>
                                    <Grid container style={{
                                        flexDirection: 'row'
                                    }}>
                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("all")} />}
                                            label={t("all")}
                                        />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("today")} />}
                                            label={t("today")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("yesterday")} />}
                                            label={t("yesterday")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("last_month")} />}
                                            label={t("last_month")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("last_year")} />}
                                            label={t("last_year")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("last_3days")} />}
                                            label={t("last_3days")} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {Object.keys(priviledges.privileges.pages).includes('aet') && (<Card className={classes.settingCard}>
                        <CardContent>

                            <Typography variant="h6" align="left"> {t('remote_aet')} </Typography>
                            <Divider style={{ marginBottom: theme.spacing(2) }} />

                            <Grid container spacing={2} style={{ marginBottom: "50px" }}>
                                <Grid item xs={3}>
                                    <Chip label={t('filters')} style={{ backgroundColor: theme.palette.chip.background }}/>
                                </Grid>

                                <Grid item xs={9}>

                                    <Grid container style={{
                                        flexDirection: 'column',
                                        color: '#333'
                                    }}>
                                        <MultiSelect page="aet" />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Chip label={t('dates')} style={{ backgroundColor: theme.palette.chip.background }}/>
                                </Grid>

                                <Grid item xs={9}>
                                    <Grid container style={{
                                        flexDirection: 'row'
                                    }}>
                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("all")} />}
                                            label={t("all")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("today")} />}
                                            label={t("today")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("yesterday")} />}
                                            label={t("yesterday")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("last_month")} />}
                                            label={t("last_month")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("last_year")} />}
                                            label={t("last_year")} />

                                        <FormControlLabel
                                            control={<Switch onChange={() => console.log("last_3days")} />}
                                            label={t("last_3days")} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>)}
                </Masonry>
            </Container >

            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <ChangePassword />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>

                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </React.Fragment >

    )
}
export default Settings