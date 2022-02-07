import React from 'react'
import { TextField, Typography, FormControlLabel, FormControl, Checkbox, InputLabel, Select, MenuItem, Box, Divider, Grid } from '@mui/material';

import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../../../services/Translation";


export default function CONF_Encrypt() {
    const theme = useTheme();
    const useStyles = makeStyles({
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important"
        },
        field: {
            width: '100%'
        },

    });
    const classes = useStyles();

    return (
        <>
            <Box style={{ backgroundColor: theme.palette.dialog.color, width: "100% !important"}}>
                <Typography variant="h5" style={{ color: theme.palette.primary.main }} > {t('encrypt_media')} </Typography>
                <Divider style={{ marginBottom: theme.spacing(2) }} />

                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item md={2} xs={6} >
                        <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("print_password")} />
                    </Grid>
                    <Grid item md={10} xs={6} style={{ marginBottom: '10px' }}>
                        <FormControl style={{ width: "100%" }} variant="standard">
                            <InputLabel id="print_selection">{t('printer')}</InputLabel> 
                            <Select
                                labelId="print_selection"
                                id="print_selection"
                                label="Print Selection"
                                variant='standard'
                            >
                                <MenuItem value={10}>Microsoft XPS Document Writter</MenuItem>
                                <MenuItem value={20}>?</MenuItem>
                                <MenuItem value={30}>?</MenuItem>
                                <MenuItem value={0}>?</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item md={6} xs={12} style={{ marginBottom: '10px' }}>
                        <FormControl style={{ width: "100%" }} variant="standard">
                            <InputLabel id="print_selection">{t('password')}</InputLabel>
                            <Select
                                labelId="print_selection"
                                id="print_selection"
                                label="Print Selection"
                                variant='standard'
                            >
                                <MenuItem value={10}>Use a self-generated password</MenuItem>
                                <MenuItem value={20}>?</MenuItem>
                                <MenuItem value={30}>?</MenuItem>
                                <MenuItem value={0}>?</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={12} xs={12} style={{ marginBottom: '10px' }}>
                        <FormControl style={{ width: "100%" }} variant="standard">
                            <InputLabel id="print_selection">{t('type')}</InputLabel>
                            <Select
                                labelId="print_selection"
                                id="print_selection"
                                label="Print Selection"
                                variant='standard'
                            >
                                <MenuItem value={10}>Use ZIP Container</MenuItem>
                                <MenuItem value={20}>?</MenuItem>
                                <MenuItem value={30}>?</MenuItem>
                                <MenuItem value={0}>?</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={12} xs={12} style={{ marginBottom: '10px' }}>
                        <TextField style={{ width: '100%' }} id="filled-basic" label={t("application_path")} variant="standard" />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}