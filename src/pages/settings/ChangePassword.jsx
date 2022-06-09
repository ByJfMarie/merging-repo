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

export default function ChangePassword(props) {
    const theme = useTheme();

    const getValue = (id) => {
        if (!props.password) return '';
        return props.password[id] || '';
    }

    const handleValue = (id, value) => {
        if (!props.password) return '';
        props.setPassword({...props.password, [id]: value});
    }

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
                            id="pwd"
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
                                    >
                                        {getValue('old_show') ? <VisibilityOff /> : <Visibility />}
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
                            id="new"
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
                                    >
                                        {getValue('new_show') ? <VisibilityOff /> : <Visibility />}
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
                            id="repeat"
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
                                    >
                                        {getValue('repeat_show') ? <VisibilityOff /> : <Visibility />}
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