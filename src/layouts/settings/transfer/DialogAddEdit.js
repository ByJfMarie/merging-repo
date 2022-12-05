import {
    Box,
    Button,
    Card,
    CardContent, Chip,
    Dialog,
    FormControl,
    Grid, Input,
    InputLabel,
    MenuItem,
    Select, Slide,
    TextField
} from "@mui/material";
import React from "react";
import TransferService from "../../../services/api/transfer.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import {useSnackbar} from "notistack";

/** Translation */
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAddEdit = (props) => {
    const { t } = useTranslation('system');

    const { enqueueSnackbar } = useSnackbar();

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

    const [addMode, setAddMode] = React.useState(true);

    const getValue = (id) => {
        if (!props.values) return '';
        return props.values[id] || '';
    }
    const handleChange = (id, value) => {
        console.log(value);
        props.setValues({...props.values, [id]: value});
    }
    const handleDeleteDestination = (id, value) => {
        let dests = props.values[id];
        var index = dests.indexOf(value);
        if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
            dests.splice(index, 1);
        }
        console.log(dests);
        props.setValues({...props.values, [id]: dests});
    }
    const handleCancel = () => {
        props.toggle();
        props.setValues({});
        props.onSave();
    }
    const handleSave = async () => {
        let response = null;
        if (!addMode) response = await TransferService.editRule(props.values.id, props.values);
        else response = await TransferService.addRule(props.values);

        if (response.error) {
            enqueueSnackbar(t("messages.save_transfer.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.save_transfer.success"), {variant: 'success'});
        props.toggle();
        props.setValues({});
        setAddMode(true);
        props.onSave();
    }

    React.useEffect(() => {
        if (!props.isOpen) return;

        if (!props.values || !props.values.id) {
            setAddMode(true);
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
            <Card style={{
                backgroundColor: theme.palette.card.color,
                width: "100% !important",
                padding: '25px 0px',
                margin: '0px 0px'
            }}>
                <CardContent>

                    <Grid container spacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                id="ae_title"
                                label={t("tab_transfer.dialog_add_edit.aet_condition")}
                                variant="standard"
                                value={getValue('ae_title')}
                                onChange={(e) => handleChange("ae_title", e.target.value)}
                                InputProps={{
                                    readOnly: !addMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.root} size="small" fullWidth={true}>
                                <InputLabel variant="standard"
                                            id="destinations">{t("tab_transfer.dialog_add_edit.destinations")}</InputLabel>
                                <Select
                                    labelId="destinations"
                                    id="destinations"
                                    multiple
                                    value={getValue('destinations') || []}
                                    onChange={(e) => handleChange("destinations", e.target.value)}
                                    input={<Input id="select-multiple-chip" label="Chip"/>}
                                    renderValue={(selected) => (
                                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={props.remoteSites[value]+" ("+value+")"}
                                                    onDelete={() => handleDeleteDestination("destinations", value)}
                                                    onMouseDown={(event) => {
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    //MenuProps={MenuProps}
                                >
                                    {
                                        Object.keys(props.remoteSites).map((key) =>
                                            <MenuItem
                                                key={key}
                                                value={key}
                                            >
                                                {props.remoteSites[key]+" ("+key+")"}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs/>

                        <Grid item>
                            <Button className={classes.button} variant="contained" component="label"
                                    onClick={handleCancel}>{t('tab_transfer.dialog_add_edit.actions.cancel')}</Button>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" component="label" onClick={() => {handleSave()}}>{t('tab_transfer.dialog_add_edit.actions.save')}</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;