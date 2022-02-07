import * as React from 'react';
import { Typography, Divider, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import t from "../../services/Translation";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ChangePassword() {
    const theme = useTheme();

    const [oldPassword, setOldPassword] = React.useState({
        password: '',
        showPassword: false,
    });

    const [newPassword, setNewPassword] = React.useState({
        password: '',
        showPassword: false,
    });

    const [repeatPassword, setRepeatPassword] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChangeOP = (prop) => (event) => {
        setOldPassword({ ...oldPassword, [prop]: event.target.value });
    };

    const handleClickShowOldPassword = () => {
        setOldPassword({
            ...oldPassword,
            showPassword: !oldPassword.showPassword,
        });
    };

    const handleChangeNP = (prop) => (event) => {
        setNewPassword({ ...newPassword, [prop]: event.target.value });
    };

    const handleClickShowNewPassword = () => {
        setNewPassword({
            ...newPassword,
            showPassword: !newPassword.showPassword,
        });
    };

    const handleChangeRP = (prop) => (event) => {
        setRepeatPassword({ ...repeatPassword, [prop]: event.target.value });
    };

    const handleClickShowRepeatPassword = () => {
        setRepeatPassword({
            ...repeatPassword,
            showPassword: !repeatPassword.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('change_password')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                        <InputLabel htmlFor="filled-adornment-password">{t('old_password')}</InputLabel>
                        <Input
                            id="filled-adornment-password"
                            type={oldPassword.showPassword ? 'text' : 'password'}
                            value={oldPassword.password}
                            onChange={handleChangeOP('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowOldPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {oldPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                        <InputLabel htmlFor="filled-adornment-password">{t('new_password')}</InputLabel>
                        <Input
                            id="filled-adornment-password"
                            type={newPassword.showPassword ? 'text' : 'password'}
                            value={newPassword.password}
                            onChange={handleChangeNP('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {newPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                        <InputLabel htmlFor="filled-adornment-password">{t('repeat_password')}</InputLabel>
                        <Input
                            id="filled-adornment-password"
                            type={repeatPassword.showPassword ? 'text' : 'password'}
                            value={repeatPassword.password}
                            onChange={handleChangeRP('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowRepeatPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {repeatPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}