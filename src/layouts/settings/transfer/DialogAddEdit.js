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

/** Translation */
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAddEdit = (props) => {
    const { t } = useTranslation('settings');

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
            props.alertMessage({
                show: true,
                severity: "error",
                message: t("msg_error.transfer_saved", {error: response.error})
            });
            return;
        }

        props.toggle();
        props.setValues({});
        setAddMode(true);
        props.onSave();

        props.alertMessage({
            show: true,
            severity: "success",
            message: t("msg_info.transfer_saved")
        });
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
                margin: '0px 0px'
            }} className='py-4'>
                <h1 className="text-center text-primary text-lg font-medium">AET Condition</h1>
                <CardContent className="" sx={{paddingLeft: "4rem", paddingRight: "4rem"}}>

                    <Grid container spacing={2} style={{}}>
                        <Grid item xs={12} >
                            <TextField
                                className={classes.field}
                                id="ae_title"
                                label={t("fields.aet_condition")}
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
                                            id="destinations">{t("fields.destinations")}</InputLabel>
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
                        <div className="mt-12 flex">

                            <Grid item>
                                <Button className={classes.button} variant="outlined" component="label"
                                        onClick={handleCancel}>{t('buttons.cancel')}</Button>
                            </Grid>

                            <Grid item>
                                <Button variant="contained" component="label" onClick={() => {handleSave()}}>{t('buttons.save')}</Button>
                            </Grid>
                        </div>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;