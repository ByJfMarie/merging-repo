import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {
    Dialog, DialogActions,
    DialogContent, Divider, Grid,
    Slide, Typography,
} from "@mui/material";
import Index from "../../settings/actions";
import {useTranslation} from "react-i18next";
import {useTheme} from "@emotion/react";
import UsersService from "../../../services/api/users.service";
import { useSnackbar } from 'notistack';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogChangePassword = forwardRef((props, ref) => {

    const {t} = useTranslation('profile');

    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const innerRef = useRef();

    useImperativeHandle(ref, () => ({
        openDialog: () => setOpen(true),
        closeDialog: () => setOpen(false)
    }));

    const [password, setPassword] = React.useState({});
    const getValue = (id) => {
        if (!password) return '';
        return password[id] || '';
    }

    const handleValue = (id, value) => {
        if (!password) return '';
        setPassword({...password, [id]: value});
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSave = async () => {
        let response = await UsersService.changePassword(password);

        if (response.error) {
            enqueueSnackbar(t("messages.reset_password.error", {error: response.error}), {variant: 'error'});
            return;
        }

        handleCancel();
        enqueueSnackbar(t("messages.reset_password.success"), {variant: 'success'});
    }
    const handleCancel = () => {
        setOpen(false);
        setPassword({});
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                ref = {innerRef}
                fullWidth
                maxWidth="lg"
                onClose={handleCancel}
                scroll="paper"
                TransitionComponent={Transition}
            >
                <DialogContent dividers={true} style={{backgroundColor: theme.palette.dialog.color}}>
                    <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('dialog_change_password.title')} </Typography>
                    <Divider style={{ marginBottom: theme.spacing(2) }} />

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                                <InputLabel htmlFor="filled-adornment-password">{t('dialog_change_password.old_password')}</InputLabel>
                                <Input
                                    id="pwd"
                                    name="pwd"
                                    type={getValue('old_show') ? 'text' : 'password'}
                                    value={getValue('old') || ''}
                                    onChange={(e) => {handleValue('old', e.target.value)}}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {handleValue('old_show', !getValue('old_show'))}}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                tabIndex="-1"
                                            >
                                                {getValue('old_show') ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    autoComplete="off"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                                <InputLabel htmlFor="filled-adornment-password">{t('dialog_change_password.new_password')}</InputLabel>
                                <Input
                                    id="new"
                                    name="new"
                                    type={getValue('new_show') ? 'text' : 'password'}
                                    value={getValue('new')}
                                    onChange={(e) => {handleValue('new', e.target.value)}}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {handleValue('new_show', !getValue('new_show'))}}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                tabIndex="-1"
                                            >
                                                {getValue('new_show') ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    autoComplete="off"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                                <InputLabel htmlFor="filled-adornment-password">{t('dialog_change_password.repeat_password')}</InputLabel>
                                <Input
                                    id="repeat"
                                    name="repeat"
                                    type={getValue('repeat_show') ? 'text' : 'password'}
                                    value={getValue('repeat')}
                                    onChange={(e) => {handleValue('repeat', e.target.value)}}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {handleValue('repeat_show', !getValue('repeat_show'))}}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                tabIndex="-1"
                                            >
                                                {getValue('repeat_show') ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    autoComplete="off"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{backgroundColor: theme.palette.dialog.color}}>
                    <Index
                        labelReset={t('dialog_change_password.cancel')}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
});

export default DialogChangePassword;