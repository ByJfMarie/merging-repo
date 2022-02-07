import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Container, Tab, Tabs, Box, Card, CardContent, TextField, Stack, Grid, FormGroup, FormControl, Select, MenuItem, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../services/Translation";
import Editor from "../../components/Editor.jsx"
import "react-phone-input-2/lib/high-res.css";

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

/** TABS FUNCTION */
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Emailing() {
    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%'
        },

        gap: {
            paddingLeft: "200px !important",

            [theme.breakpoints.down('sm')]: {
                padding: '24px !important',
            },
        },
    });
    const classes = useStyles();

    /** TABS INDEX FUNCTION */
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleContentChange = (html) => {
        console.log(html)
    }

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }}> {t("emailing")}  </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t('general')} {...a11yProps(0)} />
                    <Tab label={t('templates')} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <SwipeableViews
                axis='x'
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir="ltr">
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
                                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                                    <Grid item xs={9}>
                                        <TextField className={classes.field} id="filled-basic" label={t("host")} variant="standard" />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField className={classes.field} id="filled-basic" label={t("port")} variant="standard" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField style={{ width: '100%' }} id="filled-basic" label={t("from")} variant="standard" />
                                    </Grid>
                                </Grid>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label={t("authentification")} />
                                </FormGroup>

                                <Container className={classes.gap} style={{ marginBottom: '15px', display: " flex", flexDirection: 'column' }}>
                                    <TextField style={{ maxWidth: '400px' }} id="filled-basic" label={t("user")} variant="standard" />
                                    <TextField style={{ maxWidth: '400px' }} id="filled-basic" label={t("password")} variant="standard" />
                                    <TextField style={{ maxWidth: '400px' }} id="filled-basic" label={t("security")} variant="standard" />
                                </Container>

                            </Stack>
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel value={value} index={1} dir="ltr">
                    <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '10px' }}>

                        <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth variant="standard" style={{ width: "100%", padding: "0px" }}>
                                    <InputLabel>{t('template')}</InputLabel>
                                    <Select
                                        labelId="template"
                                    >
                                        <MenuItem value={10}>Activation Request</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item md={6} xs={0}></Grid>
                             
                            <Grid item md={6} xs={12}>
                                <TextField id="Subject" label={t('subject')} variant="standard" style={{ marginBottom: "10px", width: "100%" }} />
                            </Grid>
                        </Grid>

                        <Divider />
                        <Editor onChange={handleContentChange} id="body" />

                    </Card>
                </TabPanel>
            </SwipeableViews>
        </React.Fragment >
    );
}