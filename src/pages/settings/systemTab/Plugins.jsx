import {Card, CardContent, Grid, Button, Alert, Snackbar} from '@mui/material';
import {useTheme} from '@emotion/react';
import React from "react";
import TablePlugins from "../../../layouts/settings/plugins";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../translations/i18n";
import {makeStyles} from "@mui/styles";

export default function Plugins() {
    const { t } = useTranslation('settings');

    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        }
    });
    const classes = useStyles();

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    /** FORCE REFRESH */
    const [forceRefresh, setForceRefresh] = React.useState(false);

    return (
        <>
            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={() => {
                          setMessage({...message, show: !message.show})
                      }}>
                <Alert onClose={() => {
                    setMessage({...message, show: !message.show})
                }} severity={message.severity} sx={{width: '100%'}}>
                    {message.message}
                </Alert>
            </Snackbar>
            <Card className={classes.card} style={{
                backgroundColor: theme.palette.card.color,
                width: "100% !important",
            }}>
                <CardContent>
                    <Grid container spacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs/>

                        <Grid item>
                            <Button
                                variant="outlined"
                                component="label"
                                onClick={() => {setForceRefresh(!forceRefresh);}}
                            >
                                {t('buttons.force_refresh')}
                            </Button>
                        </Grid>
                    </Grid>
                    <TablePlugins
                        filters={null}
                        forceRefresh={forceRefresh}
                        alertMessage={(message) => setMessage(message)}
                    />
                </CardContent>
            </Card>
        </>
    )
}
