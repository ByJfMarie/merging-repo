import {Container, Typography, Link} from "@mui/material";
import {useTheme} from '@emotion/react';
import t from "../services/Translation";
import {makeStyles} from "@mui/styles";

export default function Footer() {
    /** THEME */
    const theme = useTheme();

    const year = new Date().getFullYear()

    const useStyles = makeStyles({
        mainContainer: {
        },
    });
    const classes = useStyles();

    const style = {
        backgroundColor: theme.palette.menu.background,
        //position: 'absolute !important',
        position: 'fixed',
        left: "0",
        bottom: '0',
        color: '#b0b0b0',
        marginTop: '20px',
        textAlign: "center",
        width: "100%"
    }

    return (
        <div className={classes.mainContainer} style={style}>
            <Typography style={{color: "#b0b0b0"}}>
                {year} © Perennity
            </Typography>


            <Link style={{margin: theme.spacing(1)}} underline="none">
                {t('contactUs')}
            </Link>

            -

            <Link style={{margin: theme.spacing(1)}} underline="none">
                FAQ
            </Link>

            -

            <Link style={{margin: theme.spacing(1)}} underline="none">
                {t('privacyPolicy')}
            </Link>

            -

            <Link style={{margin: theme.spacing(1)}} underline="none">
                {t("terms&Conditions")}
            </Link>
        </div>
    )
}