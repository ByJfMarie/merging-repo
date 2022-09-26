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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {Divider, Grid, List, ListItem, ListItemText} from "@mui/material";

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

export default function CustomDialogStudyInfo({open, handleOpenDialog, handleCloseDialog, study}) {

    const { t } = useTranslation('common');

    const [values, setValues] = React.useState(null);

    React.useEffect(() => {
        setValues(study)
    }, [study]);

    return (
        <BootstrapDialog
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                {t("titles.study_information")}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {
                    values &&

                        <Grid container spacing={2}>
                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.p_name")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.p_name}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.p_id")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.p_id}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.p_birthdate")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.p_birthdate_formatted}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_institution")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_institution}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_ref_physician")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_ref_physician}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_accession_number")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_accession_number}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_description")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_description}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_modalities")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{""+values.st_modalities}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_date")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_date}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_id")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_id}</Grid>

                            <Grid item xs={12}><Divider/></Grid>

                            <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_uid")}</Grid>
                            <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_uid}</Grid>

                            {
                                values.st_reference &&
                                <>
                                    <Grid item xs={12}><Divider/></Grid>

                                    <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_reference")}</Grid>
                                    <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_reference}</Grid>
                                </>
                            }

                            {
                                values.st_storage_key &&
                                <>
                                    <Grid item xs={12}><Divider/></Grid>

                                    <Grid item xs={6} style={{fontWeight: 'bold'}}>{t("fields.st_storage_key")}</Grid>
                                    <Grid item xs="auto" style={{fontSize: '80%'}}>{values.st_storage_key}</Grid>
                                </>
                            }
                        </Grid>
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseDialog}>
                    {t("buttons.close")}
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}