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
import t from "../../../services/Translation";
import React from "react";
import UsersService from "../../../services/api/users.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAddEdit = (props) => {

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

    const [saveUserValues, setSaveUserValues] = React.useState({
        role: ''
    });

    const handleSaveUserChange = (id, value) => {
        setSaveUserValues({...saveUserValues, [id]: value});
    }
    const handleCancel = () => {
        props.toggle();
        setSaveUserValues({role: ''});
    }
    const handleSaveUser = async() => {
        let response = null;
        if (saveUserValues.login) response = await UsersService.editUser(saveUserValues.login, saveUserValues);
        else response = await UsersService.addUser(saveUserValues);

        if (response.error) {
            console.log(response.error);
            return;
        }

        props.toggle();
        setSaveUserValues({role: ''});
        props.onSave();
    }

    React.useEffect(() => {
        if (!props.userValues) return;
        setSaveUserValues(props.userValues);
    }, [props.userValues]);


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
                                label={t("username")}
                                variant="standard"
                                value={saveUserValues.login || ''}
                                onChange={(e) => {handleSaveUserChange('login', e.target.value);}}
                                InputProps={{
                                    readOnly: saveUserValues.login,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("name")}
                                variant="standard"
                                value={saveUserValues.first_name || ''}
                                onChange={(e) => {handleSaveUserChange('first_name', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("email")}
                                variant="standard"
                                value={saveUserValues.mail || ''}
                                onChange={(e) => {handleSaveUserChange('mail', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.field} variant="standard">
                                <InputLabel id="demo-simple-select-standard-label">{t("role")}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={saveUserValues.role}
                                    onChange={(e) => {handleSaveUserChange('role', e.target.value);}}
                                    label="Age"
                                >
                                    <MenuItem value="administrator">Administrator</MenuItem>
                                    <MenuItem value="physician">Physician</MenuItem>
                                    <MenuItem value="patient">Patient</MenuItem>
                                    <MenuItem value="radiologist">Radiologist</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("email")}
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleCancel}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label" onClick={() => {handleSaveUser()}}>{t('save')}</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;