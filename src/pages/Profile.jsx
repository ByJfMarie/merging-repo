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
    Alert, Snackbar, Box
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useTheme} from '@emotion/react';
import React, {useRef} from 'react';
import Masonry from "react-masonry-css";
import MultiSelect from '../components/MultiSelect';
import Index from "../layouts/settings/actions";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/** Translation */
import {useTranslation} from 'react-i18next';

import UsersService from "../services/api/users.service";
import UserStorage from "../services/storage/user.storage";
import UserContext from "../components/UserContext";

import DialogConfigure2FA from "../layouts/profile/DialogConfigure2FA";
import DialogChangePassword from "../layouts/profile/DialogChangePassword";
import EmailIcon from "@mui/icons-material/Email";

function Settings(props) {
    const {t} = useTranslation('common');

    /** User & privileges */
    const {user, privileges, settings} = React.useContext(UserContext);
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
    const refreshSettings = () => {
        UserStorage.removeUserSettings();
        UserStorage.getSettings()
            .then((rsp) => {
                setCurrentSettings(rsp);
            });
    }

    /** User Profile */
    const getUserValue = (id) => {
        if (!currentUser) return '';
        return currentUser[id] || '';
    }
    const handleUserChange = (id, value) => {
        if (!currentUser) return;
        setCurrentUser({...currentUser, [id]: value});
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

    /** Dialog Password */
    const dialogPasswordRef = useRef();
    const handleDialogPasswordOpen = () => {
        dialogPasswordRef.current.openDialog();
    }

    /** Dialog 2FA */
    const dialog2FARef = useRef();
    const handleClick2FAOpen = () => {
        dialog2FARef.current.defaultMail(getUserValue('mail'));
        dialog2FARef.current.defaultPhone(getUserValue('phone'));
        dialog2FARef.current.openDialog();
    }

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
                    <AccountCircleIcon fontSize="large"/> <Box sx={{m: 0.5}}/> {t('titles.profile')}
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

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.login')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        id="login"
                                        fullWidth
                                        variant="standard"
                                        value={getUserValue('login')}
                                        inputProps={
                                            {readOnly: true,}
                                        }
                                    />
                                </Grid>
                            </Grid>


                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.name')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        id="name"
                                        fullWidth
                                        variant="standard"
                                        value={getUserValue('first_name')}
                                        onChange={(e) => handleUserChange('first_name', e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.mail')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        variant="standard"
                                        value={getUserValue('mail')}
                                        onChange={(e) => handleUserChange('mail', e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.password')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>
                                <Grid item xs={9}>
                                    <Link onClick={handleDialogPasswordOpen}>{t('buttons.change_password')}</Link>
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

                            <Typography variant="h6" align="left"> {t('titles.security')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                onChange={(e) => {
                                                    handleSettingsChange('2fa_enabled', e.target.checked)
                                                }}
                                                checked={getSettingsValue('2fa_enabled')}
                                            />
                                        }
                                        label={t("fields.enable_2fa")}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Link onClick={handleClick2FAOpen}>{t('buttons.configure_2fa')}</Link>
                                    {
                                        getSettingsValue('2fa_channel') === "mail" && (
                                            <React.Fragment>
                                                <Typography variant="body1" component="div" sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    mt: 1
                                                }}>
                                                    (<EmailIcon/> &nbsp;Mail to {getSettingsValue('2fa_to')})
                                                </Typography>
                                            </React.Fragment>
                                        )
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                        {t("texts.profile_2fa")}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Index
                                handleSave={handleSaveSettings}
                                handleCancel={handleCancelSettings}
                            />
                        </CardContent>
                    </Card>

                    <Card className={classes.settingCard}>
                        <CardContent>

                            <Typography variant="h6" align="left"> {t('titles.general')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.theme')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={9} align="left">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                onChange={(e) => {
                                                    handleSettingsChange('theme', e.target.checked ? "dark" : "light")
                                                }}
                                                checked={getSettingsValue('theme') === "dark" ? true : false}
                                            />
                                        }
                                        label={t("fields.dark_mode")}/>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.language')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={9} align="left">
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
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.format')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={9} align="left">
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

                            <Box sx={{mt: 5}}/>

                            <Typography variant="h6" align="left"> {t('titles.studies')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "50px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.filters')}
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
                                            selection={currentSettings ? currentSettings.filters_studies_primary : []}
                                            setSelection={(value) => handleSettingsChange("filters_studies_primary", value)}
                                        />

                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Chip label={t('fields.dates')}
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
                                            selection={currentSettings ? currentSettings.filters_studies_date_presets : []}
                                            setSelection={(value) => handleSettingsChange("filters_studies_date_presets", value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {privileges.pages.includes('aet') && (
                                <>
                                    <Box sx={{mt: 5}}/>

                                    <Typography variant="h6" align="left"> {t('titles.remote_aet')} </Typography>
                                    <Divider style={{marginBottom: theme.spacing(2)}}/>

                                    <Grid container spacing={2} style={{marginBottom: "50px"}}>
                                        <Grid item xs={3}>
                                            <Chip label={t('fields.filters')}
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
                                                    selection={currentSettings ? currentSettings.filters_aets_primary : []}
                                                    setSelection={(value) => handleSettingsChange("filters_aets_primary", value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Chip label={t('fields.dates')}
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
                                                    selection={currentSettings ? currentSettings.filters_aets_date_presets : []}
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

            <DialogChangePassword
                ref={dialogPasswordRef}
            />

            <DialogConfigure2FA
                ref={dialog2FARef}
                refreshSettings={refreshSettings}
            />
        </React.Fragment>

    )
}

export default Settings