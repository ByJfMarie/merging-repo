import {
    Button,
    Card,
    CardContent,
    Dialog,
    FormControlLabel, FormLabel,
    Grid,
    Slide, Switch,
    TextField
} from "@mui/material";
import React from "react";
import AETService from "../../../services/api/aet.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
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
        if (!addMode) response = await AETService.editAET(props.values.title, props.values);
        else response = await AETService.addAET(props.values);

        if (response.error) {
            enqueueSnackbar(t("messages.save_aet.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.save_aet.success"), {variant: 'success'});
        props.toggle();
        props.setValues({});
        setAddMode(true);
        props.onSave();
    }

    React.useEffect(() => {
        if (!props.isOpen) return;

        if (!props.values || !props.values.title) {
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
                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("tab_remote_servers.dialog_add_edit.aet")}
                                variant="standard"
                                value={getValue('title')}
                                onChange={(e) => {handleChange('title', e.target.value);}}
                                InputProps={{
                                    readOnly: !addMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("tab_remote_servers.dialog_add_edit.host")}
                                variant="standard"
                                value={getValue('ip')}
                                onChange={(e) => {handleChange('ip', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("tab_remote_servers.dialog_add_edit.port")}
                                variant="standard"
                                value={getValue('port')}
                                onChange={(e) => {handleChange('port', e.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TextField
                                className={classes.field}
                                id="filled-basic"
                                label={t("tab_remote_servers.dialog_add_edit.alias")}
                                variant="standard"
                                value={getValue('description')}
                                onChange={(e) => {handleChange('description', e.target.value);}}
                            />
                        </Grid>

                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <FormLabel component="legend">{t("tab_remote_servers.dialog_add_edit.capabilities.name")}</FormLabel>
                            <Grid container direction="row-reverse">
                                <Grid item xs={11} style={{ marginBottom: '10px' }}>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" checked={getValue('qr') || false} onChange={(e) => {handleChange('qr', !props.values.qr);}}/>}
                                        label={t("tab_remote_servers.dialog_add_edit.capabilities.query")}
                                    />
                                </Grid>
                                <Grid item xs={11} style={{ marginBottom: '10px' }}>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" checked={getValue('store') || false} onChange={(e) => {handleChange('store', !props.values.store);}}/>}
                                        label={t("tab_remote_servers.dialog_add_edit.capabilities.retrieve")}
                                    />
                                </Grid>
                                <Grid item xs={11} style={{ marginBottom: '10px' }}>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" checked={getValue('forward') || false} onChange={(e) => {handleChange('forward', !props.values.forward);}}/>}
                                        label={t("tab_remote_servers.dialog_add_edit.capabilities.forward")}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs />

                        <Grid item >
                            <Button variant="contained" className={classes.button} component="label" onClick={handleCancel}>{t('tab_remote_servers.dialog_add_edit.actions.cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label" onClick={() => {handleSave()}}>{t('tab_remote_servers.dialog_add_edit.actions.save')}</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Dialog>
    )
}

export default DialogAddEdit;