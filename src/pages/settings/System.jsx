import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Tab, Tabs, Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import "react-phone-input-2/lib/high-res.css";

/** TABS */
import LocalServer from './systemTab/LocalServer';
import Storage from './systemTab/Storage';
import Database from './systemTab/Database';
import Reporting from './systemTab/Reporting';
import Forwarding from './systemTab/Forwarding';
import Transfer from './systemTab/Transfer';
import Plugins from './systemTab/Plugins';
import RemoteAET from './systemTab/RemoteAET';
//import MediaBurner from './systemTab/MediaBurner';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";

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
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('titles.system')} </Typography>
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
                    {
                        //<Tab label={t('status')} {...a11yProps(8)} />
                    }
                </Tabs>
            </Box>

            {/* LOCAL SERVER */}
            <TabPanel value={value} index={0} dir="ltr">
                <LocalServer />
            </TabPanel>

            {/* STORAGE */}
            <TabPanel value={value} index={1} dir="ltr">
                <Storage />
            </TabPanel>

            {/* REMOTE AET */}
            <TabPanel value={value} index={2} dir="ltr">
                <RemoteAET />
            </TabPanel>

            {/* FORWARDING */}
            <TabPanel value={value} index={3} dir="ltr">
                <Forwarding />
            </TabPanel>

            {/* TRANSFER */}
            <TabPanel value={value} index={4} dir="ltr">
                <Transfer />
            </TabPanel>

            {/* MEDIA BURNER */}
            {/*<TabPanel value={value} index={5} dir="ltr">
                <MediaBurner />
            </TabPanel>*/}

            {/* REPORTING */}
            <TabPanel value={value} index={5} dir="ltr">
                <Reporting />
            </TabPanel>

            {/* DATABASE */}
            <TabPanel value={value} index={6} dir="ltr">
                <Database />
            </TabPanel>

            {/* PLUGINS */}
            <TabPanel value={value} index={7} dir="ltr">
                <Plugins />
            </TabPanel>

            {/* STATUS */}
            {/*<TabPanel value={value} index={8} dir="ltr">
                <Status />
            </TabPanel>*/}

        </React.Fragment>
    );
}