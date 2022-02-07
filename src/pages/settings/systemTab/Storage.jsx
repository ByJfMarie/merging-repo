
import { Card, CardContent, TextField, Grid, FormGroup, FormControlLabel, Checkbox, Stack, Container, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";

export default function Storage() {
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

        gap: {
            paddingLeft: "200px !important",
            marginBottom: '15px',
            display: " flex",
            flexDirection: 'column',

            [theme.breakpoints.down('sm')]: {
                padding: '24px !important',
            },
        },


    });
    const classes = useStyles();

    return (
        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", paddingLeft: '10px', paddingRight: '0px' }}>
            <CardContent>
                <Stack
                    component="form"
                    sx={{
                        width: '100%'
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <TextField className={classes.field} id="filled-basic" label={t("storage_path")} variant="standard" />
                        <TextField className={classes.field} id="filled-basic" label={t("secondary_path")} variant="standard" />
                        <TextField className={classes.field} id="filled-basic" label={t("from")} variant="standard" />
                    </Grid>

                    <div style={{ marginBottom: '15px', display: "flex" }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label={t("keep_images_for")} />
                        </FormGroup>
                        <TextField style={{ width: '50px' }} id="filled-basic" variant="standard" />
                        <Typography style={{ marginLeft: '10px' ,marginTop: '8px' }}>{t("days")}</Typography>
                    </div>

                    <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label={t("capacity_treshold")} />
                        </FormGroup>

                    <Container maxWidth="md" className={classes.gap} >

                        <TextField className={classes.field} id="filled-basic" label={t("maximum")} variant="standard" />
                        <TextField className={classes.field} id="filled-basic" label={t("drop_to")} variant="standard" />
                    </Container>


                </Stack>
            </CardContent>
        </Card>)
}