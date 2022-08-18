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
    Button,
    Tooltip,
    Grid, Alert, Snackbar, FormControlLabel, Checkbox, FormGroup,
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import t from "../../services/Translation";
import PhoneInput from "react-phone-input-2";
import Editor from "../../components/Editor.jsx";
import "react-phone-input-2/lib/high-res.css";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsService from "../../services/api/settings.service";
import ResetSave from "../../components/settings/ResetSave";
import LoginStorage from "../../services/storage/login.storage";

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

export default function SiteDesign() {
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
                message: response.error
            });
            return;
        }

        LoginStorage.removeConfig();
        refreshSettings();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Settings successfully saved!"
        });
    };

    const handleCancel = () => {
        refreshSettings();
    };

    /** LOGO */
    const handleUploadLogo = async (event) => {
        const response = await SettingsService.uploadLogo(event.target.files[0]);

        if (response.error) {
            return;
        }

        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Logo File successfully uploaded!"
        });
    }

    const handleUploadHelp = async (event) => {
        const response = await SettingsService.uploadHelp(event.target.files[0]);

        if (response.error) {
            return;
        }

        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Help File successfully uploaded!"
        });
    }

    const handleUploadLoginSheet = async (event) => {
        const response = await SettingsService.uploadLoginSheet(event.target.files[0]);

        if (response.error) {
            return;
        }

        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "LoginSheet File successfully uploaded!"
        });
    }


    return (
        <React.Fragment>
            <Typography variant="h4"
                        style={{textAlign: 'left', color: theme.palette.primary.main}}> {t('site')} </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable"
                      scrollButtons allowScrollButtonsMobile>
                    <Tab label={t('general')} {...a11yProps(0)} />
                    <Tab label={t('login')} {...a11yProps(1)} />
                    <Tab label={t('custom_files')} {...a11yProps(2)} />
                    <Tab label={t('custom_texts')} {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} dir="ltr">
                <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                    <TextField
                                        className={classes.field}
                                        id="filled-basic"
                                        label={t("institution")}
                                        variant="standard"
                                        InputLabelProps={{shrink: true}}
                                        value={getSettingsValue('WEB.general_institution')}
                                        onChange={(e) => {handleSettingsChange('WEB.general_institution', e.target.value)}}
                                    />
                            </Grid>
                            <Grid item xs="auto" style={{ display: "flex", alignItems: "center" }}>
                                    <Tooltip title="Lorry mange tous les chocolats">
                                        <InfoOutlinedIcon
                                            style={{
                                                display: "flex",
                                                marginLeft: '5px',
                                                marginTop: 'auto',
                                                marginBottom: 'auto'
                                            }}
                                        />
                                    </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("departement")}
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_department')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_department', e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("country")}
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_country')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_country', e.target.value)}}
                                />
                                <PhoneInput
                                    style={{width: '100%'}}
                                    inputStyle={{
                                        backgroundColor: theme.palette.textfield.background,
                                        color: theme.palette.textfield.text
                                    }}
                                    dropdownStyle={{color: "black"}}
                                    searchStyle={{backgroundColor: theme.palette.textfield.background}}
                                    buttonStyle={{backgroundColor: theme.palette.textfield.button}}
                                    containerStyle={{backgroundColor: theme.palette.background.paper}}
                                    value={getSettingsValue('WEB.general_phone')}
                                    onChange={(value) => {handleSettingsChange('WEB.general_phone', value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("address")}
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_address')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_address', e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic" label={t("city")}
                                    variant="standard" InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_city')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_city', e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("website")}
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_website')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_website', e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("doctor_id")}
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_doctor_id')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_doctor_id', e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("external_address")}
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_external_web_link')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_external_web_link', e.target.value)}}
                                />
                            </Grid>
                        </Grid>
                        <ResetSave
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                        />
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={1} dir="ltr">

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('security')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getSettingsValue('WEB.login_captcha')==="true"}
                                    onChange={(e) => handleSettingsChange('WEB.login_captcha', e.target.checked+"")}
                                />
                            }
                            label={t("Enable CAPTCHA")}/>
                    </FormGroup>
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('Patient')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getSettingsValue('WEB.login_by_reference')==="true"}
                                    onChange={(e) => handleSettingsChange('WEB.login_by_reference', e.target.checked+"")}
                                />
                            }
                            label={t("Enable Reference Login")}/>
                    </FormGroup>
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </Card>
            </TabPanel>

            <TabPanel value={value} index={2} dir="ltr">
                <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                    <CardContent>
                        <div className={classes.div}>
                            <Typography className={classes.spaceAfter}>{t('company_logo')}</Typography>
                                <Button
                                    size="small"
                                    variant="contained"
                                    component="label"
                                    style={{float: 'left'}}
                                >
                                    Upload File
                                    <input type="file" hidden onChange={handleUploadLogo}/>
                                </Button>
                        </div>
                        <br/>
                        <div className={classes.div}>
                            <Typography className={classes.spaceAfter}>{t('help_file')}</Typography>
                            <Button
                                size="small"
                                variant="contained"
                                component="label"
                                style={{float: 'left'}}
                            >
                                Upload File
                                <input type="file" hidden onChange={handleUploadHelp}/>
                            </Button>
                        </div>
                        <br/>
                        <div className={classes.div}>
                            <Typography className={classes.spaceAfter}>{t('login_sheet')}</Typography>
                            <Button
                                size="small"
                                variant="contained"
                                component="label"
                                style={{float: 'left'}}
                            >
                                Upload File
                                <input type="file" hidden onChange={handleUploadLoginSheet}/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={3} dir="ltr">

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('disclaimer')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <Editor
                        id="disclaimer"
                        defaultValue={getSettingsValue('WEB.disclaimer')}
                        onChange={(value) => {handleSettingsChange('WEB.disclaimer', value)}}
                    />
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('privacyPolicy')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <Editor
                        id="privacy"
                        defaultValue={getSettingsValue('WEB.privacy_policy')}
                        onChange={(value) => {handleSettingsChange('WEB.privacy_policy', value)}}
                    />
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('copyright')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <Editor
                        id="copyright"
                        defaultValue={getSettingsValue('WEB.copyright')}
                        onChange={(value) => {handleSettingsChange('WEB.copyright', value)}}
                    />
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('FAQ')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <Editor
                        id="faq"
                        defaultValue={getSettingsValue('WEB.faq')}
                        onChange={(value) => {handleSettingsChange('WEB.faq', value)}}
                    />
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </Card>


                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('terms&Conditions')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <Editor
                        id="terms"
                        defaultValue={getSettingsValue('WEB.terms')}
                        onChange={(value) => {handleSettingsChange('WEB.terms', value)}}
                    />
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('contactUs')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <Editor
                        id="contactus"
                        defaultValue={getSettingsValue('WEB.contactus')}
                        onChange={(value) => {handleSettingsChange('WEB.contactus', value)}}
                    />
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </Card>

            </TabPanel>
        </React.Fragment>
    );
}