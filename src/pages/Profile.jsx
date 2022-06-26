import {
    Switch,
    Container,
    FormControlLabel,
    Link,
    Select,
    MenuItem,
    Grid,
    Card,
    CardContent,
    Typography,
    Divider,
    Chip,
    TextField,
    Dialog,
    Slide,
    DialogContent,
    DialogActions,
    Button,
    Alert, Snackbar, Box
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import t from "../services/Translation.jsx"
import {useTheme} from '@emotion/react';
import React, {useState} from 'react';
import Masonry from "react-masonry-css";
import MultiSelect from '../components/MultiSelect';
import ChangePassword from "./settings/ChangePassword.jsx";
import ResetSave from "../components/settings/ResetSave";

import UsersService from "../services/api/users.service";
import UserStorage from "../services/storage/user.storage";
import UserContext from "../components/UserContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Settings(props) {

    const { privileges } = React.useContext(UserContext);

    const breakpoints = {
        default: 1,
        1400: 1,
        700: 1
    }

    const theme = useTheme();

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

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    /** User Settings */
    const [settings, setSettings] = React.useState({});
    const getSettingsValue = (id) => {
        if (!settings) return '';
        return settings[id] || '';
    }
    const handleSettingsChange = (id, value) => {
        if (!settings) return '';
        setSettings({...settings, [id]: value});
        if (id === 'theme') props.themeChange(value);
    }
    const handleSaveSettings = async () => {
        let response = await UsersService.updateSettings(settings);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        UserStorage.removeUserSettings();
        UserStorage.getSettings()
            .then((set) => {
                setSettings(set);
                setMessage({
                    ...message,
                    show: true,
                    severity: "success",
                    message: "Settings successfully updated!"
                });
            });
    };
    const handleCancelSettings = () => {
        setSettings(UserStorage.getSettings());
        props.themeChange(UserStorage.getSettings().theme);
    };

    /** User Profile */
    const [user, setUser] = React.useState({});
    const getUserValue = (id) => {
        if (!user) return '';
        return user[id] || '';
    }
    const handleUserChange = (id, value) => {
        if (!user) return;
        setUser({...user, [id]: value});
    }
    const handleSaveUser = async () => {
        let response = await UsersService.update(user);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        UserStorage.removeUserProfile();
        UserStorage.getUser()
            .then(rps => {
                setUser(rps);

                setMessage({
                    ...message,
                    show: true,
                    severity: "success",
                    message: "Profile successfully updated!"
                });
            });
    };
    const handleCancelUser = () => {
        setUser(UserStorage.getUser());
    };

    /** CHANGE PASSWORD */
    const [scroll] = React.useState('paper');
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [password, setPassword] = React.useState({});
    const handleSavePassword = async () => {
        let response = await UsersService.changePassword(password);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        setOpen(false);
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Password successfully updated!"
        });
    }
    const handleCancelPassword = () => {
        setOpen(false);
        setPassword({});
    };

    React.useEffect(() => {
        UserStorage.getSettings()
            .then(settings => {
                setSettings(settings);
            })

        setUser(UserStorage.getUser());
    }, []);

    /** DRAG N DROP */
    return (
        <React.Fragment>
            <Typography variant="h4"
                        style={{textAlign: 'left', color: theme.palette.primary.main}}> {t('profile')} </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={() => {
                          setMessage({...message, show: !message.show})
                      }}>
                <Alert onClose={() => {
                    setMessage({...message, show: !message.show})
                }} severity={message.severity} sx={{width: '100%'}}>
                    {message.message}
                </Alert>
            </Snackbar>

            <Container maxWidth={false} style={{padding: 0}}>

                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">

                    <Card className={classes.settingCard}>
                        <CardContent>
                            <Typography variant="h6" align="left"> {t('user')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        fullWidth
                                        label={t('name')}
                                        variant="standard"
                                        value={getUserValue('first_name')}
                                        onChange={(e) => handleUserChange('first_name', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        label={t('email')}
                                        variant="standard"
                                        value={getUserValue('mail')}
                                        onChange={(e) => handleUserChange('mail', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Link onClick={handleClickOpen}>{t('change_password')}</Link>
                                </Grid>
                            </Grid>
                            <ResetSave
                                handleSave={handleSaveUser}
                                handleCancel={handleCancelUser}
                            />
                        </CardContent>
                    </Card>

                    <Card className={classes.settingCard}>
                        <CardContent>

                            <Typography variant="h6" align="left"> {t('general')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={4}>
                                    <Chip label={t('theme')} style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                onChange={(e) => {
                                                    handleSettingsChange('theme', e.target.checked ? "dark" : "light")
                                                }}
                                                checked={getSettingsValue('theme') === "dark" ? true : false}
                                            />
                                        }
                                        label={t("dark_mode")}/>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={4}>
                                    <Chip label={t('language')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <Select
                                        value={getSettingsValue('language') || "en"}
                                        label="Language"
                                        onChange={(e) => {
                                            handleSettingsChange('language', e.target.value)
                                        }}
                                    >
                                        <MenuItem value={"fr"}>Français</MenuItem>
                                        <MenuItem value={"en"}>English</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Chip label={t('format')} style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <Select
                                        value={getSettingsValue('date_format')}
                                        label={t('dateFormat')}
                                        onChange={(e) => {
                                            handleSettingsChange('date_format', e.target.value)
                                        }}
                                    >
                                        <MenuItem value={"dd/MM/yyyy"}>dd/MM/yyyy</MenuItem>
                                        <MenuItem value={"dd.MM.yyyy"}>dd.MM.yyyy</MenuItem>
                                        <MenuItem value={"dd-MM-yyyy"}>dd-MM-yyyy</MenuItem>
                                        <MenuItem value={"MM/dd/yyyy"}>MM/dd/yyyy</MenuItem>
                                        <MenuItem value={"MM.dd.yyyy"}>MM.dd.yyyy</MenuItem>
                                        <MenuItem value={"MM-dd-yyyy"}>MM-dd-yyyy</MenuItem>
                                        <MenuItem value={"yyyy/MM/dd"}>yyyy/MM/dd</MenuItem>
                                        <MenuItem value={"yyyy.MM.dd"}>yyyy.MM.dd</MenuItem>
                                        <MenuItem value={"yyyy-MM-dd"}>yyyy-MM-dd</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 5 }} />

                            <Typography variant="h6" align="left"> {t('studies')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "50px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('filters')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={9}>
                                    <Grid container style={{
                                        flexDirection: 'column',
                                        color: '#333'
                                    }}>
                                        <MultiSelect
                                            page="studies"
                                            fields={["patient_id", "patient_name", "accession_number", "description", "referring_physician", "modality", "birthdate"]}
                                            selection={settings.filters_studies_primary}
                                            setSelection={(value) => handleSettingsChange("filters_studies_primary", value)}
                                        />

                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Chip label={t('dates')} style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={9}>
                                    <Grid container style={{
                                        flexDirection: 'column',
                                        color: '#333'
                                    }}>
                                        <MultiSelect
                                            page="studies"
                                            fields={["all", "today", "yesterday", "last_3days", "last_week", "last_month", "last_year"]}
                                            selection={settings.filters_studies_date_presets}
                                            setSelection={(value) => handleSettingsChange("filters_studies_date_presets", value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {privileges.pages.includes('aet') && (
                                <>
                                    <Box sx={{ mt: 5 }} />

                                    <Typography variant="h6" align="left"> {t('remote_aet')} </Typography>
                                    <Divider style={{marginBottom: theme.spacing(2)}}/>

                                    <Grid container spacing={2} style={{marginBottom: "50px"}}>
                                        <Grid item xs={3}>
                                            <Chip label={t('filters')}
                                                  style={{backgroundColor: theme.palette.chip.background}}/>
                                        </Grid>

                                        <Grid item xs={9}>

                                            <Grid container style={{
                                                flexDirection: 'column',
                                                color: '#333'
                                            }}>
                                                <MultiSelect
                                                    page="aet"
                                                    fields={["patient_id", "patient_name", "accession_number", "description", "referring_physician", "modality", "birthdate"]}
                                                    selection={settings.filters_aets_primary}
                                                    setSelection={(value) => handleSettingsChange("filters_aets_primary", value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Chip label={t('dates')}
                                                  style={{backgroundColor: theme.palette.chip.background}}/>
                                        </Grid>

                                        <Grid item xs={9}>
                                            <Grid container style={{
                                                flexDirection: 'column',
                                                color: '#333'
                                            }}>
                                                <MultiSelect
                                                    page="studies"
                                                    fields={["all", "today", "yesterday", "last_3days", "last_week", "last_month", "last_year"]}
                                                    selection={settings.filters_aets_date_presets}
                                                    setSelection={(value) => handleSettingsChange("filters_aets_date_presets", value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                            <ResetSave
                                handleSave={handleSaveSettings}
                                handleCancel={handleCancelSettings}
                        />
                        </CardContent>
                    </Card>
                </Masonry>
            </Container>

            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={handleCancelPassword}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{backgroundColor: theme.palette.dialog.color}}>
                    <ChangePassword
                        password={password}
                        setPassword={setPassword}
                    />
                </DialogContent>
                <DialogActions style={{backgroundColor: theme.palette.dialog.color}}>
                    <ResetSave
                        labelReset={t('cancel')}
                        handleSave={handleSavePassword}
                        handleCancel={handleCancelPassword}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}

export default Settings