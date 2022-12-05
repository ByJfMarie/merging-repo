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
import React from "react";
import ForwardingService from "../../../services/api/forwarding.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import Index from "../../remoteAET/QueryAETSelect";
import {useSnackbar} from "notistack";

/** Translation */
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('system');

    const { enqueueSnackbar } = useSnackbar();

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
            enqueueSnackbar(t("messages.save_forwarding.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.save_forwarding.success"), {variant: 'success'});
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
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                <CardContent>
                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12} style={{marginBottom: '10px'}}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("tab_forwarding.dialog_add_edit.aet_condition")}
                                variant="standard"
                                value={getValue('aet_condition')}
                                onChange={(e) => {handleChange('aet_condition', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={6} style={{marginBottom: '10px'}}>
                            <FormControl className={classes.root} variant="standard" fullWidth>
                                <InputLabel id="aet" >{t("tab_forwarding.dialog_add_edit.forward_to")}</InputLabel>
                                <Index
                                    forward={true}
                                    currentAet={getValue('value')}
                                    setCurrentAET={(e) => {handleChange("value", e)}}
                                />
                            </FormControl>
                        </Grid>

                        <Grid container spacing={2} direction={"row-reverse"}>
                            <Grid item >
                                <Button variant="contained" component="label" onClick={() => {handleSave()}}>{t('tab_forwarding.dialog_add_edit.actions.save')}</Button>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" className={classes.button} component="label" onClick={handleCancel}>{t('tab_forwarding.dialog_add_edit.actions.cancel')}</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;