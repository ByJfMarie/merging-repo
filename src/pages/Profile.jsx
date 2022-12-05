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
    Box, Button
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useTheme} from '@emotion/react';
import React, {useRef} from 'react';
import Masonry from "react-masonry-css";
import MultiSelect from '../components/MultiSelect';
import Index from "../layouts/settings/actions";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useSnackbar} from "notistack";

/** Translation */
import {useTranslation} from 'react-i18next';

import UsersService from "../services/api/users.service";
import UserStorage from "../services/storage/user.storage";
import UserContext from "../components/UserContext";

import DialogConfigure2FA from "../layouts/profile/DialogConfigure2FA";
import DialogChangePassword from "../layouts/profile/DialogChangePassword";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Settings(props) {
    const {t} = useTranslation('profile');

    const { enqueueSnackbar } = useSnackbar();

    /** User & privileges */
    const {user, privileges, settings, status2FA} = React.useContext(UserContext);
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
            enqueueSnackbar(t("messages.save_settings.error", {error: response.error}), {variant: 'error'});
            return;
        }

        UserStorage.removeUserSettings();
        UserStorage.getSettings()
            .then((rsp) => {
                setCurrentSettings(rsp);
                enqueueSnackbar(t("messages.save_settings.success"), {variant: 'success'});
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
            enqueueSnackbar(t("messages.save_user.error", {error: response.error}), {variant: 'error'});
            return;
        }

        UserStorage.removeUserProfile();
        UserStorage.getUser()
            .then(rsp => {
                setCurrentUser(rsp);
                enqueueSnackbar(t("messages.save_user.success"), {variant: 'success'});
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
                    <AccountCircleIcon fontSize="large"/> <Box sx={{m: 0.5}}/> {t('title')}
                </Grid>
            </Typography>

            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Container maxWidth={false} style={{padding: 0}}>

                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">

                    <Card className={classes.settingCard}>
                        <CardContent>
                            <Typography variant="h6" align="left"> {t('user.title')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('user.login')}
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
                                    <Chip label={t('user.name')}
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
                                    <Chip label={t('user.mail')}
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
                                    <Chip label={t('user.password')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>
                                <Grid item xs={9}>
                                    <Link onClick={handleDialogPasswordOpen}>{t('user.change_password')}</Link>
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

                            <Typography variant="h6" align="left"> {t('security.title')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <FormControlLabel
                                        disabled={status2FA && !status2FA.optional}
                                        control={
                                            <Switch
                                                onChange={(e) => {
                                                    //if (!e.target.checked) return;
                                                    handleSettingsChange('2fa_enabled', e.target.checked)
                                                }}
                                                checked={getSettingsValue('2fa_enabled')}
                                            />
                                        }
                                        label={t("security.2fa.enable")}
                                    />
                                </Grid>
                                <Grid container spacing={2} item xs={9} direction="row" alignItems="center">
                                    {
                                        status2FA && !status2FA.disabled && (
                                            <Grid item xs="auto">
                                                {
                                                    getSettingsValue('2fa_channel') === "mail" && (
                                                        <React.Fragment>
                                                            <Typography variant="body1" component="div" sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                flexWrap: 'wrap',
                                                            }}>
                                                                <EmailIcon/> &nbsp;Mail to {getSettingsValue('2fa_to')}
                                                            </Typography>
                                                        </React.Fragment>
                                                    )
                                                }
                                                {
                                                    getSettingsValue('2fa_channel') === "sms" && (
                                                        <React.Fragment>
                                                            <Typography variant="body1" component="div" sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                flexWrap: 'wrap',
                                                            }}>
                                                                <SmsIcon/> &nbsp;SMS to {getSettingsValue('2fa_to')}
                                                            </Typography>
                                                        </React.Fragment>
                                                    )
                                                }
                                                {
                                                    getSettingsValue('2fa_channel') === "whatsapp" && (
                                                        <React.Fragment>
                                                            <Typography variant="body1" component="div" sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                flexWrap: 'wrap',
                                                            }}>
                                                                <WhatsAppIcon/> &nbsp;WhatsApp to {getSettingsValue('2fa_to')}
                                                            </Typography>
                                                        </React.Fragment>
                                                    )
                                                }
                                            </Grid>
                                        )
                                    }
                                    <Grid item xs="auto">
                                        <Button
                                            onClick={handleClick2FAOpen}
                                            variant="outlined"
                                            disabled={status2FA && status2FA.disabled}
                                        >
                                            {t('security.2fa.configure')}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                        {t("security.2fa.description")}
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

                            <Typography variant="h6" align="left"> {t('general.title')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('general.theme')}
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
                                        label={t("general.dark_mode")}/>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{marginBottom: "20px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('general.language')}
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
                                        <MenuItem value={"fr"}>{t("general.language_value.fr")}</MenuItem>
                                        <MenuItem value={"en"}>{t("general.language_value.en")}</MenuItem>
                                        <MenuItem value={"es"}>{t("general.language_value.es")}</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Chip label={t('general.format')}
                                          style={{backgroundColor: theme.palette.chip.background}}/>
                                </Grid>

                                <Grid item xs={9} align="left">
                                    <Select
                                        value={getSettingsValue('date_format')}
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

                            <Typography variant="h6" align="left"> {t('local.title')} </Typography>
                            <Divider style={{marginBottom: theme.spacing(2)}}/>

                            <Grid container spacing={2} style={{marginBottom: "50px"}}>
                                <Grid item xs={3}>
                                    <Chip label={t('local.filters')}
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
                                    <Chip label={t('local.dates')}
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

                                    <Typography variant="h6" align="left"> {t('remote.title')} </Typography>
                                    <Divider style={{marginBottom: theme.spacing(2)}}/>

                                    <Grid container spacing={2} style={{marginBottom: "50px"}}>
                                        <Grid item xs={3}>
                                            <Chip label={t('remote.filters')}
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
                                            <Chip label={t('remote.dates')}
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