import React, { useState } from "react";

import {Box, Button, Divider, Grid, Link, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import ClientCaptcha from "react-client-captcha";
import swal from "sweetalert";
import AuthService from "../../../services/api/auth.service";
import sha512 from "js-sha512";
import BackgroundLayout from "../components/BackgroundLayout";
import IllustrationLayout from "../components/IllustrationLayout";
import LoginStorage from "../../../services/storage/login.storage";

// Image
const bgImage = "/images/loginbg.jpg";

function Signin() {
    /** THEME AND CSS */
    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        background: {
            height: "90vh",
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
        }
    }));

    const classes = useStyles(theme);

    const [rememberMe, setRememberMe] = useState(false);

    const handleSetRememberMe = () => setRememberMe(!rememberMe);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState();
    const [userCaptcha, setUserCaptcha] = useState();
    const password_sha = sha512(password);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!username) {
            swal("Failed", "Username is required!", "error");
            return;
        }

        if (!password) {
            swal("Failed", "Password is required!", "error");
            return;
        }

        if (useCaptcha===true || useCaptcha==="true") {
            if (userCaptcha !== captcha) {
                swal("Failed", "Protection Code is incorrect!", "error");
                return;
            }
        }

        const response = await AuthService.login(username, password_sha);
        if (response.error) {
            swal("Failed", response.error, "error");
            return;
        }

        swal("Success", "Login successful", "success", {
            buttons: false,
            timer: 2000,
        })
            .then((value) => {
                window.location.href = "/studies"; // REDIRECTION APRES SUCCESS ? PROFILE OU STUDIES ?
            });
    }

    const handleRecaptcha = (token, ekey) => {
        console.log("Captcha token: "+token+" ("+ekey+")");
    }

    const [useCaptcha, setUseCaptcha] = useState(true);
    const [useReference, setUseReference] = useState(false);
    React.useEffect(() => {
        LoginStorage.getConfig()
            .then(rsp => {
                if (!rsp) return;
                if (rsp['WEB.login_captcha']) setUseCaptcha(rsp['WEB.login_captcha'].value);
                if (rsp['WEB.login_by_reference']) setUseReference(rsp['WEB.login_by_reference'].value);
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
                                id="username"
                                name="username"
                                label="Username"
                                autoComplete="username"
                                onChange={e => setUserName(e.target.value)}
                            />
                            <TextField
                                style={{ marginBottom: '15px' }}
                                variant="standard"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />

                            <Grid
                                container
                                item
                                xs
                                justifyContent="right"
                                alignItems="center">
                                <Link href="/forgot">Forgot password?</Link>
                            </Grid>

                            {
                                (useCaptcha===true || useCaptcha==="true") &&

                                <>
                                    <p>Protection code: </p>

                                    <ClientCaptcha
                                        backgroundColor={"#EDEDED"}
                                        captchaCode={setCaptcha}
                                        charsCount={6}
                                        width={300}
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

                            {
                                (useReference===true || useReference==="true") &&
                                <Grid
                                    container
                                    item
                                    xs
                                    justifyContent="left"
                                    alignItems="center"
                                >
                                    <Typography variant="body2">I want to access my studies with my <Link
                                        href="/login-access">Access Code</Link>.</Typography>
                                </Grid>
                            }

                            {
                                /*<Grid
                                    container
                                    item
                                    xs
                                    justifyContent="left"
                                    alignItems="center"
                                >
                                    <Typography variant="body2">Not registered? <Link href="#">Sign Up Now</Link>.</Typography>
                                </Grid>*/
                            }
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </IllustrationLayout>
    );
}

export default Signin;