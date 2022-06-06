import React from 'react';
import { Typography, Divider, Link, Card, CardContent } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import t from "../../services/Translation";
import SystemService from "../../services/api/system.service";

const About = () => {
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

        <Typography variant="h4" style={{ color: theme.palette.primary.main }} > {t('about')} </Typography>
        <Divider style={{ marginBottom: theme.spacing(2) }} />

        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <Typography variant="h6" >Perennity iMAGE Portal</Typography>
                <Typography variant="h6" >Version {version.version} build {version.build}</Typography>
                <br/>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}> Our Website </Typography>
                    <Typography ><Link href='https://perennity.io'>https://perennity.io</Link></Typography>
                </div>

                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>Technical support</Typography>
                    <Typography ><Link href='#'>support@perennity.io</Link></Typography>
                </div>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>Request a license</Typography>
                    <Typography ><Link href='#'>license@perennity.io</Link></Typography>
                </div>
            </CardContent>
        </Card>

    </React.Fragment>
)
}
export default About