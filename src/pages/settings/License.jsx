import React from 'react';
import { Typography, Divider, Link, Card, CardContent, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../services/Translation";

const License = () => {
    /** THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%',
            marginBottom: '15px !important',
        }
    });
    const classes = useStyles();

    return (
        <React.Fragment>

            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('license')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                <CardContent>
                    <TextField className={classes.field} id="filled-basic" label={t("serial")} variant="standard" />
                    <TextField className={classes.field} id="filled-basic" label={t("computer_id")} variant="standard" />
                    <TextField className={classes.field} id="filled-basic" label={t("exp_date")} variant="standard" />
                    <TextField className={classes.field} id="filled-basic" label={t("amp_valid_until")} variant="standard" />
                
                    <Typography variant="h6" style={{ textAlign: 'left', marginTop: '15px' }} ><Link>Upload License File</Link></Typography>
                </CardContent>
            </Card>

        </React.Fragment>
    )
}
export default License