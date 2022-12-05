import {Card, CardContent, Grid, Button} from '@mui/material';
import {useTheme} from '@emotion/react';
import React from "react";
import TablePlugins from "../../../layouts/settings/plugins";

/** Translation */
import { useTranslation } from 'react-i18next';
import {makeStyles} from "@mui/styles";

export default function Plugins() {
    const { t } = useTranslation('system');

    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        }
    });
    const classes = useStyles();

    /** FORCE REFRESH */
    const [forceRefresh, setForceRefresh] = React.useState(false);

    return (
        <>
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
                                {t('tab_plugins.actions.force_refresh')}
                            </Button>
                        </Grid>
                    </Grid>
                    <TablePlugins
                        filters={null}
                        forceRefresh={forceRefresh}
                    />
                </CardContent>
            </Card>
        </>
    )
}
