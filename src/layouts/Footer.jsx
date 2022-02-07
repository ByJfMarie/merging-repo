import { Container, Typography, Link } from "@mui/material";
import { useTheme } from '@emotion/react';
import t from "../services/Translation";
import { makeStyles } from "@mui/styles";

export default function Footer() {
    /** THEME */
    const theme = useTheme();

    const year = new Date().getFullYear()

    const useStyles = makeStyles({
        mainContainer: {

    
          [theme.breakpoints.up('md')]: {
            padding: '0px calc(20px + 5%) 0px calc(260px + 5%) !important',
          },
    
          [theme.breakpoints.between('sm', 'md')]: {
            padding: '0px 5% 0px !important',
          },
    
          [theme.breakpoints.down('sm')]: {
            padding: '0px 2% 0px !important',
          },
        },
      });
      const classes = useStyles();

    return (
        <Container maxWidth className={classes.mainContainer} style={{ backgroundColor: theme.palette.menu.background, position: 'absolute !important', bottom: '0 !important',color: '#b0b0b0', marginTop: '20px', textAlign :"center" }}>
            <Typography style={{ color: "#b0b0b0" }}>
                {year} © Perennity
            </Typography>


            <Link style={{ margin: theme.spacing(1) }} underline="none">
                {t('contactUs')}
            </Link>

            -

            <Link style={{ margin: theme.spacing(1) }} underline="none">
                FAQ
            </Link>

            -

            <Link style={{ margin: theme.spacing(1) }} underline="none">
                {t('privacyPolicy')}
            </Link>

            -

            <Link style={{ margin: theme.spacing(1) }} underline="none">
                {t("terms&Conditions")}
            </Link>
        </Container>
    )
}