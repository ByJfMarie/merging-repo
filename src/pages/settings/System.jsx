import * as React from 'react';
import PropTypes from 'prop-types';
import {Typography, Divider, Tab, Tabs, Box, Grid} from '@mui/material';
import { useTheme } from '@emotion/react';
import "react-phone-input-2/lib/high-res.css";
import SettingsIcon from '@mui/icons-material/Settings';
import PryInfo from "../../components/PryInfo";

/** TABS */
import LocalServer from './systemTab/LocalServer';
import Storage from './systemTab/Storage';
import Database from './systemTab/Database';
import Reporting from './systemTab/Reporting';
import Forwarding from './systemTab/Forwarding';
import Transfer from './systemTab/Transfer';
import Plugins from './systemTab/Plugins';
import RemoteAET from './systemTab/RemoteAET';
import Backups from './systemTab/Backups';
//import MediaBurner from './systemTab/MediaBurner';

/** Translation */
import { useTranslation } from 'react-i18next';


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
                <Box sx={{ p: 3 }} style={{padding : "30px 0px"}}>
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

export default function System() {
    const { t } = useTranslation('settings');

    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <SettingsIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.system')}
                </Grid>
            </Typography>

            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons allowScrollButtonsMobile>
                    <Tab label={t('titles.local_server')} {...a11yProps(0)} />
                    <Tab label={t('titles.storage')} {...a11yProps(1)} />
                    <Tab label={t('titles.remote_aets')} {...a11yProps(2)} />
                    <Tab label={t('titles.forwarding')} {...a11yProps(3)} />
                    <Tab label={t('titles.transfer')} {...a11yProps(4)} />
                    {
                        //<Tab label={t('media_burner')} {...a11yProps(5)} />
                    }
                    <Tab label={t('titles.reporting')} {...a11yProps(5)} />
                    <Tab label={t('titles.database')} {...a11yProps(6)} />
                    <Tab label={t('titles.plugins')} {...a11yProps(7)} />
                    <Tab label="Backups" {...a11yProps(8)} />
                    {
                        //<Tab label={t('status')} {...a11yProps(8)} />
                    }
                </Tabs>
            </Box>

            {/* LOCAL SERVER */}
            <TabPanel value={value} index={0} >
                <PryInfo
                    text={t("info.system_localServer")}
                />
                <LocalServer />
            </TabPanel>

            {/* STORAGE */}
            <TabPanel value={value} index={1} >
                <PryInfo
                    text={t("info.system_storage")}
                />
                <Storage />
            </TabPanel>

            {/* REMOTE AET */}
            <TabPanel value={value} index={2} >
                <PryInfo
                    text={t("info.system_remoteAets")}
                />
                <RemoteAET />
            </TabPanel>

            {/* FORWARDING */}
            <TabPanel value={value} index={3} >
                <PryInfo
                    text={t("info.system_forwarding")}
                />
                <Forwarding />
            </TabPanel>

            {/* TRANSFER */}
            <TabPanel value={value} index={4} >
                <PryInfo
                    text={t("info.system_transfer")}
                />
                <Transfer />
            </TabPanel>

            {/* REPORTING */}
            <TabPanel value={value} index={5} >
                <PryInfo
                    text={t("info.system_reporting")}
                />
                <Reporting />
            </TabPanel>

            {/* DATABASE */}
            <TabPanel value={value} index={6} >
                <PryInfo
                    text={t("info.system_database")}
                />
                <Database />
            </TabPanel>

            {/* PLUGINS */}
            <TabPanel value={value} index={7} >
                <PryInfo
                    text={t("info.system_plugins")}
                />
                <Plugins />
            </TabPanel>

            {/* BACKUPS */}
            <TabPanel value={value} index={8} >
                <PryInfo
                    text="Configure and manage backups of Perennity App"
                />
                <Backups />
            </TabPanel>

        </React.Fragment>
    );
}