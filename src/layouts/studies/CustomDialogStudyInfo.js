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
import {Divider, Grid} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@emotion/react';

/** Translation */
import { useTranslation } from 'react-i18next';

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
    color: theme.palette.text.secondary
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other} >
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

    const theme = useTheme();

    return (
        <BootstrapDialog
           
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="lg"
            fullWidth
           
        >
            <Tooltip title="Close">
                <div className="absolute right-5 top-2 text-xl">
                    <i class="fi fi-rr-cross text-xs cursor-pointer hover:text-primary text-gray-300 " onClick={handleCloseDialog}></i>
                </div>
            </Tooltip>
            <div className="w-full h-full px-6 py-6"  style={{backgroundColor: theme.palette.dialog.color}}>
                <div className="w-full flex justify-center">
                    <h1 className='text-primary text-xl font-medium'>{t("titles.study_information")}</h1>
                </div>
                { values && 
                    <div className="w-full flex items-center justify-around my-14 rounded">
                        <div className="w-1/3 flex flex-col items-center">
                            <div className="">
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.p_name")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.p_name}</h1>
                                </div>
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.p_birthdate")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.p_birthdate}</h1>
                                </div>
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_ref_physician")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.st_ref_physician}</h1>
                                </div>
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_description")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.st_description}</h1>
                                </div>
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_date")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.st_date}</h1>
                                </div>
                                <div className="flex items-center my-3 absolute bottom-2 right-5">
                                    {/* <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_uid")}</h1> */}
                                    <h1 className="text-gray-400 text-sm ml-4 capitalize">{values.st_uid}</h1>
                                </div>
                                { values.st_storage_key && 
                                    <div className="flex items-center my-3">
                                        <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_storage_key")}</h1>
                                        <h1 className="text-gray-600 ml-4 capitalize">{values.st_storage_key}</h1>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="border-r border-gray-300 w-1 h-36"></div>
                        <div className="w-1/3 flex flex-col items-center">
                            <div className="">
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.p_id")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.p_id}</h1>
                                </div>
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_institution")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.st_institution}</h1>
                                </div>
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_accession_number")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.st_accession_number}</h1>
                                </div>
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_modalities")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.st_modalities}</h1>
                                </div>
                                <div className="flex items-center my-3">
                                    <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_id")}</h1>
                                    <h1 className="text-gray-600 ml-4 capitalize">{values.st_id}</h1>
                                </div>
                                { values.st_reference &&
                                    <div className="flex items-center my-3">
                                        <h1 className='text-sm uppercase text-gray-400'>{t("fields.st_reference")}</h1>
                                        <h1 className="text-gray-600 ml-4 capitalize">{values.st_reference}</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
            {/*
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
            </DialogActions> */}
        </BootstrapDialog>
    )
}