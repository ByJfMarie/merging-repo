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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogConfigure2FA = forwardRef(({refreshSettings}, ref) => {

    const {t} = useTranslation('common');

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
        UsersService.profileTest2FA(channel, email).then((rsp) => {
            if (!rsp.error) setActiveStep(2);
        });
    }
    const handleFinish = () => {
        //Validate code (API)
        UsersService.profileTest2FAConfirm(channel, code).then((rsp) => {
            if (!rsp.error) setActiveStep(3);
        });
    }
    const handleSave = async () => {
        //Save config
        UsersService.save2FAConfig(channel, email).then((rsp) => {
            if (!rsp.error) {
                //Remove
                UserStorage.removeUser2FA();
                refreshSettings();
                handleClose();
            }
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

                                    <CardActionArea
                                        onClick={() => {
                                            handleSelectChannel("sms")
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
                                                        <SmsIcon/> &nbsp; SMS Text Message &nbsp; <ArrowForwardIcon/>
                                                    </Typography>
                                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                                        Receive a text message to your mobile device when signing in.
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </CardActionArea>

                                    <Box sx={{mt: 2}}/>

                                    <CardActionArea
                                        onClick={() => {
                                            handleSelectChannel("whatsapp")
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
                                                        <WhatsAppIcon/> &nbsp; Whatsapp Text Message &nbsp;
                                                        <ArrowForwardIcon/>
                                                    </Typography>
                                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                                        Receive a whatsapp message to your mobile device when signing in.
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </CardActionArea>
                                </React.Fragment>
                            )
                        }

                        {
                            activeStep === 1 && (
                                <React.Fragment>
                                    <Typography variant="h5">
                                        Email
                                    </Typography>
                                    <Box sx={{mt: 1}}/>
                                    <Typography variant="subtitle2">
                                        Please enter your email address, then click the button "Next". <br/> You will
                                        receive a security code in your inbox. On the next step you
                                        must confirm this code.
                                    </Typography>

                                    <Box sx={{mt: 2}}/>

                                    <TextField
                                        id="email"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </React.Fragment>
                            )
                        }

                        {
                            activeStep === 2 && (
                                <React.Fragment>
                                    <Typography variant="h5">
                                        Verify your Email
                                    </Typography>
                                    <Box sx={{mt: 1}}/>
                                    <Typography variant="subtitle2">
                                        You'll need to confirm that you still have access to this email before change
                                        authentication method. Please check your email inbox for incoming mail and enter the
                                        security code below:
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
                                        Successfully
                                    </Typography>
                                    <Box sx={{mt: 1}}/>
                                    <Typography variant="subtitle2">
                                        You have successfully confirmed your email.
                                    </Typography>
                                    <Box sx={{mt: 2}}/>
                                    <Typography variant="h6">
                                        How it works
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="1. You will enter your password"
                                                secondary="Whenever you sign in, you will enter your password as usual."
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="2. You will ask for a security code"
                                                secondary="Then enter the security code from your email inbox."
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