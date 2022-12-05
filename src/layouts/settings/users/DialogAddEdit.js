import {
    Button,
    Card,
    CardContent,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select, Slide,
    TextField
} from "@mui/material";
import React from "react";
import UsersService from "../../../services/api/users.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import UserContext from "../../../components/UserContext";

/** Translation */
import { useTranslation } from 'react-i18next';
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
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

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAddEdit = (props) => {
    const { t } = useTranslation('users');

    const { enqueueSnackbar } = useSnackbar();

    /** User & privileges */
    const { settings } = React.useContext(UserContext);

    const theme = useTheme();
    const classes = useStyles(theme);

    const [addMode, setAddMode] = React.useState(true);

    const getUserValue = (id) => {
        if (!props.values) return '';
        return props.values[id] || '';
    }
    const handleSaveUserChange = (id, value) => {
        props.setValues({...props.values, [id]: value});
    }
    const handleCancel = () => {
        props.toggle();
        props.setValues({role: ''});
    }
    const handleSaveUser = async() => {
        let response = null;
        if (!addMode) response = await UsersService.editUser(props.values.login, props.values);
        else response = await UsersService.addUser(props.values);

        if (response.error) {
            enqueueSnackbar(t("messages.save_user.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.save_user.success"), {variant: 'success'});
        props.toggle();
        props.setValues({role: ''});
        setAddMode(true);
        props.onSave();
    }

    React.useEffect(() => {
        if (!props.isOpen) return;

        if (!props.values || !props.values.login) {
            setAddMode(true);
            props.values['dicom_tag'] = '[0008,0090]';
            return;
        }

        setAddMode(false);
    }, [props.isOpen]);


    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            open={props.isOpen}
            onClose={props.toggle}
            TransitionComponent={Transition}
        >
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                <CardContent>

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("dialog_add_edit.username")}
                                variant="standard"
                                value={getUserValue("login")}
                                onChange={(e) => {handleSaveUserChange('login', e.target.value);}}
                                InputProps={{
                                    readOnly: !addMode,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl className={classes.field} variant="standard">
                                <InputLabel id="demo-simple-select-standard-label">{t("dialog_add_edit.role.name")}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={getUserValue("role")}
                                    onChange={(e) => {handleSaveUserChange('role', e.target.value);}}
                                    label="Age"
                                >
                                    <MenuItem value="administrator">{t("dialog_add_edit.role.administrator")}</MenuItem>
                                    <MenuItem value="physician">{t("dialog_add_edit.role.physician")}</MenuItem>
                                    <MenuItem value="patient">{t("dialog_add_edit.role.patient")}</MenuItem>
                                    <MenuItem value="radiologist">{t("dialog_add_edit.role.radiologist")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("dialog_add_edit.mail")}
                                variant="standard"
                                value={getUserValue("mail")}
                                onChange={(e) => {handleSaveUserChange('mail', e.target.value);}}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                                <InputLabel id="title-label">{t("dialog_add_edit.title.name")}</InputLabel>
                                <Select
                                    labelId="title-label"
                                    id="title"
                                    value={getUserValue("title")}
                                    onChange={(e) => {handleSaveUserChange('title', e.target.value);}}
                                    label="Title"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="mr">{t("dialog_add_edit.title.mr")}</MenuItem>
                                    <MenuItem value="mrs">{t("dialog_add_edit.title.mrs")}</MenuItem>
                                    <MenuItem value="miss">{t("dialog_add_edit.title.miss")}</MenuItem>
                                    <MenuItem value="ms">{t("dialog_add_edit.title.ms")}</MenuItem>
                                    <MenuItem value="dr">{t("dialog_add_edit.title.dr")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("dialog_add_edit.name")}
                                variant="standard"
                                value={getUserValue("first_name")}
                                onChange={(e) => {handleSaveUserChange('first_name', e.target.value);}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="birthdate"
                                    label={t('dialog_add_edit.birthdate')}
                                    inputFormat={settings?settings.date_format:""}
                                    value={getUserValue("birthdate") || null}
                                    onChange={(date, keyboardInputValue) => {
                                        if (keyboardInputValue && keyboardInputValue.length>0 && keyboardInputValue.length<10) return;
                                        handleSaveUserChange('birthdate', date);
                                    }}
                                    renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} variant="standard" fullWidth {...params} />}
                                    dateAdapter={AdapterDateFns}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="phone"
                                label={t("dialog_add_edit.phone")}
                                variant="standard"
                                value={getUserValue("phone")}
                                onChange={(e) => {handleSaveUserChange('phone', e.target.value);}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="address"
                                label={t("dialog_add_edit.address")}
                                variant="standard"
                                value={getUserValue("address")}
                                onChange={(e) => {handleSaveUserChange('address', e.target.value);}}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                id="city"
                                label={t("dialog_add_edit.city")}
                                variant="standard"
                                value={getUserValue("city")}
                                onChange={(e) => {handleSaveUserChange('city', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                id="zip"
                                label={t("dialog_add_edit.zip")}
                                variant="standard"
                                value={getUserValue("zip")}
                                onChange={(e) => {handleSaveUserChange('zip', e.target.value);}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="country"
                                label={t("dialog_add_edit.country")}
                                variant="standard"
                                value={getUserValue("country")}
                                onChange={(e) => {handleSaveUserChange('country', e.target.value);}}
                            />
                        </Grid>

                        {
                            getUserValue("role")==="physician" &&

                            <>
                                <Grid item xs={6}>
                                    <TextField
                                        className={classes.field}
                                        id="dicom_tag"
                                        label={t("dialog_add_edit.dicom_tag")}
                                        variant="standard"
                                        value={getUserValue("dicom_tag")}
                                        onChange={(e) => {
                                            handleSaveUserChange('dicom_tag', e.target.value);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                    className={classes.field}
                                    id="dicom_tag_value"
                                    label={t("dialog_add_edit.dicom_tag_value")}
                                    variant="standard"
                                    value={getUserValue("dicom_tag_value")}
                                    onChange={(e) => {handleSaveUserChange('dicom_tag_value', e.target.value);}}
                                    />
                                </Grid>
                            </>
                        }

                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleCancel}>{t('dialog_add_edit.actions.cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label" onClick={() => {handleSaveUser()}}>{t('dialog_add_edit.actions.save')}</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;