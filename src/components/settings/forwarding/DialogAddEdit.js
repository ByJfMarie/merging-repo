import {
    Button,
    Card,
    CardContent, Checkbox,
    Dialog,
    FormControl, FormControlLabel, FormGroup, FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select, Slide, Switch,
    TextField
} from "@mui/material";
import t from "../../../services/Translation";
import React from "react";
import ForwardingService from "../../../services/api/forwarding.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import QueryAETSelect from "../../remoteAET/QueryAETSelect";

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
    const handleSave = async() => {
        let response = null;
        if (!addMode) response = await ForwardingService.editRule(saveValues.id, saveValues);
        else response = await ForwardingService.addRule(saveValues);

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
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                <CardContent>

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12} style={{marginBottom: '10px'}}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("ae_title")}
                                variant="standard"
                                value={saveValues.aet_condition || ''}
                                onChange={(e) => {handleChange('aet_condition', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={6} style={{marginBottom: '10px'}}>
                            <FormControl className={classes.root} variant="standard" fullWidth>
                                <InputLabel id="aet" >Forward To</InputLabel>
                                <QueryAETSelect
                                    forward={true}
                                    currentAet={saveValues.value || ''}
                                    setCurrentAET={(e) => {handleChange("value", e)}}
                                />
                            </FormControl>
                        </Grid>

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