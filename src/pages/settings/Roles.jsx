import React from 'react';
import { Typography, Divider, Card, CardContent, Grid, Button, TextField, Dialog, Slide, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../services/Translation";
import SettingsTable from "../../components/SettingsTable";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Roles = () => {
    /** THEME */
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
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },
    });
    const classes = useStyles();

    /** HEADERS AND ROWS FOR THE TABLE */
    const headers = ["role", "description"];
    const rows = [
        { "row": ["Administrator", " "] },
        { "row": ["Radiologist", " "] },
        { "row": ["Physician", " "] },
        { "row": ["Patient", " "] },
    ];

     /** ROLE SELECT */
     const [addRole, setAddRole] = React.useState('');

     const handleChangeAddRole = (event) => {
         setAddRole(event.target.value);
     };
 
     /** ADD/EDIT POP UP */
     const [open, setOpen] = React.useState(false);
 
     const handleClickOpen = () => {
         setOpen(true);
     };
 
     const handleClose = () => {
         setOpen(false);
     };
 

    return (
        <React.Fragment>

            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('roles_perm')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }}>
                <CardContent>
                    <Grid container style={{ marginBottom: '15px' }}>
                        <Grid item xs />

                        <Grid item className={classes.userNameGrid}>
                            <Button variant="contained" component="label" onClick={handleClickOpen}>+ {t('add')}</Button><br />
                        </Grid>
                    </Grid>

                    <SettingsTable headers={headers} rows={rows} actions />
                </CardContent>
            </Card>

            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                    <CardContent>

                        <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                            <Grid item xs={12}>
                                <FormControl className={classes.field} variant="standard">
                                    <InputLabel id="demo-simple-select-standard-label">{t("role")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={addRole}
                                        onChange={handleChangeAddRole}
                                        label="Age"
                                    >
                                        <MenuItem value={10}>{t('administrator')}</MenuItem>
                                        <MenuItem value={20}>{t('physician')}</MenuItem>
                                        <MenuItem value={20}>{t('radiologist')}</MenuItem>
                                        <MenuItem value={30}>{t('patient')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom: '10px'}}>
                                <TextField className={classes.field} id="filled-basic" label={t("description")} variant="standard" />
                            </Grid>

                            <Grid item xs />

                            <Grid item >
                                <Button variant="contained" className={classes.button} component="label" onClick={handleClose}>{t('cancel')}</Button>
                            </Grid>

                            <Grid item >
                                <Button variant="contained" component="label">{t('save')}</Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Dialog>

        </React.Fragment>
    )
}
export default Roles