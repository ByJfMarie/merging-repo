import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Divider,
    Container,
    Tab,
    Tabs,
    Box,
    Card,
    CardContent,
    TextField,
    Stack,
    Grid,
    FormGroup,
    FormControl,
    Select,
    MenuItem,
    ListSubheader,
    InputLabel,
    FormControlLabel,
    Checkbox,
    Button, Alert, Snackbar
} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import Editor from "../../components/Editor.jsx"
import "react-phone-input-2/lib/high-res.css";
import SettingsService from "../../services/api/settings.service";
import Index from "../../layouts/settings/actions";
import MailingService from "../../services/api/mailing.service";
import EmailIcon from '@mui/icons-material/Email';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";
import PryInfo from "../../components/PryInfo";

/** TABS FUNCTION */
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }} style={{ padding: "30px 0px" }}>
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

/** TABS FUNCTION */
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Emailing() {
    const { t } = useTranslation('settings');

    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        },

        field: {
            width: '100%'
        },

        gap: {
            //paddingLeft: "200px !important",

            [theme.breakpoints.down('sm')]: {
                padding: '24px !important',
            },
        },
    });
    const classes = useStyles();

    /** TABS INDEX FUNCTION */
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {setValue(newValue);};
    const handleChangeIndex = (index) => {setValue(index);};

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    /** SETTINGS VALUES */
    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async() => {
        const response = await SettingsService.getEmailing();

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        setSettingsValue(response.items);
    }

    React.useEffect(() => {
        refreshSettings();
    }, []);

    const getSettingsValue = (id) => {
        if (!settingsValue[id]) return '';
        return settingsValue[id]['value'] || '';
    }
    const handleSettingsChange = (id, value) => {
        let cfg = settingsValue[id];
        if (!cfg) return;
        cfg['value'] = value;
        setSettingsValue({...settingsValue, [id]: cfg});
    }

    const [testRecipient, setTestRecipient] = React.useState(null);
    const handleTest = async () => {
        const response = await MailingService.test(testRecipient, settingsValue);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: t("msg_error.mail_test", {error: response.error})
            });
            return;
        }

        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: t("msg_info.mail_test")
        });
    }

    const handleSave = async () => {
        const response = await SettingsService.saveEmailing(settingsValue);

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

    //Template display
    const [template, setTemplate] = React.useState({
        name: '',
        subject: '',
        body: ''
    });
    const handleTemplateSelect = (tmp_name) => {
        setTemplate({
            ...template,
            name:tmp_name,
            subject:getSettingsValue(tmp_name+"_title"),
            body: getSettingsValue(tmp_name+"_body")
        });
    }

    return (
        <React.Fragment>
            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <EmailIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.emailing')}
                </Grid>
            </Typography>

            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t('titles.general')} {...a11yProps(0)} />
                    <Tab label={t('titles.templates')} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <SwipeableViews
                axis='x'
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir="ltr">
                    <PryInfo
                        text={t("info.emailing_general")}
                    />

                    <Card className={classes.card} style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                        <CardContent>
                            <Stack
                                component="form"
                                sx={{
                                    width: '100%'
                                }}
                                spacing={2}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                                    <Grid item xs={9}>
                                        <TextField
                                            className={classes.field}
                                            id="filled-basic"
                                            label={t("fields.host")}
                                            variant="standard"
                                            value={getSettingsValue('NOT.smtp_host')}
                                            onChange={(e) => {handleSettingsChange('NOT.smtp_host', e.target.value)}}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            className={classes.field}
                                            id="filled-basic"
                                            label={t("fields.port")}
                                            variant="standard"
                                            value={getSettingsValue('NOT.smtp_port')}
                                            onChange={(e) => {handleSettingsChange('NOT.smtp_port', e.target.value)}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            id="filled-basic"
                                            label={t("fields.from")}
                                            variant="standard"
                                            value={getSettingsValue('NOT.smtp_from')}
                                            onChange={(e) => {handleSettingsChange('NOT.smtp_from', e.target.value)}}
                                        />
                                    </Grid>
                                </Grid>

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={getSettingsValue('NOT.smtp_authentication')==="true"}
                                                onChange={(e) => handleSettingsChange('NOT.smtp_authentication', e.target.checked+"")}
                                            />
                                        }
                                        label={t("fields.authentication")}
                                    />
                                </FormGroup>

                                <Container style={{ marginBottom: '15px', display: " flex", flexDirection: 'column' }}>
                                    <Grid container direction="row-reverse" rowSpacing={2} style={{ marginBottom: '15px' }}>
                                        <Grid item xs={11} >
                                            <TextField
                                                style={{ maxWidth: '600px' }}
                                                fullWidth={true}
                                                id="filled-basic"
                                                label={t("fields.user")}
                                                variant="standard"
                                                value={getSettingsValue('NOT.smtp_user')}
                                                onChange={(e) => {handleSettingsChange('NOT.smtp_user', e.target.value)}}
                                            />
                                        </Grid>
                                        <Grid item xs={11}>
                                            <TextField
                                                style={{ maxWidth: '600px' }}
                                                fullWidth={true}
                                                id="filled-basic"
                                                label={t("fields.password")}
                                                variant="standard"
                                                type="password"
                                                value={getSettingsValue('NOT.smtp_password')}
                                                onChange={(e) => {handleSettingsChange('NOT.smtp_password', e.target.value)}}
                                            />
                                        </Grid>
                                        <Grid item xs={11}>
                                            <Select
                                                labelId="security-label"
                                                id="security"
                                                value={getSettingsValue('NOT.smtp_security')}
                                                label={t("fields.security")}
                                                onChange={(e) => {handleSettingsChange('NOT.smtp_security', e.target.value)}}
                                                fullWidth={true}
                                                style={{ maxWidth: '600px' }}
                                            >
                                                <MenuItem value={"tls"}>{t("fields.security_value.tls")}</MenuItem>
                                                <MenuItem value={"ssl"}>{t("fields.security_value.ssl")}</MenuItem>
                                                <MenuItem value={"none"}>{t("fields.security_value.none")}</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Container>

                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    alignItems="center"
                                    justify="center"
                                >
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label={t("fields.test_smtp")}
                                            variant="outlined"
                                            placeholder={t("fields.recipient")}
                                            value={testRecipient || ''}
                                            onChange={(event) => {setTestRecipient(event.target.value)}}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                            <Button
                                                variant="text"
                                                color="success"
                                                disableElevation
                                                onClick={() => handleTest()}

                                            >
                                                {t("buttons.test_email")}
                                            </Button>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Index
                                handleSave={handleSave}
                                handleCancel={handleCancel}
                            />
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel value={value} index={1} dir="ltr">
                    <PryInfo
                        text={t("info.emailing_templates")}
                    />

                    <Card className={classes.card} style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                        <CardContent>
                        <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="standard" style={{ width: "100%", padding: "0px" }}>
                                    <InputLabel>{t('fields.template')}</InputLabel>
                                    <Select
                                        labelId="template"
                                        value={template.name || ''}
                                        onChange={(e) => handleTemplateSelect(e.target.value)}
                                    >
                                        <ListSubheader>{t("fields.template_value.general")}</ListSubheader>
                                        <MenuItem value="NOT.download_ready">{t("fields.template_value.download_ready")}</MenuItem>
                                        <MenuItem value="NOT.mail_change_confirmation">{t("fields.template_value.mail_change")}</MenuItem>
                                        <MenuItem value="NOT.reset_password">{t("fields.template_value.reset_password")}</MenuItem>
                                        <ListSubheader>{t("fields.template_value.patient")}</ListSubheader>
                                        <MenuItem value="NOT.activation">{t("fields.template_value.activation_request")}</MenuItem>
                                        <MenuItem value="NOT.activation_confirmation">{t("fields.template_value.activation_confirmation")}</MenuItem>
                                        <MenuItem value="NOT.notification">{t("fields.template_value.study_notification")}</MenuItem>
                                        <MenuItem value="NOT.registration_error">{t("fields.template_value.registration_error")}</MenuItem>
                                        <ListSubheader>{t("fields.template_value.physicians")}</ListSubheader>
                                        <MenuItem value="NOT.doctor-activation">{t("fields.template_value.activation_request")}</MenuItem>
                                        <MenuItem value="NOT.doctor_activation_request">{t("fields.template_value.activation_request2")}</MenuItem>
                                        <MenuItem value="NOT.doctor_activation_confirmation">{t("fields.template_value.activation_confirmation")}</MenuItem>
                                        <MenuItem value="NOT.doctor_notification">{t("fields.template_value.study_notification")}</MenuItem>
                                        <MenuItem value="NOT.share_user">{t("fields.template_value.share_to")}</MenuItem>
                                        <ListSubheader>{t("fields.template_value.radiologist")}</ListSubheader>
                                        <MenuItem value="NOT.radio-activation">{t("fields.template_value.activation_request")}</MenuItem>
                                        <MenuItem value="NOT.radio_activation_request">{t("fields.template_value.activation_request2")}</MenuItem>
                                        <MenuItem value="NOT.radio_activation_confirmation">{t("fields.template_value.activation_confirmation")}</MenuItem>
                                        <ListSubheader>{t("fields.template_value.guest")}</ListSubheader>
                                        <MenuItem value="NOT.share_new_guest">{t("fields.template_value.new_account")}</MenuItem>
                                        <MenuItem value="NOT.share_new_guest_password">{t("fields.template_value.new_account_password")}</MenuItem>
                                        <MenuItem value="NOT.share_guest">{t("fields.template_value.share_to")}</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                             
                            <Grid item xs={12}>
                                <TextField
                                    id="Subject"
                                    fullWidth
                                    label={t('fields.subject')}
                                    variant="standard"
                                    //style={{ marginBottom: "10px", width: "100%" }}
                                    value={template.subject || ''}
                                    onChange={(e) => {handleSettingsChange(template.name+'_title', e.target.value)}}
                                />
                            </Grid>
                        </Grid>

                        <Divider />
                        <Editor
                            id="body"
                            defaultValue={template.body || ''}
                            onChange={(value) => {handleSettingsChange(template.name+'_body', value)}}
                        />
                        <Index
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                        />
                        </CardContent>
                    </Card>
                </TabPanel>
            </SwipeableViews>
        </React.Fragment >
    );
}