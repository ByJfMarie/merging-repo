
import { Card, CardContent, TextField, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";

export default function Database() {
    /** STYLE & THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%'
        },
        tableCell: {
            padding: "0px 16px !important",
            height: "50px !important",
            borderColor: theme.palette.textfield.border + " !important",
        },
        hover: {
            "&:hover": {
                transition: '0.3s',
                backgroundColor: theme.palette.table.hover + "! important"
            },
            height: "50px ! important",
            backgroundColor: theme.palette.textfield.background + "! important"
        },

    });
    const classes = useStyles();

    return (
        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item xs={9}>
                        <TextField className={classes.field} id="filled-basic" label={t("host")} variant="standard" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField className={classes.field} id="filled-basic" label={t("port")} variant="standard" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField style={{ width: '100%' }} id="filled-basic" label={t("user")} variant="standard" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField style={{ width: '100%' }} id="filled-basic" label={t("password")} variant="standard" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField style={{ width: '100%' }} id="filled-basic" label={t("database_name")} variant="standard" />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>)
}