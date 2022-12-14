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
    Alert, Snackbar, Box
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useTheme} from '@emotion/react';
import React from 'react';
import Masonry from "react-masonry-css";
import MultiSelect from '../components/MultiSelect';
import ChangePassword from "./settings/ChangePassword.jsx";
import Index from "../layouts/settings/actions";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/** Translation */
import { useTranslation } from 'react-i18next';

import UsersService from "../services/api/users.service";
import UserStorage from "../services/storage/user.storage";
import UserContext from "../components/UserContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Settings(props) {
    const { t } = useTranslation('common');

    /** User & privileges */
    const { user, privileges, settings } = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentSettings, setCurrentSettings] = React.useState(null);

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
            color: theme.palette.text.secondary,
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
    const getSettingsValue = (id) => {
        if (!currentSettings) return '';
        return currentSettings[id] || '';
    }
    const handleSettingsChange = (id, value) => {
        if (!currentSettings) return '';
        setCurrentSettings({...currentSettings, [id]: value});
        if (id === 'theme') props.themeChange(value);
        if (id === 'language') props.languageChange(value);
    }
    const handleSaveSettings = async () => {
        let response = await UsersService.updateSettings(currentSettings);

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
            .then((rsp) => {
                setCurrentSettings(rsp);
                setMessage({
                    ...message,
                    show: true,
                    severity: "success",
                    message: "Settings successfully updated!"
                });
            });
    };
    const handleCancelSettings = () => {
        setCurrentSettings(settings);

        UserStorage.getSettings()
            .then((rsp) => {
                props.themeChange(rsp.theme);
                props.languageChange(rsp.language);
            });
    };

    /** User Profile */
    const getUserValue = (id) => {
        if (!currentUser) return '';
        return currentUser[id] || '';
    }
    const handleUserChange = (id, value) => {
        if (!currentUser) return;
        setCurrentUser({...currentUser, [id]:value});
    }
    const handleSaveUser = async () => {
        let response = await UsersService.update(currentUser);

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
            .then(rsp => {
                setCurrentUser(rsp);

                setMessage({
                    ...message,
                    show: true,
                    severity: "success",
                    message: "Profile successfully updated!"
                });
            });
    };
    const handleCancelUser = () => {
        setCurrentUser(user);
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
                message: t("msg_error.reset_password", {error: response.error})
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
        setCurrentUser(user);
    }, [user]);

    React.useEffect(() => {
        setCurrentSettings(settings);
    }, [settings]);

    /** DRAG N DROP */
    return (
        <React.Fragment>

            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <AccountCircleIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.profile')}
                </Grid>
            </Typography>

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
                            <Typography variant="h6" align="left"> {t('titles.user')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="login"
                                        fullWidth
                                        label={t('fields.login')}
                                        variant="standard"
                                        value={getUserValue('login')}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        fullWidth
                                        label={t('fields.name')}
                                        variant="standard"
                                        value={getUserValue('first_name')}
                                        onChange={(e) => handleUserChange('first_name', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        label={t('fields.mail')}
                                        variant="standard"
                                        value={getUserValue('mail')}
                                        onChange={(e) => handleUserChange('mail', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Link onClick={handleClickOpen}>{t('buttons.change_password')}</Link>
                                </Grid>
                            </Grid>
                            <Index 
                                handleSave={handleSaveUser}
                                handleCancel={handleCancelUser}
                            />
                        </CardContent>
                    </Card>

                    <Card className={classes.settingCard}>
                        <CardContent>

                            <Typography variant="h6" align="left"> {t('titles.general')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={4}>
                                    <Chip label={t('fields.theme')}  style={{backgroundColor: "#2db4eb", color:"white"}}/>
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                onChange={(e) => {
                                                    handleSettingsChange('theme', e.target.checked ? "dark" : "light")
                                                    props.setDarkToggle(!props.darkToggle)
                                                }}
                                                checked={getSettingsValue('theme') === "dark" ? true : false}
                                            />
                                        }
                                        label={t("fields.dark_mode")}/>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={4}>
                                    <Chip label={t('fields.language')}
                                          style={{backgroundColor: "#2db4eb", color:"white"}}/>
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <Select
                                        value={getSettingsValue('language') || "en"}
                                        label="Language"
                                        onChange={(e) => {
                                            handleSettingsChange('language', e.target.value)
                                        }}
                                    >
                                        <MenuItem value={"fr"}>{t("fields.language_value.fr")}</MenuItem>
                                        <MenuItem value={"en"}>{t("fields.language_value.en")}</MenuItem>
                                        <MenuItem value={"es"}>{t("fields.language_value.es")}</MenuItem>
                                        <MenuItem value={"he"}>{t("fields.language_value.he")}</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Chip label={t('fields.format')}style={{backgroundColor: "#2db4eb", color:"white"}}/>
                                </Grid>

                                <Grid item xs={8} align="left">
                                    <Select
                                        value={getSettingsValue('date_format')}
                                        label={t('fields.dateFormat')}
                                        onChange={(e) => {
                                            handleSettingsChange('date_format', e.target.value)
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
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

                            <Typography variant="h6" align="left"> {t('titles.studies')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "50px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.filters')}
                                          style={{backgroundColor: "#2db4eb", color:"white"}}/>
                                </Grid>

                                <Grid item xs={9}>
                                    <Grid container style={{
                                        flexDirection: 'column',
                                        color: '#333'
                                    }}>
                                        <MultiSelect
                                            page="studies"
                                            fields={["patient_id", "patient_name", "accession_number", "description", "referring_physician", "modality", "birthdate"]}
                                            selection={currentSettings?currentSettings.filters_studies_primary:[]}
                                            setSelection={(value) => handleSettingsChange("filters_studies_primary", value)}
                                        />

                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.dates')} style={{backgroundColor: "#2db4eb", color:"white"}}/>
                                </Grid>

                                <Grid item xs={9}>
                                    <Grid container style={{
                                        flexDirection: 'column',
                                        color: '#333'
                                    }}>
                                        <MultiSelect
                                            page="studies"
                                            fields={["all", "today", "yesterday", "last_3days", "last_week", "last_month", "last_year"]}
                                            selection={currentSettings?currentSettings.filters_studies_date_presets:[]}
                                            setSelection={(value) => handleSettingsChange("filters_studies_date_presets", value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {privileges.pages.includes('aet') && (
                                <>
                                    <Box sx={{ mt: 5 }} />

                                    <Typography variant="h6" align="left"> {t('titles.remote_aet')} </Typography>
                                    <Divider style={{marginBottom: theme.spacing(2)}}/>

                                    <Grid container spacing={2} style={{marginBottom: "50px"}}>
                                        <Grid item xs={3}>
                                            <Chip label={t('fields.filters')}
                                                  style={{backgroundColor: "#2db4eb", color:"white"}}/>
                                        </Grid>

                                        <Grid item xs={9}>

                                            <Grid container style={{
                                                flexDirection: 'column',
                                                color: '#333'
                                            }}>
                                                <MultiSelect
                                                    page="aet"
                                                    fields={["patient_id", "patient_name", "accession_number", "description", "referring_physician", "modality", "birthdate"]}
                                                    selection={currentSettings?currentSettings.filters_aets_primary:[]}
                                                    setSelection={(value) => handleSettingsChange("filters_aets_primary", value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Chip label={t('fields.dates')}
                                                  style={{backgroundColor: "#2db4eb", color:"white"}}/>
                                        </Grid>

                                        <Grid item xs={9}>
                                            <Grid container style={{
                                                flexDirection: 'column',
                                                color: '#333'
                                            }}>
                                                <MultiSelect
                                                    page="studies"
                                                    fields={["all", "today", "yesterday", "last_3days", "last_week", "last_month", "last_year"]}
                                                    selection={currentSettings?currentSettings.filters_aets_date_presets:[]}
                                                    setSelection={(value) => handleSettingsChange("filters_aets_date_presets", value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                            <Index
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
                    <Index 
                        labelReset={t('buttons.cancel')}
                        handleSave={handleSavePassword}
                        handleCancel={handleCancelPassword}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}

export default Settings