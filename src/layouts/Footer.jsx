import {Typography, Link} from "@mui/material";
import {useTheme} from '@emotion/react';
import t from "../services/Translation";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        backgroundColor: theme.palette.menu.background,
        //position: 'absolute !important',
        position: 'fixed',
        left: "0",
        bottom: '0',
        color: '#b0b0b0',
        marginTop: '20px',
        textAlign: "center",
        width: "100%"
    },
    link: {
        margin: theme.spacing(1)
    }
}));

export default function Footer() {
    /** THEME */
    const theme = useTheme();
    const classes = useStyles(theme);

    const year = new Date().getFullYear()

    return (
        <div className={classes.mainContainer}>
            <Typography style={{color: "#b0b0b0"}}>
                {year} © Perennity
            </Typography>


            <Link className={classes.link} underline="none">
                {t('contactUs')}
            </Link>

            -

            <Link className={classes.link} underline="none">
                FAQ
            </Link>

            -

            <Link className={classes.link} underline="none">
                {t('privacyPolicy')}
            </Link>

            -

            <Link className={classes.link} underline="none">
                {t("terms&Conditions")}
            </Link>
        </div>
    )
}