import React from 'react';
//import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Link } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import t from "../services/Translation";
import NotificationsDropdown from '../components/NotificationsDropdown';
/** ICONS */
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DescriptionIcon from '@mui/icons-material/Description';
import MediationIcon from '@mui/icons-material/Mediation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import Badge from '@mui/material/Badge';
import LocationOn from '@mui/icons-material/LocationOn';
// import NotificationsIcon from '@mui/icons-material/Notifications';

import AuthService from '../services/api/auth.service';

/** SIDEBAR MENU SIZE */
const drawerWidth = 240;
const location = window.location.pathname;

function Menu(props) {
    /** THEME AND CSS */
    const theme = useTheme();
    const useStyles = makeStyles({
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
    });
    const classes = useStyles();

    /** DROPDOWN MENU ON MOBILE */
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    /** HIDE MENU ITEMM */
    const [items] = React.useState([]);

    let priviledges = AuthService.getCurrentUser().priviledges;
    if (priviledges) {
        Object.keys(priviledges.privileges.pages).map((page) => {
            return (items.push(page))
        })
    }

    const handleLogoutClick = () => {
        AuthService.logout();
    };

    /** LIST OF ITEMS */
    const drawer = (
        <div>
            <Toolbar>
                <Link href="/" underline="none" style={{ display: "flex", alignItems: 'center' }}>
                    <img src="/images/perennity.png" alt="Logo" height="50" width="50" />
                    <Typography variant="h6" noWrap component="div" color={'#2db5e9'}>
                        PERENNITY
                    </Typography>
                </Link>
            </Toolbar>

            <Divider classes={{ root: classes.divider }} />

            <List>
                {items.indexOf('home') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/" selected={location === '/'}>
                        <HomeIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("home")} />
                    </ListItem>
                )}

                {items.indexOf('studies') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/studies" selected={location === '/studies'} >
                        <SearchIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("studies")} />
                    </ListItem>
                )}

                {items.indexOf('aet') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/aet" selected={location === '/aet'}>
                        <LocationOn />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("remote_aet")} />
                    </ListItem>
                )}

                {items.indexOf('forwarding') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/forwarding" selected={location === '/forwarding'}>
                        <ForwardToInboxIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("forwarding")} />
                    </ListItem>
                )}

                {items.indexOf('transfer') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/transfer" selected={location === '/transfer'} >
                        <CompareArrowsIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("transfer")} />
                    </ListItem>
                )}

                {/*items.indexOf('media_output') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/media_output" selected={location === '/media_output'}>
                        <MediationIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("media_output")} />
                    </ListItem>
                )*/}

            </List>

            <Divider classes={{ root: classes.divider }} />

            <List>
                {items.indexOf('settings') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/site" >
                        <SettingsIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("settings")} />
                    </ListItem>
                )}

                {items.indexOf('logs') !== -1 && (
                    <ListItem button classes={{ selected: classes.selected }} component="a" href="/logs" selected={location === '/logs'} >
                        <DescriptionIcon />
                        <ListItemText style={{ marginLeft: theme.spacing(2) }} primary={t("logs")} />
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
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        style={{ marginLeft: '240px', color: theme.palette.menu.text }}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Grid container style={{ color: theme.palette.menu.text }}>
                        <Grid item xs />

                        <Grid item className={classes.userNameGrid}>
                            <Typography variant="" noWrap style={{ fontWeight: "", marginTop: '5px' }}>
                                Firstname Lastname
                            </Typography>
                        </Grid>

                        <Grid item style={{ paddingRight: '12px' }}>
                            <Link href="/profile">
                                <IconButton style={{ color: theme.palette.menu.text }}>
                                    <AccountCircleIcon style={{ transform: 'scale(1.2)' }} />
                                </IconButton>
                            </Link>
                        </Grid>

                        {/* <Grid item style={{ paddingRight: '12px' }}>
              <IconButton style={{ color: theme.palette.menu.text }}>
                <Badge
                  badgeContent={4}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#2db4eb"
                    }
                  }}>
                  <NotificationsIcon style={{ transform: 'scale(1.2)', color: theme.palette.menu.text }} />
                </Badge>
              </IconButton>
            </Grid> */}

                        <Grid item style={{ paddingRight: '12px' }}>
                            <NotificationsDropdown />
                        </Grid>

                        <Grid item style={{ paddingRight: '12px' }}>
                            <IconButton style={{ color: theme.palette.menu.text }} onClick={handleLogoutClick}>
                                <ExitToAppIcon style={{ transform: 'scale(1.2)' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
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

export default Menu;
