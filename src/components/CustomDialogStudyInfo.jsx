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
                Study Information
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {
                    values &&

                    <List
                        sx={{
                            width: '100%',
                        }}
                    >
                        <ListItem><ListItemText primary="Patient Name" secondary={values.p_name}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Patient ID" secondary={values.p_id}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Patient Birthdate" secondary={values.p_birthdate}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Referring Physician" secondary={values.st_ref_physician}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Accession Number" secondary={values.st_accession_number}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Study Description" secondary={values.st_description}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Modalities" secondary={values.st_modalities}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Study Date" secondary={values.st_date}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Study ID" secondary={values.st_id}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Study UID" secondary={values.st_uid}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Reference" secondary={values.st_reference}/></ListItem>
                        <Divider component="li" />
                        <ListItem><ListItemText primary="Storage Key" secondary={values.st_storage_key}/></ListItem>
                    </List>
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseDialog}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}