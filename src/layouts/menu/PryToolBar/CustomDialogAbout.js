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
import {Link} from "@mui/material";
import SystemService from "../../../services/api/system.service";
import {makeStyles} from "@mui/styles";
import {useTheme} from "@emotion/react";

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

const useStyles = makeStyles((theme) => ({
    spaceAfter: {
        marginRight: "20px !important",
    },

    div: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    }
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

export default function CustomDialogAbout({open, handleOpenDialog, handleCloseDialog}) {

    const { t } = useTranslation('common');

    /** THEME AND CSS */
    const theme = useTheme();
    const classes = useStyles(theme);

    const [version, setVersion] = React.useState({
        version: '',
        build: ''
    });

    const refresh = async () => {
        const response = await SystemService.getVersion();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setVersion(response.items);
    }

    React.useEffect(() => {
        refresh();
    }, []);

    return (
        <BootstrapDialog
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                {t("titles.about")}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" >{t("texts.portal_name")}</Typography>
                <Typography variant="h6" >{t("fields.version")} {version.version} {t("fields.build")} {version.build}</Typography>
                <br/>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>{t("texts.our_website")}</Typography>
                    <Typography ><Link href='https://perennity.io'>https://perennity.io</Link></Typography>
                </div>

                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>{t("texts.technical_support")}</Typography>
                    <Typography ><Link href='#'>support@perennity.io</Link></Typography>
                </div>
                <div className={classes.div}>
                    <Typography className={classes.spaceAfter}>{t("texts.license_request")}</Typography>
                    <Typography ><Link href='#'>license@perennity.io</Link></Typography>
                </div>
                <br/>
                <div className={classes.div}>
                    <Typography variant="subtitle2" align="justify">
                        {t("texts.warning_medical_device")}
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseDialog}>
                    {t("buttons.close")}
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}