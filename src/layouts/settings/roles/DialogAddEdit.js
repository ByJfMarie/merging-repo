import {
    Box,
    Button,
    Card,
    CardContent, Chip,
    Dialog,
    FormControl,
    Grid, Input,
    InputLabel, MenuItem, Select,
    Slide,
    TextField
} from "@mui/material";
import t from "../../../services/Translation";
import React from "react";
import SettingsService from "../../../services/api/settings.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";

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

    const theme = useTheme();
    const classes = useStyles(theme);

    const getValue = (id) => {
        if (!props.values) return '';
        return props.values[id] || '';
    }
    const handleChange = (id, value) => {
        props.setValues({...props.values, [id]: value});
    }
    const handleCancel = () => {
        props.toggle();
        props.setValues({});
    }
    const handleSave = async() => {
        let response = await SettingsService.editPrivileges(props.values);

        if (response.error) {
            props.alertMessage({
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        props.toggle();
        props.setValues({});
        props.onSave();

        props.alertMessage({
            show: true,
            severity: "success",
            message: "Privilege has been successfully edited!"
        });
    }

    React.useEffect(() => {
    }, []);


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
                                id="role"
                                label={t("role")}
                                variant="standard"
                                value={getValue("role") || ''}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("description")}
                                variant="standard"
                                value={getValue("description") || ''}
                                onChange={(e) => {handleChange('description', e.target.value);}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl className={classes.root} size="small" fullWidth={true}>
                                <InputLabel
                                    variant="standard"
                                    id="viewers"
                                >{/*t("destinations")*/"Viewers"}
                                </InputLabel>
                                <Select
                                    labelId="viewers"
                                    id="viewers"
                                    multiple
                                    value={getValue('viewers') || []}
                                    onChange={(e) => handleChange("viewers", e.target.value)}
                                    input={<Input id="select-multiple-chip" label="Chip"/>}
                                    renderValue={(selected) => (
                                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={props.viewers[value]}/>
                                            ))}
                                        </Box>
                                    )}
                                    //MenuProps={MenuProps}
                                >
                                    {
                                        Object.keys(props.viewers).map((key) =>
                                            <MenuItem
                                                key={key}
                                                value={key}
                                            >
                                                {props.viewers[key]}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs />

                        <Grid container spacing={2} direction={"row-reverse"}>
                            <Grid item >
                                <Button variant="contained" component="label" onClick={() => {handleSave()}}>{t('save')}</Button>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" className={classes.button} component="label" onClick={handleCancel}>{t('cancel')}</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;