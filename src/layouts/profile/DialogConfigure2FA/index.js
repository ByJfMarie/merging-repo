import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {
    Box, Button,
    Card, CardActionArea,
    CardContent, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, List, ListItem, ListItemText, Slide, Step, StepLabel,
    Stepper, TextField,
    Typography
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {useTranslation} from "react-i18next";
import {useTheme} from "@emotion/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import UsersService from "../../../services/api/users.service";
import UserStorage from "../../../services/storage/user.storage";
import {useSnackbar} from "notistack";
import UserContext from "../../../components/UserContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogConfigure2FA = forwardRef(({refreshSettings}, ref) => {

    const {t} = useTranslation('profile');

    const { enqueueSnackbar } = useSnackbar();

    /** User & privileges */
    const {status2FA} = React.useContext(UserContext);

    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [channel, setChannel] = React.useState("");
    const [code, setCode] = React.useState("");

    const innerRef = useRef();

    useImperativeHandle(ref, () => ({
        openDialog: () => setOpen(true),
        closeDialog: () => setOpen(false),
        defaultMail: (mail) => setEmail(mail),
        defaultPhone: (phone) => setPhone(phone)
    }));

    const steps = ["Select", "Configure", "Verify", "Status"];
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const handleSelectChannel = (channel) => {
        setChannel(channel);
        setActiveStep(1);
    }

    const handleVerifyEmail = () => {
        //Send code (API)
        UsersService.profileTest2FA(channel, channel==="mail"?email:phone).then((rsp) => {
            if (!rsp.error) setActiveStep(2);
        });
    }
    const handleFinish = () => {
        //Validate code (API)
        UsersService.profileTest2FAConfirm(channel, channel==="mail"?email:phone,code).then((rsp) => {
            if (!rsp.error) setActiveStep(3);
        });
    }
    const handleSave = async () => {
        //Save config
        UsersService.save2FAConfig(channel, channel==="mail"?email:phone).then((rsp) => {
            if (rsp.error) {
                enqueueSnackbar(t("messages.save_2fa.error", {error: rsp.error}), {variant: 'error'});
                return;
            }

            //Remove
            UserStorage.removeUser2FA();
            refreshSettings();
            handleClose();
            enqueueSnackbar(t("messages.save_2fa.success"), {variant: 'success'});
        });
    }
    const handleClose = () => {
        setOpen(false);
        setActiveStep(0);
        setEmail("");
        setPhone("");
        setChannel("");
        setCode("");
    };

    const handlePrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setCode("");
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                ref={innerRef}
                fullWidth
                maxWidth="md"
                scroll="paper"
                TransitionComponent={Transition}
            >
                <DialogTitle>
                    <Box sx={{width: '100%', mt: 2, mb: 2}}>
                        <Stepper activeStep={activeStep}>
                            <Step key={steps[0]}>
                                <StepLabel>Select</StepLabel>
                            </Step>
                            <Step key="configure-channel">
                                <StepLabel>Configure</StepLabel>
                            </Step>
                            <Step key="verify-channel">
                                <StepLabel>Verify</StepLabel>
                            </Step>
                            <Step key="status-channel">
                                <StepLabel>Status</StepLabel>
                            </Step>
                        </Stepper>
                    </Box>
                </DialogTitle>

                <DialogContent dividers={true} style={{backgroundColor: theme.palette.dialog.color}}>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{mt: 2}}/>

                        {
                            activeStep === 0 && (
                                <React.Fragment>

                                    <Typography variant="h5">
                                        How would you like to receive your authentication codes?
                                    </Typography>

                                    <Typography variant="subtitle2">
                                        You will be asked for an authentication code when you sign in to your account.
                                    </Typography>

                                    <Box sx={{mt: 2}}/>

                                    {
                                        status2FA && status2FA.mail && (
                                            <React.Fragment>
                                                <CardActionArea
                                                    onClick={() => {
                                                        handleSelectChannel("mail")
                                                    }}
                                                >
                                                    <Card sx={{display: 'flex'}}>
                                                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                            <CardContent sx={{flex: '1 0 auto'}}>
                                                                <Typography variant="h5" component="div" sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    flexWrap: 'wrap'
                                                                }}>
                                                                    <EmailIcon/> &nbsp; Email &nbsp; <ArrowForwardIcon/>
                                                                </Typography>
                                                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                                                    Receive an email to your inbox when signing in.
                                                                </Typography>
                                                            </CardContent>
                                                        </Box>
                                                    </Card>
                                                </CardActionArea>

                                                <Box sx={{mt: 2}}/>
                                            </React.Fragment>
                                        )
                                    }

                                    {
                                        status2FA && status2FA.sms && (
                                            <React.Fragment>
                                                <CardActionArea
                                                    onClick={() => {
                                                        handleSelectChannel("sms")
                                                    }}
                                                >
                                                    <Card sx={{display: 'flex'}}>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                            <CardContent sx={{flex: '1 0 auto'}}>
                                                                <Typography variant="h5" component="div" sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    flexWrap: 'wrap'
                                                                }}>
                                                                    <SmsIcon/> &nbsp; SMS Text Message &nbsp;
                                                                    <ArrowForwardIcon/>
                                                                </Typography>
                                                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                                                    Receive a text message to your mobile device when
                                                                    signing in.
                                                                </Typography>
                                                            </CardContent>
                                                        </Box>
                                                    </Card>
                                                </CardActionArea>

                                                <Box sx={{mt: 2}}/>
                                            </React.Fragment>
                                        )
                                    }

                                    {
                                        status2FA && status2FA.whatsapp && (
                                            <React.Fragment>
                                                <CardActionArea
                                                    onClick={() => {
                                                        handleSelectChannel("whatsapp")
                                                    }}
                                                >
                                                    <Card sx={{display: 'flex'}}>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                            <CardContent sx={{flex: '1 0 auto'}}>
                                                                <Typography variant="h5" component="div" sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    flexWrap: 'wrap'
                                                                }}>
                                                                    <WhatsAppIcon/> &nbsp; Whatsapp Text Message &nbsp;
                                                                    <ArrowForwardIcon/>
                                                                </Typography>
                                                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                                                    Receive a whatsapp message to your mobile device when
                                                                    signing in.
                                                                </Typography>
                                                            </CardContent>
                                                        </Box>
                                                    </Card>
                                                </CardActionArea>
                                            </React.Fragment>
                                        )
                                    }
                                </React.Fragment>
                            )
                        }

                        {
                            activeStep === 1 && (
                                <React.Fragment>
                                    <Typography variant="h5">
                                        {t("dialog_2fa_configure.step_configure."+channel+".title")}
                                    </Typography>
                                    <Box sx={{mt: 1}}/>
                                    <Typography variant="subtitle2" sx={{whiteSpace:"pre-wrap"}}>
                                        {t("dialog_2fa_configure.step_configure."+channel+".subtitle")}
                                    </Typography>

                                    <Box sx={{mt: 2}}/>

                                    <TextField
                                        id="email"
                                        fullWidth
                                        value={channel==="mail"?email:phone}
                                        onChange={(e) => channel==="mail"?setEmail(e.target.value):setPhone(e.target.value)}
                                    />
                                </React.Fragment>
                            )
                        }

                        {
                            activeStep === 2 && (
                                <React.Fragment>
                                    <Typography variant="h5">
                                        {t("dialog_2fa_configure.step_verify."+channel+".title")}
                                    </Typography>
                                    <Box sx={{mt: 1}}/>
                                    <Typography variant="subtitle2" sx={{whiteSpace:"pre-wrap"}}>
                                        {t("dialog_2fa_configure.step_verify."+channel+".subtitle")}
                                    </Typography>

                                    <Box sx={{mt: 2}}/>

                                    <TextField
                                        id="code"
                                        fullWidth
                                        variant="standard"
                                        label="Code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </React.Fragment>
                            )
                        }

                        {
                            activeStep === 3 && (
                                <React.Fragment>
                                    <Typography variant="h5">
                                        {t("dialog_2fa_configure.step_status."+channel+".title")}
                                    </Typography>
                                    <Box sx={{mt: 1}}/>
                                    <Typography variant="subtitle2" sx={{whiteSpace:"pre-wrap"}}>
                                        {t("dialog_2fa_configure.step_status."+channel+".subtitle")}
                                    </Typography>
                                    <Box sx={{mt: 2}}/>
                                    <Typography variant="h6">
                                        {t("dialog_2fa_configure.step_status."+channel+".how_it_works.title")}
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary={t("dialog_2fa_configure.step_status."+channel+".how_it_works.step1.title")}
                                                secondary={t("dialog_2fa_configure.step_status."+channel+".how_it_works.step1.subtitle")}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={t("dialog_2fa_configure.step_status."+channel+".how_it_works.step2.title")}
                                                secondary={t("dialog_2fa_configure.step_status."+channel+".how_it_works.step2.subtitle")}
                                            />
                                        </ListItem>
                                    </List>
                                </React.Fragment>
                            )
                        }
                        <Box sx={{mt: 2}}/>
                    </Box>
                </DialogContent>

                <DialogActions style={{backgroundColor: theme.palette.dialog.color}}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Button
                                variant="contained"
                                color="error"
                                component="label"
                                startIcon={<CloseIcon/>}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </Grid>

                        <Grid container spacing={2} item xs justifyContent="flex-end">

                            {
                                activeStep > 0 && (
                                    <React.Fragment>
                                        <Grid item xs="auto">
                                            <Button
                                                variant="outlined"
                                                //color="secondary"
                                                component="label"
                                                startIcon={<ArrowBackIcon/>}
                                                onClick={handlePrevious}
                                            >
                                                Prev
                                            </Button>
                                        </Grid>
                                    </React.Fragment>
                                )
                            }

                            {
                                activeStep === 1 && (
                                    <React.Fragment>
                                        <Grid item xs="auto">
                                            <Button
                                                variant="contained"
                                                color="success"
                                                component="label"
                                                endIcon={<ArrowForwardIcon/>}
                                                onClick={handleVerifyEmail}
                                            >
                                                Next
                                            </Button>
                                        </Grid>
                                    </React.Fragment>
                                )
                            }
                            {
                                activeStep === 2 && (
                                    <React.Fragment>
                                        <Grid item xs="auto">
                                            <Button
                                                variant="contained"
                                                color="success"
                                                component="label"
                                                endIcon={<ArrowForwardIcon/>}
                                                onClick={handleFinish}
                                            >
                                                Next
                                            </Button>
                                        </Grid>
                                    </React.Fragment>
                                )
                            }

                            {
                                activeStep === 3 && (
                                    <React.Fragment>
                                        <Grid item xs="auto">
                                            <Button
                                                variant="contained"
                                                color="success"
                                                component="label"
                                                endIcon={<ArrowForwardIcon/>}
                                                onClick={handleSave}
                                            >
                                                Finish
                                            </Button>
                                        </Grid>
                                    </React.Fragment>
                                )
                            }
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
});

export default DialogConfigure2FA;