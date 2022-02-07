import { Card, CardContent, Link, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";

export default function Status() {
    const theme = useTheme();
    const useStyles = makeStyles({
        spaceAfter: {
            marginRight: "15px !important",
        },

        div: {
            display: "flex",
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'flex'
            }
        }

    });
    const classes = useStyles();

    return (
        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>Perennity Core</Typography>
                    <Typography style={{marginRight: '12px'}}><Link>{t('stop')}</Link></Typography>
                    <Typography ><Link>{t('restart')}</Link></Typography>
                </div>

                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>Perennity REST</Typography>
                    <Typography style={{marginRight: '12px'}}><Link>{t('stop')}</Link></Typography>
                    <Typography ><Link>{t('restart')}</Link></Typography>
                </div>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>Perennity Licensing</Typography>
                    <Typography style={{marginRight: '12px'}}><Link>{t('stop')}</Link></Typography>
                    <Typography ><Link>{t('restart')}</Link></Typography>
                </div>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>Perennity Update</Typography>
                    <Typography style={{marginRight: '12px'}}><Link>{t('stop')}</Link></Typography>
                    <Typography ><Link>{t('restart')}</Link></Typography>
                </div>
            </CardContent>
        </Card>)
}