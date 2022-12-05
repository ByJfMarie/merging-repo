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
    Grid, MenuItem, Select, FormControl, InputLabel, Link,
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import PhoneInput from "react-phone-input-2";
import Editor from "../../components/Editor.jsx";
import "react-phone-input-2/lib/high-res.css";
import SettingsService from "../../services/api/settings.service";
import Index from "../../layouts/settings/actions";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import {DropzoneArea} from 'react-mui-dropzone';
import GeneralService from "../../services/api/general.service";
import PryInfo from "../../components/PryInfo";
import {useSnackbar} from "notistack";

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

export default function SiteDesign() {
    const { t } = useTranslation('site_design');

    const { enqueueSnackbar } = useSnackbar();

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

    /** SETTINGS VALUES */
    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async () => {
        const response = await SettingsService.getDesign();

        if (response.error) {
            enqueueSnackbar(response.error, {variant: 'error'});
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
            enqueueSnackbar(t("messages.save_settings.error", {error: response.error}), {variant: 'error'});
            return;
        }

        refreshSettings();
        enqueueSnackbar(t("messages.save_settings.success"), {variant: 'success'});
    };

    const handleCancel = () => {
        refreshSettings();
    };

    /** LOGO */
    const handleUploadLogo = async (files) => {
        if (!files || files.length<=0) return;
        const response = await SettingsService.uploadLogo(files[0]);

        if (response.error) {
            enqueueSnackbar(t("messages.logo_uploaded.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.logo_uploaded.success"), {variant: 'success'});
    }

    const handleUploadHelp = async (files) => {
        if (!files || files.length<=0) return;
        const response = await SettingsService.uploadHelp(files[0]);

        if (response.error) {
            enqueueSnackbar(t("messages.help_uploaded.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.help_uploaded.success"), {variant: 'success'});
    }

    const handleUploadLoginSheet = async (files) => {
        if (!files || files.length<=0) return;
        const response = await SettingsService.uploadLoginSheet(files[0]);

        if (response.error) {
            enqueueSnackbar(t("messages.loginSheet_uploaded.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.loginSheet_uploaded.success"), {variant: 'success'});
    }


    return (
        <React.Fragment>
            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <DesignServicesIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('title')}
                </Grid>
            </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable"
                      scrollButtons allowScrollButtonsMobile>
                    <Tab label={t('tab_general.title')} {...a11yProps(0)} />
                    <Tab label={t('tab_custom_files.title')} {...a11yProps(1)} />
                    <Tab label={t('tab_custom_texts.title')} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} dir="ltr">
                <PryInfo
                    text={t("tab_general.info")}
                />
                <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="standard" style={{ width: "100%", padding: "0px" }}>
                                    <InputLabel>{t('tab_general.language.name')}</InputLabel>
                                    <Select
                                        value={getSettingsValue('WEB.language') || "en"}
                                        label="Language"
                                        onChange={(e) => {
                                            handleSettingsChange('WEB.language', e.target.value)
                                        }}
                                        fullWidth={true}
                                    >
                                        <MenuItem value={"fr"}>{t("tab_general.language.fr")}</MenuItem>
                                        <MenuItem value={"en"}>{t("tab_general.language.en")}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="standard" style={{ width: "100%", padding: "0px" }}>
                                    <InputLabel>{t('tab_general.date_format')}</InputLabel>
                                    <Select
                                        value={getSettingsValue('ALL.date_format')}
                                        label={t('tab_general.date_format')}
                                        onChange={(e) => {
                                            handleSettingsChange('ALL.date_format', e.target.value)
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
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                    <TextField
                                        className={classes.field}
                                        id="filled-basic"
                                        label={t("tab_general.institution")}
                                        variant="standard"
                                        InputLabelProps={{shrink: true}}
                                        value={getSettingsValue('WEB.general_institution')}
                                        onChange={(e) => {handleSettingsChange('WEB.general_institution', e.target.value)}}
                                    />
                            </Grid>
                            {
                                /*<Grid item xs="auto" style={{ display: "flex", alignItems: "center" }}>
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
                                </Grid>*/
                            }
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("tab_general.departement")}
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
                                    label={t("tab_general.country")}
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
                                    label={t("tab_general.address")}
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_address')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_address', e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic" label={t("tab_general.city")}
                                    variant="standard" InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_city')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_city', e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field}
                                    id="filled-basic"
                                    label={t("tab_general.website")}
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
                                    label={t("tab_general.doctor_id")}
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
                                    label={t("tab_general.external_address")}
                                    variant="standard"
                                    InputLabelProps={{shrink: true}}
                                    value={getSettingsValue('WEB.general_external_web_link')}
                                    onChange={(e) => {handleSettingsChange('WEB.general_external_web_link', e.target.value)}}
                                />
                            </Grid>
                        </Grid>
                        <Index
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                        />
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={1} dir="ltr">
                <PryInfo
                    text={t("tab_custom_files.info")}
                />

                <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}} className={classes.card}>
                    <Typography gutterBottom variant="h6" component="div">{t('tab_custom_files.company_logo')}
                        &nbsp;<Link target="_blank" href={GeneralService.getLogoURL()} variant="body2" rel="noreferrer">{t('tab_custom_files.actions.view')}</Link>
                    </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">{t('tab_custom_files.texts.only_svg')}</Typography>
                        <Box m={2}/>
                        <DropzoneArea
                            dropzoneClass={classes.myDropZone}
                            acceptedFiles={['.svg']}
                            filesLimit={1}
                            dropzoneText={t('tab_custom_files.texts.drag_and_drop')}
                            onChange={(files) => handleUploadLogo(files)}
                            showPreviewsInDropzone={false}
                            showAlerts={false}
                        />
                    </CardContent>
                </Card>

                <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}} className={classes.card}>
                    <Typography gutterBottom variant="h6" component="div">{t('tab_custom_files.help_file')}
                        &nbsp;<Link target="_blank" href={GeneralService.getHelpFileURL()} variant="body2" rel="noreferrer">{t('tab_custom_files.actions.view')}</Link>
                    </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">{t('tab_custom_files.texts.only_pdf')}</Typography>
                        <Box m={2}/>
                        <DropzoneArea
                            dropzoneClass={classes.myDropZone}
                            acceptedFiles={['.pdf']}
                            filesLimit={1}
                            dropzoneText={t('tab_custom_files.texts.drag_and_drop')}
                            onChange={(files) => handleUploadHelp(files)}
                            showPreviewsInDropzone={false}
                            showAlerts={false}
                        />
                    </CardContent>
                </Card>

                <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}} className={classes.card}>
                    <Typography gutterBottom variant="h6" component="div">{t('tab_custom_files.login_sheet')}
                        &nbsp;<Link target="_blank" href={GeneralService.getLoginSheetFileURL()} variant="body2" rel="noreferrer">{t('tab_custom_files.actions.view')}</Link>
                    </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">{t('tab_custom_files.texts.only_pdf')}</Typography>
                        <Box m={2}/>
                        <DropzoneArea
                            dropzoneClass={classes.myDropZone}
                            acceptedFiles={['.pdf']}
                            filesLimit={1}
                            dropzoneText={t('tab_custom_files.texts.drag_and_drop')}
                            onChange={(files) => handleUploadLoginSheet(files)}
                            showPreviewsInDropzone={false}
                            showAlerts={false}
                        />
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={2} dir="ltr">
                <PryInfo
                    text={t("tab_custom_texts.info")}
                />

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('tab_custom_texts.disclaimer')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                    <Editor
                        id="disclaimer"
                        defaultValue={getSettingsValue('WEB.disclaimer')}
                        onChange={(value) => {handleSettingsChange('WEB.disclaimer', value)}}
                    />
                    <Index
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                    </CardContent>
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('tab_custom_texts.privacy_policy')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                    <Editor
                        id="privacy"
                        defaultValue={getSettingsValue('WEB.privacy_policy')}
                        onChange={(value) => {handleSettingsChange('WEB.privacy_policy', value)}}
                    />
                    <Index
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                        </CardContent>
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('tab_custom_texts.copyright')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                    <Editor
                        id="copyright"
                        defaultValue={getSettingsValue('WEB.copyright')}
                        onChange={(value) => {handleSettingsChange('WEB.copyright', value)}}
                    />
                    <Index
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                        </CardContent>
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('tab_custom_texts.faq')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                    <Editor
                        id="faq"
                        defaultValue={getSettingsValue('WEB.faq')}
                        onChange={(value) => {handleSettingsChange('WEB.faq', value)}}
                    />
                    <Index
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                        </CardContent>
                </Card>


                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('tab_custom_texts.terms_conditions')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                    <Editor
                        id="terms"
                        defaultValue={getSettingsValue('WEB.terms')}
                        onChange={(value) => {handleSettingsChange('WEB.terms', value)}}
                    />
                    <Index
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                        </CardContent>
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('tab_custom_texts.contact_us')} </Typography>
                    <Divider style={{marginBottom: theme.spacing(2)}}/>
                    <CardContent>
                    <Editor
                        id="contactus"
                        defaultValue={getSettingsValue('WEB.contactus')}
                        onChange={(value) => {handleSettingsChange('WEB.contactus', value)}}
                    />
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