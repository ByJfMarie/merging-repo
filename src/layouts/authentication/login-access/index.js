import React, { useState } from "react";

import {Box, Button, Divider, Grid, Link, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import ClientCaptcha from "react-client-captcha";
import swal from "sweetalert";
import AuthService from "../../../services/api/auth.service";
import BackgroundLayout from "../components/BackgroundLayout";
import IllustrationLayout from "../components/IllustrationLayout";
import LoginStorage from "../../../services/storage/login.storage";

// Image
const bgImage = "/images/loginbg.jpg";

function LoginAccess() {
    /** THEME AND CSS */
    const theme = useTheme();

    const useStyles = makeStyles(() => ({
        background: {
            height: "90vh",
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
        }
    }));

    const classes = useStyles(theme);

    const [reference, setReference] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [captcha, setCaptcha] = useState();
    const [userCaptcha, setUserCaptcha] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        if (!reference) {
            swal("Failed", "Reference is required!", "error");
            return;
        }

        if (!birthdate) {
            swal("Failed", "Birthdate is required!", "error");
            return;
        }

        if (useCaptcha===true || useCaptcha==="true") {
            if (userCaptcha !== captcha) {
                swal("Failed", "Protection Code is incorrect!", "error");
                return;
            }
        }

        const response = await AuthService.loginReference(reference, birthdate);
        if (response.error) {
            swal("Failed", response.error, "error");
            return;
        }

        swal("Success", "Login successful", "success", {
            buttons: false,
            timer: 2000,
        })
            .then(() => {
                window.location.href = "/studies"; // REDIRECTION APRES SUCCESS ? PROFILE OU STUDIES ?
            });
    }

    /*const handleRecaptcha = (token, ekey) => {
        console.log("Captcha token: "+token+" ("+ekey+")");
    }*/

    const [useCaptcha, setUseCaptcha] = useState(true);
    React.useEffect(() => {
        LoginStorage.getConfig()
            .then(rsp => {
                if (!rsp) return;
                if (!rsp['WEB.login_captcha']) return;
                setUseCaptcha(rsp['WEB.login_captcha'].value);
            });
    }, []);

    return (
        <IllustrationLayout>
            <Grid
                item
                className={classes.background}
                xs={12}
                md={6}
                sx={{
                    display: {xs: 'none', md: 'block'}
                }}
            >
                <BackgroundLayout
                    bgImage={bgImage}
                >
                    <Grid item xs={12}><Typography variant="h2">My Image Portal</Typography></Grid>
                    <Grid item xs={12}><Divider  sx={{borderColor: 'white'}}/></Grid>
                    <Grid item xs={12}><Typography variant="h4">Access your studies</Typography></Grid>
                    <Grid item xs={12}><Typography variant="body2">Welcome to the Perennity Radiology Portal.<br/>This portal access is only available for authorized users.</Typography></Grid>
                </BackgroundLayout>
            </Grid>

            <Grid
                item
                xs={12}
                md={6}
                p={2}
            >
                <Grid
                    container
                    sx={{height: '100%'}}
                    justifyContent="center"
                    alignItems="center"
                >

                    <Grid
                        item
                        xs={12}
                        md={10}
                        lg={8}
                    >
                        <Grid align='center'>
                            <img src="/images/logo.svg" alt="Logo" style={{ width: "90%"}} />
                            {/*<h2>Sign In</h2>*/}
                        </Grid>

                        <form noValidate onSubmit={handleSubmit}>
                            <TextField
                                style={{ marginBottom: '15px' }}
                                variant="standard"
                                required
                                fullWidth
                                id="access_code"
                                name="access_code"
                                label="Access Code"
                                onChange={e => setReference(e.target.value)}
                            />
                            <TextField
                                style={{ marginBottom: '15px' }}
                                variant="standard"
                                required
                                fullWidth
                                id="birthdate"
                                name="birthdate"
                                label="Birthdate"
                                onChange={e => setBirthdate(e.target.value)}
                            />

                            {
                                (useCaptcha===true || useCaptcha==="true") &&

                                <>
                                    <p>Protection code: </p>

                                    <ClientCaptcha
                                        backgroundColor={"#EDEDED"}
                                        captchaCode={setCaptcha}
                                        charsCount={6}
                                        width={300}
                                        height={40}
                                        retry={false}
                                    />

                                    <TextField
                                        style={{ marginBottom: '15px' }}
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="captcha"
                                        name="captcha"
                                        label=""
                                        onChange={e => setUserCaptcha(e.target.value)}
                                    />
                                </>
                            }

                            <Box sx={{ m: 4 }} />

                            <Button
                                type='submit'
                                color='primary'
                                variant="contained"
                                sx={{
                                    margin: '8px 0'
                                }}
                                fullWidth
                            >
                                Sign in
                            </Button>

                            <Box sx={{ m: 2 }} />

                            <Grid
                                container
                                item
                                xs
                                justifyContent="left"
                                alignItems="center"
                            >
                                <Typography variant="h6">Sign in with <Link href="/login">Login & Password</Link></Typography>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </IllustrationLayout>
    );
}

export default LoginAccess;