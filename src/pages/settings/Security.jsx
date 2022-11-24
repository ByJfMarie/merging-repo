import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Divider,
    Tab,
    Tabs,
    Box,
    Card,
    CardContent,
    TextField,
    Grid,
    Alert,
    Snackbar,
    FormControlLabel,
    Checkbox,
    FormGroup,
    FormControl,
    FormLabel, RadioGroup, Radio,
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import "react-phone-input-2/lib/high-res.css";
import SettingsService from "../../services/api/settings.service";
import Index from "../../layouts/settings/actions";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PryInfo from "../../components/PryInfo";

/** Translation */
import { useTranslation } from 'react-i18next';

/** TABS FUNCTION */
function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}} style={{padding: "30px 0px"}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Security() {
    const { t } = useTranslation('settings');

    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%'
        },

        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        },
        spaceAfter: {
            marginRight: "15px !important",
        },

        div: {
            display: "flex",
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'flex'
            }
        },

        myDropZone: {
            minHeight: '100px'
        }
    });
    const classes = useStyles();

    /** TAB */
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });
    /*function Message() {
        if (!message || !message.show) return <></>;
        return <Alert severity={message.severity}>{message.message}</Alert>;
    }*/

    /** SETTINGS VALUES */
    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async () => {
        const response = await SettingsService.getDesign();

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        if (response.items == null) return;
        setSettingsValue(response.items);
    }

    React.useEffect(() => {
        refreshSettings().then();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const getSettingsValue = (id) => {
        if (!settingsValue || !settingsValue[id]) return '';
        return settingsValue[id]['value'] || '';
    }
    const handleSettingsChange = (id, value) => {
        let cfg = settingsValue[id];
        if (!cfg) return;
        cfg['value'] = value;
        setSettingsValue({...settingsValue, [id]: cfg});
    }

    const handleSave = async () => {
        const response = await SettingsService.saveDesign(settingsValue);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: t("msg_error.settings_saved", {error: response.error})
            });
            return;
        }

        refreshSettings();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: t("msg_info.settings_saved")
        });
    };

    const handleCancel = () => {
        refreshSettings();
    };


    return (
        <React.Fragment>
            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <DesignServicesIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.security')}
                </Grid>
            </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable"
                      scrollButtons allowScrollButtonsMobile>
                    <Tab label={t('titles.login')} {...a11yProps(0)} />
                    <Tab label={t('titles.captcha')} {...a11yProps(1)} />
                    <Tab label={t('titles.2fa')} {...a11yProps(2)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0} dir="ltr">

                <PryInfo
                    text={t("info.security_login")}
                />

                <Card className={classes.card}>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={getSettingsValue('WEB.login_by_reference')==="true"}
                                        onChange={(e) => handleSettingsChange('WEB.login_by_reference', e.target.checked+"")}
                                    />
                                }
                                label={t("fields.enable_ref_login")}/>
                        </FormGroup>

                        <Index
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                        />
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={1} dir="ltr">

                <PryInfo
                    text={t("info.security_captcha")}
                />

                <Card className={classes.card}>
                    <CardContent>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getSettingsValue('WEB.login_captcha')==="true"}
                                    onChange={(e) => handleSettingsChange('WEB.login_captcha', e.target.checked+"")}
                                />
                            }
                            label={t("fields.enable_google_recaptcha")}
                        />
                    </FormGroup>

                    <Box sx={{ m: 4 }} />

                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={t("fields.site_key")}
                        variant="standard"
                        InputLabelProps={{shrink: true}}
                        value={getSettingsValue('WEB.login_captcha_site_key')}
                        onChange={(e) => {handleSettingsChange('WEB.login_captcha_site_key', e.target.value)}}
                    />

                    <Box sx={{ m: 2 }} />

                    <TextField
                        className={classes.field}
                        id="filled-basic"
                        label={t("fields.secret_key")}
                        variant="standard"
                        InputLabelProps={{shrink: true}}
                        value={getSettingsValue('WEB.login_captcha_secret_key')}
                        onChange={(e) => {handleSettingsChange('WEB.login_captcha_secret_key', e.target.value)}}
                    />
                    <Index
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={2} dir="ltr">

                <PryInfo
                    text={t("info.security_2fa")}
                />

                <Card className={classes.card}>
                    <CardContent>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Enable Two-Factor Authentication</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="disabled" control={<Radio />} label="Disabled. Do not required a verification code" />
                                <FormControlLabel value="optional" control={<Radio />} label="Optional. User can decide to use 2FA or not" />
                                <FormControlLabel value="required" control={<Radio />} label="Required. Enforce all users to use 2FA" />
                            </RadioGroup>
                        </FormControl>

                        <Box sx={{ m: 4 }} />


                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Available Services</FormLabel>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="2FA over email" />
                                    {/*<FormControlLabel control={<Checkbox />} label="2FA over SMS" />*/}
                                    <FormControlLabel control={<Checkbox />} label="2FA over WhatsApp" />
                                    {/*<FormControlLabel control={<Checkbox />} label="2FA over Google Authenticator" />*/}
                                </FormGroup>
                            </FormControl>



                        <Box sx={{ m: 4 }} />

                        <Index
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                        />
                    </CardContent>
                </Card>
            </TabPanel>

        </React.Fragment>
    );
}