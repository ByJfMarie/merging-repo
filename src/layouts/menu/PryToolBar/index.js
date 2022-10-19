import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Grid, Link, Menu, MenuItem, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Toolbar from "@mui/material/Toolbar";

import GeneralService from "../../../services/api/general.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import UserContext from "../../../components/UserContext";
import AuthService from "../../../services/api/auth.service";
import CustomDialogAbout from "./CustomDialogAbout";
import {useTranslation} from "react-i18next";

function PryToolBar(props) {

    const { t } = useTranslation('common');

    const { user } = React.useContext(UserContext);

    /** THEME AND CSS */
    const theme = useTheme();
    const classes = useStyles(theme);

    const [helpMenuAnchorEl, setHelpMenuAnchorEl] = React.useState(null);
    const helpMenuOpen = Boolean(helpMenuAnchorEl);
    const helpMenuHandleClick = (event) => {
        setHelpMenuAnchorEl(event.currentTarget);
    };
    const helpMenuHandleClose = () => {
        setHelpMenuAnchorEl(null);
    };

    // Manage Dialog About
    const [dialogAboutOpen, setDialogAboutOpen] = React.useState(false)
    const handleDialogAboutOpen = () => {
        setDialogAboutOpen(true)
    }
    const handleDialogAboutClose = () => {
        setDialogAboutOpen(false)
    }

    const handleLogoutClick = () => {
        AuthService.logout();
    };

    return (
        <>
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    style={{ marginLeft: '240px', color: theme.palette.menu.text }}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Grid container style={{ color: theme.palette.menu.text }}>
                    <Grid item xs />

                    <Grid item className={classes.userNameGrid}>
                        <Typography variant="" noWrap style={{ fontWeight: "", marginTop: '5px' }}>
                            <UserName
                                user={user}
                                trans={t}
                            />
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Link href="/profile">
                            <IconButton style={{ color: theme.palette.menu.text }}>
                                <AccountCircleIcon fontSize="medium" />
                            </IconButton>
                        </Link>
                    </Grid>

                    {/*<Grid item style={{ paddingRight: '12px' }}>
                                <NotificationsDropdown />
                            </Grid>*/
                    }

                    <Grid item>
                        <IconButton
                            style={{ color: theme.palette.menu.text }}
                            aria-controls={helpMenuOpen ? 'help-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={helpMenuOpen ? 'true' : undefined}
                            onClick={helpMenuHandleClick}
                        >
                            <HelpIcon fontSize="medium" />
                        </IconButton>
                    </Grid>
                    <Menu
                        id="help-menu"
                        anchorEl={helpMenuAnchorEl}
                        open={helpMenuOpen}
                        onClose={helpMenuHandleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            component={Link}
                            href={GeneralService.getHelpFileURL()}
                            target={"_blank"}
                            onClick={helpMenuHandleClose}
                        >
                            {t("menu.help")}
                        </MenuItem>
                        <MenuItem
                            onClick={() => {handleDialogAboutOpen(); helpMenuHandleClose();}}
                        >
                            {t("menu.about")}
                        </MenuItem>
                    </Menu>

                    <Grid item>
                        <IconButton style={{ color: theme.palette.menu.text }} onClick={handleLogoutClick}>
                            <ExitToAppIcon fontSize="medium" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>

            <CustomDialogAbout
                open={dialogAboutOpen}
                handleOpenDialog={handleDialogAboutOpen}
                handleCloseDialog={handleDialogAboutClose}
            />
        </>
    );
}

const UserName = ({user, trans}) => {
    let message = trans("texts.welcome");

    if (user) {
        if (user.first_name) {
            if (user.title) message += " "+trans("fields.title_value."+user.title);
            if (user.last_name) message += " "+user.last_name;
            if (user.first_name) message += " "+user.first_name;
        }
        else message += " "+user.login;
    }
    return <>{message}</>;
}

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

export default PryToolBar;