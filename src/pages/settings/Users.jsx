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
    Box
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import Index from "../../layouts/settings/users";
import DialogAddEdit from "../../layouts/settings/users/DialogAddEdit";
import GroupIcon from '@mui/icons-material/Group';
import PryInfo from "../../components/PryInfo";

/** Translation */
import { useTranslation } from 'react-i18next';

const Users = (props) => {
    const { t } = useTranslation('users');

    /** THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        },
        field: {
            width: '100%'
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
            <Typography
                variant="h4"
                style={{ textAlign: 'left', color: theme.palette.primary.main }}
            >
                <Grid container direction="row" alignItems="center">
                    <GroupIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('title')}
                </Grid>
            </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <PryInfo
                text={t("info")}
            />

            <Card className={classes.card} style={{ backgroundColor: theme.palette.card.color, width: "100% !important"}} >
                <CardContent>

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={4}>
                            <TextField
                                className={classes.field}
                                id="login"
                                name={"login"}
                                label={t("filters.username")}
                                variant="standard"
                                onChange={(e) => {handleFiltersChange("username", e.target.value)}}
                                inputProps={{
                                    autoComplete: "off",
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.root} variant="standard" fullWidth >
                                <InputLabel id="role" >{t("filters.role.name")}</InputLabel>
                                <Select
                                    labelId="role"
                                    id="role"
                                    value={filters.role}
                                    onChange={(e) => {handleFiltersChange("role", e.target.value)}}
                                >
                                    <MenuItem value="all">{t("filters.role.all")}</MenuItem>
                                    <MenuItem value="administrator">{t("filters.role.administrator")}</MenuItem>
                                    <MenuItem value="physician">{t("filters.role.physician")}</MenuItem>
                                    <MenuItem value="patient">{t("filters.role.patient")}</MenuItem>
                                    <MenuItem value="radiologist">{t("filters.role.radiologist")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.root} variant="standard" fullWidth >
                                <InputLabel id="status" >{t("filters.status.name")}</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    value={filters.status}
                                    onChange={(e) => {handleFiltersChange("status", e.target.value)}}
                                >
                                    <MenuItem value="all">{t("filters.status.all")}</MenuItem>
                                    <MenuItem value={true}>{t("filters.status.active")}</MenuItem>
                                    <MenuItem value={false}>{t("filters.status.not_active")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs />

                        <Grid item >
                            <Button variant="contained" component="label" onClick={() => {setUserValues({}); toggleDialog();}}>+ {t('actions.add')}</Button>
                        </Grid>
                    </Grid>

                    <Index
                        filters={filters}
                        forceRefresh={forceRefresh}
                        editUser={(values) => {setUserValues(values); toggleDialog();}}
                    />
                </CardContent>
            </Card>

            <DialogAddEdit
                values={userValues}
                setValues={setUserValues}
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {setForceRefresh(!forceRefresh);}}
            />

        </React.Fragment>
    )
}
export default Users