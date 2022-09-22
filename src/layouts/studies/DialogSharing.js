import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import {Grid, TextField} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import UserContext from "../../components/UserContext";
import InputTags from "../../components/InputTags";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogSharing({open, studies, handleCloseDialog, handleShareDialog}) {

    const { t } = useTranslation('common');

    /** User & privileges */
    const { settings } = React.useContext(UserContext);

    const [values, setValues] = React.useState([]);
    const getValue = (id) => {
        if (!values[id]) return '';
        return values[id] || '';
    }
    const setValue = (id, value) => {
        setValues({...values, [id]: value});
    }

    const clickShare = () => {
        handleShareDialog(studies, values);
    }

    React.useEffect(() =>
        {
            setValues([]);
        }, [open]);

    return (
        <BootstrapDialog
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                {t("titles.study_sharing")}
            </BootstrapDialogTitle>
            <DialogContent dividers>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <InputTags
                            label={t("fields.share_to")}
                            placeholder={t("msg_info.share_to")}
                            tags={getValue('share_to') || []}
                            SetTags={(tags) => {setValue("share_to", tags);}}
                        />
                    </Grid>

                    <Grid item xs />

                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            id="filled-basic"
                            label={t("fields.share_comments")}
                            variant="standard"
                            value={getValue('comments')}
                            placeholder={t("msg_info.share_comments")}
                            onChange={(e) => {setValue('comments', e.target.value)}}
                            multiline
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs />

                    <Grid item xs={12}>
                        {
                            settings &&
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="from"
                                    label={t('fields.share_validUntil')}
                                    inputFormat={settings.date_format}
                                    value={getValue("valid_until") || null}
                                    onChange={(date, keyboardInputValue) => {
                                        if (keyboardInputValue && keyboardInputValue.length>0 && keyboardInputValue.length<10) return;
                                        setValue("valid_until", date);
                                    }}
                                    renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} variant="standard" size="small" {...params} />}
                                    dateAdapter={AdapterDateFns}
                                />


                            </LocalizationProvider>
                        }
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                    {t("buttons.cancel")}
                </Button>
                <Button autoFocus onClick={clickShare}>
                    {t("buttons.share")}
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}