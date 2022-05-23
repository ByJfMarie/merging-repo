import {Box, Card, CardContent, Divider, Grid, Link, Stack, Typography} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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

    function serviceStatusComponent(name, operational) {
        return (
            <>
                <Grid item xs={8}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        {
                            operational ?
                                <><CheckCircleIcon color="success"></CheckCircleIcon> {name}</>
                                : <><CancelIcon color="error"></CancelIcon> {name}</>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Stack direction="row" justifyContent="end">
                        {
                            operational ?
                                <Box sx={{color: 'success.main'}}>Started</Box>
                                : <Box sx={{color: 'error.main'}}>Stopped</Box>
                        }

                    </Stack>
                </Grid>
            </>
        );
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                    <CardContent>
                        <CheckCircleIcon color="success"></CheckCircleIcon> All Systems Operational
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Perennity Core
                        </Typography>

                        <Grid container spacing={2} p={4}>
                            {serviceStatusComponent("DICOM Module", false)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Storage Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Replication Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Cleaning Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Forwarding Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Notifications Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Permissions Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Printing Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Report Retrieving Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Transfer Module", true)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                        </Grid>

                        {
                            /*<div className={classes.div}>
                                <Typography className={classes.spaceAfter}>Perennity Update</Typography>
                                <Typography style={{marginRight: '12px'}}><Link>{t('stop')}</Link></Typography>
                                <Typography ><Link>{t('restart')}</Link></Typography>
                            </div>*/
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            System
                        </Typography>

                        <Grid container spacing={2} p={4}>
                            {serviceStatusComponent("Network", false)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                            {serviceStatusComponent("Database", false)}
                            <Grid item xs={12}><Divider></Divider></Grid>

                        </Grid>

                        {
                            /*<div className={classes.div}>
                                <Typography className={classes.spaceAfter}>Perennity Update</Typography>
                                <Typography style={{marginRight: '12px'}}><Link>{t('stop')}</Link></Typography>
                                <Typography ><Link>{t('restart')}</Link></Typography>
                            </div>*/
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}