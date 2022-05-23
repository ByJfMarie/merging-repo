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
import AETService from "../../../services/api/aet.service";
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
    const handleSave = async() => {
        let response = null;
        if (!addMode) response = await AETService.editAET(saveValues.title, saveValues);
        else response = await AETService.addAET(saveValues);

        if (response.error) {
            console.log(response.error);
            return;
        }

        props.toggle();
        setSaveValues({});
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
                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("aet")}
                                variant="standard"
                                value={saveValues.title || ''}
                                onChange={(e) => {handleChange('title', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("ip")}
                                variant="standard"
                                value={saveValues.ip || ''}
                                onChange={(e) => {handleChange('ip', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("port")}
                                variant="standard"
                                value={saveValues.port || ''}
                                onChange={(e) => {handleChange('port', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("description")}
                                variant="standard"
                                value={saveValues.description || ''}
                                onChange={(e) => {handleChange('description', e.target.value);}}
                            />
                        </Grid>

                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <FormLabel component="legend">{t("capabilities")}</FormLabel>
                            <Grid container direction="row-reverse">
                                <Grid item xs={11} style={{ marginBottom: '10px' }}>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" checked={saveValues.store || false} onChange={(e) => {handleChange('store', !saveValues.store);}}/>}
                                        label={"Store"}
                                    />
                                </Grid>
                                <Grid item xs={11} style={{ marginBottom: '10px' }}>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" checked={saveValues.forward || false} onChange={(e) => {handleChange('forward', !saveValues.forward);}}/>}
                                        label={"Forward"}
                                    />
                                </Grid>
                                <Grid item xs={11} style={{ marginBottom: '10px' }}>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" checked={saveValues.qr || false} onChange={(e) => {handleChange('qr', !saveValues.qr);}}/>}
                                        label={"Query / Retrieve"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs />

                        <Grid item >
                            <Button variant="contained" className={classes.button} component="label" onClick={handleCancel}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label" onClick={() => {handleSave()}}>{t('save')}</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;