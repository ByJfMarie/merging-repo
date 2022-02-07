import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Tab, Tabs, Box, Card, CardContent, TextField, Stack, Button, Tooltip, Container } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../services/Translation";
import PhoneInput from "react-phone-input-2";
import Editor from "../../components/Editor.jsx";
import "react-phone-input-2/lib/high-res.css";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
                    <Typography>{children}</Typography>
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

    const [value, setValue] = React.useState(0);
    const [text, setText] = React.useState({
        disclaimer: "",
        privacy: "",
        copyright: "",
        FAQ: "",
        terms: "",
        contact: "",
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleContentChange = (html, id) => {
        setText({ ...text, [id]: html })
        console.log(text)
    }

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('site')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons allowScrollButtonsMobile>
                    <Tab label={t('general')} {...a11yProps(0)} />
                    <Tab label={t('custom_files')} {...a11yProps(1)} />
                    <Tab label={t('custom_texts')} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} dir="ltr" >
                <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
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
                            <Container maxWidth="sm" style={{ marginLeft: "0px",  padding: "0px" }}>
                                <Container maxWidth="xl" style={{ display: "flex", padding: "0px" }}>
                                    <TextField className={classes.field} id="filled-basic" label={t("institution")} variant="standard" /><Tooltip title="Lorry mange tous les chocolats"><InfoOutlinedIcon style={{ display: "flex", marginLeft: '5px', marginTop: 'auto', marginBottom: 'auto' }} /></Tooltip>
                                </Container>
                                <TextField className={classes.field} id="filled-basic" label={t("departement")} variant="standard" />
                                <TextField className={classes.field} id="filled-basic" label={t("country")} variant="standard" />
                                <PhoneInput
                                    style={{ width: '100%' }}
                                    inputStyle={{ backgroundColor: theme.palette.textfield.background, color: theme.palette.textfield.text }}
                                    dropdownStyle={{ color: "black" }}
                                    searchStyle={{ backgroundColor: theme.palette.textfield.background }}
                                    buttonStyle={{ backgroundColor: theme.palette.textfield.button }}
                                    containerStyle={{ backgroundColor: theme.palette.background.paper }}
                                    value='+32'
                                />
                                <TextField className={classes.field} id="filled-basic" label={t("address")} variant="standard" />
                                <TextField className={classes.field} id="filled-basic" label={t("city")} variant="standard" />
                                <TextField className={classes.field} id="filled-basic" label={t("website")} variant="standard" />
                                <TextField className={classes.field} id="filled-basic" label={t("doctor_id")} variant="standard" />
                                <TextField className={classes.field} id="filled-basic" label={t("external_address")} variant="standard" />
                                <TextField className={classes.field} id="filled-basic" label={t("patient_login_method")} variant="standard" />
                            </Container>

                        </Stack>
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={value} index={1} dir="ltr">
                <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                    <CardContent>
                        <div className={classes.div}>
                            <Typography className={classes.spaceAfter}>{t('company_logo')}</Typography>
                            <Button size="small" variant="contained" component="label" style={{ float: 'left' }} >
                                Upload
                                <input type="file" hidden />
                            </Button>
                        </div>
                        <br />
                        <div className={classes.div}>
                            <Typography className={classes.spaceAfter}>{t('help_file')}</Typography>
                            <Button size="small" variant="contained" component="label" style={{ float: 'left' }} >
                                Upload
                                <input type="file" hidden />
                            </Button>
                        </div>
                        <br />
                        <div className={classes.div}>
                            <Typography className={classes.spaceAfter}>{t('login_sheet')}</Typography>
                            <Button size="small" variant="contained" component="label" style={{ float: 'left' }} >
                                Upload
                                <input type="file" hidden />
                            </Button>
                        </div>
                    </CardContent >
                </Card >
            </TabPanel>

            <TabPanel value={value} index={2} dir="ltr">

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('disclaimer')} </Typography>
                    <Divider style={{ marginBottom: theme.spacing(2) }} />
                    <Editor onChange={handleContentChange} id="disclaimer" />
                </Card>

                <Card className={classes.card}>
                    <Typography variant="h6" align="left"> {t('privacyPolicy')} </Typography>
                    <Divider style={{ marginBottom: theme.spacing(2) }} />
                    <Editor onChange={handleContentChange} id="privacy" />
                </Card>

                <Card className={classes.card} >
                    <Typography variant="h6" align="left"> {t('copyright')} </Typography>
                    <Divider style={{ marginBottom: theme.spacing(2) }} />
                    <Editor onChange={handleContentChange} id="copyright" />
                </Card>


                <Card className={classes.card} >
                    <Typography variant="h6" align="left"> {t('FAQ')} </Typography>
                    <Divider style={{ marginBottom: theme.spacing(2) }} />
                    <Editor onChange={handleContentChange} id="FAQ" />
                </Card>


                <Card className={classes.card} >
                    <Typography variant="h6" align="left"> {t('terms&Conditions')} </Typography>
                    <Divider style={{ marginBottom: theme.spacing(2) }} />
                    <Editor onChange={handleContentChange} id="terms" />
                </Card>


                <Card className={classes.card} >
                    <Typography variant="h6" align="left"> {t('contactUs')} </Typography>
                    <Divider style={{ marginBottom: theme.spacing(2) }} />
                    <Editor onChange={handleContentChange} id="contact" />
                </Card>

            </TabPanel>
        </React.Fragment>
    );
}