import React from 'react'
import {Typography, Link, Grid, Dialog, DialogTitle, IconButton, DialogContent} from "@mui/material";
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import SystemService from "../services/api/system.service";

/** Translation */
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        backgroundColor: theme.palette.menu.background,
        //position: 'absolute !important',
        position: 'fixed',
        left: "0",
        bottom: '0',
        color: '#b0b0b0',
        //marginTop: '20px',
        textAlign: "center",
        width: "100%"
    },
}));

export default function Footer() {
    const { t } = useTranslation('common');

    /** THEME */
    const theme = useTheme();
    const classes = useStyles(theme);

    const year = new Date().getFullYear()

    /** Dialog **/
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(null);
    const [content, setContent] = React.useState(null);
    const handleClickOpen = async (name) => {
        setTitle(t("titles."+name));

        let response = null;
        if (name==="contactUs") response = await SystemService.getContactUs();
        else if (name==="faq") response =  await SystemService.getFaq();
        else if (name==="privacyPolicy") response =  await SystemService.getPrivacyPolicy();
        else if (name==="terms&Conditions") response =  await SystemService.getTerms();

        if (response && response.items) setContent(response.items.value || '');
        else setContent('');

        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.mainContainer}>

            <Grid container>
                <Grid item xs={12}>
                    <Typography style={{color: "#b0b0b0"}}>
                        {year} © Perennity
                    </Typography>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs> </Grid>
                <Grid container item xs="auto">
                    <Grid container spacing={2}>
                        <Grid item xs="auto">
                            <Link
                                component="button"
                                variant="body2"
                                underline="none"
                                onClick={(e) => {handleClickOpen('contactUs')}}
                            >
                                {t('buttons.contact_us')}
                            </Link>
                        </Grid>
                        <Grid item xs="auto">-</Grid>
                        <Grid item xs="auto">
                            <Link
                                component="button"
                                variant="body2"
                                underline="none"
                                onClick={(e) => {handleClickOpen('faq')}}
                            >
                                {t('buttons.faq')}
                            </Link>
                        </Grid>
                        <Grid item xs="auto">-</Grid>
                        <Grid item xs="auto">
                            <Link
                                component="button"
                                variant="body2"
                                underline="none"
                                onClick={(e) => {handleClickOpen('privacyPolicy')}}
                            >
                                {t('buttons.privacy_policy')}
                            </Link>
                        </Grid>
                        <Grid item xs="auto">-</Grid>
                        <Grid item xs="auto">
                            <Link
                                component="button"
                                variant="body2"
                                underline="none"
                                onClick={(e) => {handleClickOpen('terms&Conditions')}}
                            >
                                {t("buttons.terms_conditions")}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs> </Grid>
            </Grid>

            <Dialog
                fullWidth={true}
                maxWidth="xl"
                open={open}
                onClose={handleClose}
                //TransitionComponent={Transition}
            >
                <DialogTitle>
                    {title || ''}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <div dangerouslySetInnerHTML={{__html: content}}></div>
                </DialogContent>
            </Dialog>
        </div>
    )
}