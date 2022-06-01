import {Card, CardContent, Grid, Button, Alert, Snackbar} from '@mui/material';
import {useTheme} from '@emotion/react';
import t from "../../../services/Translation";
import React from "react";
import TablePlugins from "../../../components/settings/plugins/Table";

export default function Plugins() {
    const theme = useTheme();

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

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
            <Card style={{
                backgroundColor: theme.palette.card.color,
                width: "100% !important",
                padding: '25px 0px',
                margin: '0px 0px'
            }}>
                <CardContent>
                    <Grid container spacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs/>

                        <Grid item>
                            <Button variant="contained" component="label">{t('force_refresh')}</Button>
                        </Grid>
                    </Grid>
                    <TablePlugins
                        filters={null}
                        forceRefresh={null}
                        alertMessage={(message) => setMessage(message)}
                    />
                </CardContent>
            </Card>
        </>
    )
}
