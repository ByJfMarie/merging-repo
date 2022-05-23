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
import t from "../../../services/Translation";
import React from "react";
import TransferService from "../../../services/api/transfer.service";
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

    const [addMode, setAddMode] = React.useState(true);
    const [saveValues, setSaveValues] = React.useState({});

    const handleChange = (id, value) => {
        setSaveValues({...saveValues, [id]: value});
    }
    const handleCancel = () => {
        props.toggle();
        setSaveValues({});
    }
    const handleSave = async () => {
        let response = null;
        if (!addMode) response = await TransferService.editRule(saveValues.id, saveValues);
        else response = await TransferService.addRule(saveValues);

        if (response.error) {
            console.log(response.error);
            return;
        }

        props.toggle();
        setSaveValues({});
        setAddMode(true);
        props.onSave();
    }

    React.useEffect(() => {
        if (!props.values) {
            setAddMode(true);
            return;
        }
        setAddMode(false);
        setSaveValues(props.values);
    }, [props.values]);


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
                                id="filled-basic"
                                label={t("aet")}
                                variant="standard"
                                value={saveValues.ae_title || ''}
                                onChange={(e) => handleChange("ae_title", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.root} size="small" fullWidth={true}>
                                <InputLabel variant="standard"
                                            id="destinations">{/*t("destinations")*/"Destinations"}</InputLabel>
                                <Select
                                    labelId="destinations"
                                    id="destinations"
                                    multiple
                                    value={saveValues.destinations || []}
                                    onChange={(e) => handleChange("destinations", e.target.value)}
                                    input={<Input id="select-multiple-chip" label="Chip"/>}
                                    renderValue={(selected) => (
                                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={props.remoteSites[value]}/>
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
                                                {props.remoteSites[key]}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs/>

                        <Grid item>
                            <Button className={classes.button} variant="contained" component="label"
                                    onClick={handleCancel}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" component="label" onClick={() => {handleSave()}}>{t('save')}</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;