import React from 'react';
import { Typography, Divider, Card, CardContent, TextField, Grid, Button, Slide, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import TableUsers from "../../components/settings/users/TableUsers";
import t from "../../services/Translation";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DialogAddEdit from "../../components/settings/users/DialogAddEdit";

const Users = (props) => {

    /** THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%'
        },
        card: {
            "&.MuiCard-root": {
                padding: '0px !important'
            }
        },
        button: {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },

    });
    const classes = useStyles();

    /** FILTERS */
    const [filters, setFilters] = React.useState({
        username: "",
        role: "all",
        status: "all"
    });
    const handleFiltersChange = (id, value) => {
        setFilters({...filters, [id]: value});
    }

    /** ADD/EDIT POP UP */
    const [showDialog, setShowDialog] = React.useState(false);
    const [userValues, setUserValues] = React.useState(null);
    const toggleDialog = () => {setShowDialog(!showDialog);}

    /** FORCE REFRESH */
    const [forceRefresh, setForceRefresh] = React.useState(false);

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('users')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                <CardContent>

                    <Card style={{ width: "100% !important", marginBottom: '20px' }} className={classes.card} >
                        <CardContent style={{ display: "flex" }}>
                            <InfoOutlinedIcon sx={{ color: theme.palette.textfield.text, marginRight: '15px' }} />
                            <Typography style={{ color: theme.palette.textfield.text, textAlign: "left" }}>Informations concernant les paramètres utilisateurs</Typography>
                        </CardContent>
                    </Card>

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={4}>
                            <TextField className={classes.field} id="filled-basic" label={t("username/email")} variant="standard" onChange={(e) => {handleFiltersChange("username", e.target.value)}} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.root} variant="standard" fullWidth >
                                <InputLabel id="role" >{t("role")}</InputLabel>
                                <Select
                                    labelId="role"
                                    id="role"
                                    value={filters.role}
                                    onChange={(e) => {handleFiltersChange("role", e.target.value)}}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="administrator">Administrator</MenuItem>
                                    <MenuItem value="physician">Physician</MenuItem>
                                    <MenuItem value="patient">Patient</MenuItem>
                                    <MenuItem value="radiologist">Radiologist</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.root} variant="standard" fullWidth >
                                <InputLabel id="status" >{t("status")}</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    value={filters.status}
                                    onChange={(e) => {handleFiltersChange("status", e.target.value)}}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value={true}>Active</MenuItem>
                                    <MenuItem value={false}>Not active</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs />

                        <Grid item >
                            <Button variant="contained" component="label" onClick={toggleDialog}>+ {t('add')}</Button>
                        </Grid>
                    </Grid>

                    <TableUsers
                        filters={filters}
                        forceRefresh={forceRefresh}
                        editUser={(values) => {setUserValues(values); toggleDialog();}}
                    />
                </CardContent>
            </Card>

            <DialogAddEdit
                userValues={userValues}
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {setForceRefresh(!forceRefresh);}}
            />

        </React.Fragment>
    )
}
export default Users