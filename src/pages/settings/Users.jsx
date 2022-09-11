import React from 'react';
import {
    Typography,
    Divider,
    Card,
    CardContent,
    TextField,
    Grid,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Alert, Snackbar
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import Index from "../../layouts/settings/users";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DialogAddEdit from "../../layouts/settings/users/DialogAddEdit";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";

const Users = (props) => {
    const { t } = useTranslation('settings');

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

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

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
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('titles.users')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>

            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                <CardContent>

                    <Card style={{ width: "100% !important", marginBottom: '20px' }} className={classes.card} >
                        <CardContent style={{ display: "flex" }}>
                            <InfoOutlinedIcon sx={{ color: theme.palette.textfield.text, marginRight: '15px' }} />
                            <Typography style={{ color: theme.palette.textfield.text, textAlign: "left" }}>{t("info.users")}</Typography>
                        </CardContent>
                    </Card>

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={4}>
                            <TextField className={classes.field} id="filled-basic" label={t("filters.username")} variant="standard" onChange={(e) => {handleFiltersChange("username", e.target.value)}} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.root} variant="standard" fullWidth >
                                <InputLabel id="role" >{t("filters.role")}</InputLabel>
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
                                <InputLabel id="status" >{t("filters.status")}</InputLabel>
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
                            <Button variant="contained" component="label" onClick={() => {setUserValues({}); toggleDialog();}}>+ {t('buttons.add')}</Button>
                        </Grid>
                    </Grid>

                    <Index
                        filters={filters}
                        forceRefresh={forceRefresh}
                        editUser={(values) => {setUserValues(values); toggleDialog();}}
                        alertMessage={(message) => setMessage(message)}
                    />
                </CardContent>
            </Card>

            <DialogAddEdit
                values={userValues}
                setValues={setUserValues}
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {setForceRefresh(!forceRefresh);}}
                alertMessage={(message) => setMessage(message)}
            />

        </React.Fragment>
    )
}
export default Users