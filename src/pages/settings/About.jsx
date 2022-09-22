import React from 'react';
import {Typography, Divider, Link, Card, CardContent, Grid, Box} from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import SystemService from "../../services/api/system.service";
import InfoIcon from '@mui/icons-material/Info';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";

const About = () => {
    const { t } = useTranslation('settings');

    /** THEME */
    const theme = useTheme();

    const useStyles = makeStyles({
        spaceAfter: {
            marginRight: "20px !important",
        },

        div: {
            display: "flex",
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column'
            }
        }

    });
const classes = useStyles();

    const [version, setVersion] = React.useState({
        version: '',
        build: ''
    });
    const refresh = async () => {
        const response = await SystemService.getVersion();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setVersion(response.items);
    }

    React.useEffect(() => {
        refresh();
    }, []);

return (
    <React.Fragment>

        <Typography
            variant="h4"
            style={{textAlign: 'left', color: theme.palette.primary.main}}
        >
            <Grid container direction="row" alignItems="center">
                <InfoIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.about')}
            </Grid>
        </Typography>

        <Divider style={{ marginBottom: theme.spacing(2) }} />

        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <Typography variant="h6" >Perennity iMAGE Portal</Typography>
                <Typography variant="h6" >{t("fields.version")} {version.version} {t("fields.build")} {version.build}</Typography>
                <br/>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>{t("texts.our_website")}</Typography>
                    <Typography ><Link href='https://perennity.io'>https://perennity.io</Link></Typography>
                </div>

                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>{t("texts.technical_support")}</Typography>
                    <Typography ><Link href='#'>support@perennity.io</Link></Typography>
                </div>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>{t("texts.license_request")}</Typography>
                    <Typography ><Link href='#'>license@perennity.io</Link></Typography>
                </div>
            </CardContent>
        </Card>

    </React.Fragment>
)
}
export default About