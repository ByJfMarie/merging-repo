import {
    Button,
    Card,
    CardContent,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    Slide,
    TextField
} from "@mui/material";
import t from "../../../services/Translation";
import React from "react";
import ForwardingService from "../../../services/api/forwarding.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import QueryAETSelect from "../../remoteAET/QueryAETSelect";

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

    const [addMode, setAddMode] = React.useState(true);

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
        let response = null;
        if (!addMode) response = await ForwardingService.editRule(props.values.id, props.values);
        else response = await ForwardingService.addRule(props.values);

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
        setAddMode(true);
        props.onSave();

        props.alertMessage({
            show: true,
            severity: "success",
            message: "User has been successfully "+(addMode?"added":"edited")+"!"
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
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                <CardContent>

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12} style={{marginBottom: '10px'}}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("ae_title")}
                                variant="standard"
                                value={getValue('aet_condition')}
                                onChange={(e) => {handleChange('aet_condition', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={6} style={{marginBottom: '10px'}}>
                            <FormControl className={classes.root} variant="standard" fullWidth>
                                <InputLabel id="aet" >Forward To</InputLabel>
                                <QueryAETSelect
                                    forward={true}
                                    currentAet={getValue('value')}
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