import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { Link } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import GeneralService from "../../../services/api/general.service";
import UserContext from "../../../components/UserContext";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../translations/i18n";

/** ICONS */
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import DescriptionIcon from '@mui/icons-material/Description';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PryToolBar from "../PryToolBar";

/** SIDEBAR MENU SIZE */
const drawerWidth = 240;
const location = window.location.pathname;

const useStyles = makeStyles((theme) => ({
    paper: {
        background: theme.palette.menu.background + ' !important',
        color: '#fff !important',
        fontWeight: 'bold',
    },
    selected: {
        '&.Mui-selected': {
            fontWeight: 500,
            color: theme.palette.primary.main
        }
    },
    divider: {
        // Theme Color, or use css color in quote
        background: theme.palette.menu.divider,
    },
    div: {
        borderRight: '0px !important'
    },

    userNameGrid: {
        paddingTop: '8px',
        paddingRight: '12px',
        [theme.breakpoints.down('md')]: {
            display: "none",
        },
    }
}));

function PrySideBar(props) {
    const { t } = useTranslation('common');

    /** THEME AND CSS */
    const theme = useTheme();
    const classes = useStyles(theme);

    /** DROPDOWN MENU ON MOBILE */
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    /** User & privileges */
    const { user, privileges } = React.useContext(UserContext);

    /** LIST OF ITEMS */
    const drawer = (
        <div>
            <Toolbar>
                <Link href="/studies" underline="none" style={{ display: "flex", alignItems: 'center' }}>
                    <img src={GeneralService.getLogoURL()} alt="Logo" width="100%"/>
                </Link>
            </Toolbar>

            <Divider classes={{ root: classes.divider }} />

            <List>
                {/*privileges.pages.indexOf('home') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/" selected={location === '/'}>
                        <HomeIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("home")} />
                    </ListItem>
                )*/}

                {privileges.pages.indexOf('studies') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/studies" selected={location === '/studies'} >
                        <SearchIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.studies")} />
                    </ListItem>
                )}

                {privileges.pages.indexOf('aet') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/aet" selected={location === '/aet'}>
                        <TravelExploreIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.remote_aet")} />
                    </ListItem>
                )}

                {privileges.pages.indexOf('forwarding') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/forwarding" selected={location === '/forwarding'}>
                        <FastForwardIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.forwarding")} />
                    </ListItem>
                )}

                {privileges.pages.indexOf('transfer') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/transfer" selected={location === '/transfer'} >
                        <ConnectingAirportsIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.transfer")} />
                    </ListItem>
                )}

                {/*privileges.pages.indexOf('media_output') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/media_output" selected={location === '/media_output'}>
                        <MediationIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("media_output")} />
                    </ListItem>
                )*/}

            </List>

            <Divider classes={{ root: classes.divider }} />

            <List>
                {privileges.pages.indexOf('settings') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/site" >
                        <SettingsIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.settings")} />
                    </ListItem>
                )}

                {privileges.pages.indexOf('logs') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/logs" selected={location === '/logs'} >
                        <DescriptionIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.logs")} />
                    </ListItem>
                )}
            </List>

        </div>
    );

    /** DISPLAY SIDEBAR MENU */
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar
                style={{ marginLeft: '-240px', width: 'calc(100% + 240px)' }}
                position="fixed"
                sx={{ background: 'transparent', backgroundColor: theme.palette.menu.background + " !important" }}
            >
                <PryToolBar
                    handleDrawerToggle={handleDrawerToggle}
                />
            </AppBar>


            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
                color="menu"
            >
                <Drawer
                    classes={{ paper: classes.paper }}
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '0px !important', borderTop: '0px !important' }
                    }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    classes={{ paper: classes.paper }}
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '0px !important', borderTop: '0px !important' }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box >
    );
}

export default PrySideBar;
