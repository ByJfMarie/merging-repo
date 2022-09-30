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
import UserContext from "../../../components/UserContext";
import AuthService from "../../../services/api/auth.service";
import GeneralService from "../../../services/api/general.service";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../translations/i18n";

/** ICONS */
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
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

function PrySideBarSettings(props) {
    const { t } = useTranslation('settings');

    /** User & privileges */
    const { user, privileges } = React.useContext(UserContext);

    /** THEME AND CSS */
    const theme = useTheme();
    const classes = useStyles(theme);

    /** DROPDOWN MENU ON MOBILE */
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleLogoutClick = () => {
        AuthService.logout();
    };

    const UserName = function() {
        if (!user) return <>{"Hello"}</>;
        if (user.last_name)return <>{user.title}+" "+{user.last_name}+" "+{user.first_name}</>;
        return  <>{user.login}</>;
    }

    /** LIST OF ITEMS */
    const drawer = (
        <div>
            <Toolbar>
                <Link href="/studies" underline="none" style={{ display: "flex", alignItems: 'center' }}>
                    <img src={GeneralService.getLogoURL()} alt="Logo" width="100%"  style={{minHeight: "64px"}}/>
                </Link>
            </Toolbar>

            <Divider classes={{ root: classes.divider }} />

            <List>

                <ListItem >
                    <ListItemText primary={t("titles.settings")} />
                </ListItem>

                <Divider classes={{ root: classes.divider }} />

                <ListItem button classes={{ selected: classes.selected }} component="a" href="/site" selected={location === '/site'} >
                    <DesignServicesIcon />
                    <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.site")} />
                </ListItem>

                <ListItem button classes={{ selected: classes.selected }} component="a" href="/users" selected={location === '/users'}>
                    <GroupIcon />
                    <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.users")} />
                </ListItem>

                <ListItem button classes={{ selected: classes.selected }} component="a" href="/roles" selected={location === '/roles'}>
                    <LockIcon />
                    <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.roles_perm")} />
                </ListItem>

                <ListItem button classes={{ selected: classes.selected }} component="a" href="/emailing" selected={location === '/emailing'} >
                    <EmailIcon />
                    <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.emailing")} />
                </ListItem>

                <ListItem button classes={{ selected: classes.selected }} component="a" href="/system" selected={location === '/system'} >
                    <SettingsIcon />
                    <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.system")} />
                </ListItem>

                <ListItem button classes={{ selected: classes.selected }} component="a" href="/license" selected={location === '/license'} >
                    <ReceiptLongIcon />
                    <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.license")} />
                </ListItem>

            </List>

            <Divider classes={{ root: classes.divider }} />

            <List>

                <ListItem button classes={{ selected: classes.selected }} component="a" href="/studies" selected={location === '/studies'} >
                    <ArrowBackIcon />
                    <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("menu.back")} />
                </ListItem>
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

export default PrySideBarSettings;
