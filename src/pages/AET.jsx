import React from 'react';
import {Divider, Typography, Container, Grid, FormControl, InputLabel} from "@mui/material";
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import t from "../services/Translation";
import TableRemoteStudies from '../components/remoteAET/TableRemoteStudies';
import TableRetrievingStatus from '../components/retrieveStatus/TableRetrievingStatus';
import QueryAETSelect from "../components/remoteAET/QueryAETSelect";

export default function AET() {
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

                <Typography variant="h4" style={{
                    textAlign: 'left',
                    color: theme.palette.primary.main,
                    width: "300px",
                    marginTop: "auto"
                }}> {t('remote_aet')} </Typography>

                <FormControl className={classes.root} variant="filled" style={{width: "300px"}}>
                    <InputLabel id="aet">AET</InputLabel>
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

            <TableRemoteStudies
                currentAET={currentAET}
                actiontrigger={handleActionTrigger}
                page="aet"
            />

            <TableRetrievingStatus
                page="aet"
                forceRefresh={forceRefreshStatus}
                autoRefresh={false}
            />

        </React.Fragment>
    );
}