import React from 'react';
import {Divider, Typography, Container, Grid, FormControl, InputLabel, Box} from "@mui/material";
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../translations/i18n";

import RemoteAETLayout from '../layouts/remoteAET';
import RetrievingLayout from '../layouts/retrieveStatus';
import QueryAETSelect from "../layouts/remoteAET/QueryAETSelect";

export default function AET() {
    const { t } = useTranslation('common');

    /** THEME */
    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            "& .MuiFilledInput-underline:after": {
                borderBottomColor: theme.palette.input.borderBottom
            },
            "& .MuiInputBase-root.Mui-focused": {
                boxShadow: '0px 0px 5px 2px rgba(45, 180, 235,0.60)'
            }
        }
    })

    const classes = useStyles();

    const [currentAET, setCurrentAET] = React.useState("");

    const [forceRefreshStatus, setForceRefreshStatus] = React.useState(null);
    const handleActionTrigger = () => {
        setForceRefreshStatus(!forceRefreshStatus);
    }

    return (
        <React.Fragment>
            <Container maxWidth="false"
                       style={{display: "flex", margin: 0, padding: 0, justifyContent: 'space-between'}}>

                <Typography
                    variant="h4"
                    style={{textAlign: 'left', color: theme.palette.primary.main, width: "300px", marginTop: "auto"}}
                >
                    <Grid container direction="row" alignItems="center">
                        <TravelExploreIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.remote_aet')}
                    </Grid>
                </Typography>

                <FormControl className={classes.root} variant="filled" style={{width: "300px"}}>
                    <InputLabel id="aet">{t("filters.aet")}</InputLabel>
                    <QueryAETSelect
                        queryRetrieve={true}
                        currentAet={currentAET}
                        setCurrentAET={setCurrentAET}
                    />
                </FormControl>

            </Container>

            <Container style={{padding: 0}}>
                <Grid container spacing={2} style={{marginBottom: '15px'}} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={12} md={6}>

                    </Grid>
                </Grid>

            </Container>

            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <RemoteAETLayout
                currentAET={currentAET}
                actiontrigger={handleActionTrigger}
                page="remote_aets"
            />

            <RetrievingLayout
                page="retrieving"
                forceRefresh={forceRefreshStatus}
                autoRefresh={true}
            />

        </React.Fragment>
    );
}