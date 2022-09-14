import * as React from 'react';
import {Typography, Divider, Grid, DialogActions, DialogContent, Dialog, Slide} from '@mui/material';
import { useTheme } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ActionBar from "../../../layouts/settings/actions";

import UsersService from "../../../services/api/users.service";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../translations/i18n";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResetPassword({open, setOpen, user, alertMessage}) {
    const { t } = useTranslation('settings');

    const theme = useTheme();

    const [scroll] = React.useState('paper');

    const [password, setPassword] = React.useState(null);
    const [passwordShow, setPasswordShow] = React.useState(false);

    const [passwordConfirm, setPasswordConfirm] = React.useState(null);
    const [passwordConfirmShow, setPasswordConfirmShow] = React.useState(false);

    const handleCancel = () => {
        setOpen(false);
    }

    const handleSave = async () => {
        let response = await UsersService.resetPassword(user.login, password, passwordConfirm);

        if (response.error) {
            alertMessage({
                show: true,
                severity: "error",
                message: t("msg_error.reset_password", {error: response.error})
            });
            return;
        }

        setOpen(false);
        alertMessage({
            show: true,
            severity: "success",
            message: t("msg_info.reset_password")
        });
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={handleCancel}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{backgroundColor: theme.palette.dialog.color}}>
                    <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('titles.change_password')} </Typography>
                    <Divider style={{ marginBottom: theme.spacing(2) }} />

                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                                <InputLabel htmlFor="filled-adornment-password">{t('fields.new_password')}</InputLabel>
                                <Input
                                    id="pwd"
                                    name="pwd"
                                    type={passwordShow ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {setPasswordShow(!passwordShow)}}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {passwordShow ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    autoComplete="off"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                                <InputLabel htmlFor="filled-adornment-password">{t('fields.repeat_password')}</InputLabel>
                                <Input
                                    id="repeat"
                                    name="repeat"
                                    type={passwordConfirmShow ? 'text' : 'password'}
                                    value={passwordConfirm}
                                    onChange={(e) => {setPasswordConfirm(e.target.value)}}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {setPasswordConfirmShow(!passwordConfirmShow)}}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {passwordConfirmShow ? <VisibilityOff /> : <Visibility />}
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
                    <ActionBar
                        labelReset={t('buttons.cancel')}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}