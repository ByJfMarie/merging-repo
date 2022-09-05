import React, { useState } from "react";

import {Box, Button, Divider, Grid, Link, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import swal from "sweetalert";
import BackgroundLayout from "../components/BackgroundLayout";
import IllustrationLayout from "../components/IllustrationLayout";
import LoginStorage from "../../../services/storage/login.storage";
import Reaptcha from "reaptcha";

// Image
const bgImage = "/images/loginbg.jpg";

function Forgot() {
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

    const [username, setUserName] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        if (!username) {
            swal("Failed", "Username is required!", "error");
            return;
        }

        if (useCaptcha===true && !captchaValue) {
            swal("Failed", "Captcha is incorrect!", "error");
            return;
        }
    }

    /*const handleRecaptcha = (token, ekey) => {
        console.log("Captcha token: "+token+" ("+ekey+")");
    }*/

    const [verified, setVerified] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    function onVerify(value) {
        setVerified(true);
        setCaptchaValue(value);
    }

    const [useCaptcha, setUseCaptcha] = useState(false);
    const [captchaSiteKey, setCaptchaSiteKey] = useState(false);
    React.useEffect(() => {
        LoginStorage.getConfig()
            .then(rsp => {
                if (!rsp) return;
                setUseCaptcha(rsp.enable_captcha);
                setCaptchaSiteKey(rsp.captcha_site_key);
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
                            <img src="/images/logo.svg" alt="Logo" style={{ width: "100%"}} />
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

                            {
                                (useCaptcha===true || useCaptcha==="true") &&

                                <>
                                    <Box sx={{ m: 4 }} />

                                    <Grid
                                        container
                                        item
                                        xs
                                        justifyContent="center"
                                        alignItems="center">
                                        <Reaptcha
                                            sitekey={captchaSiteKey}
                                            onVerify={onVerify}
                                        />
                                    </Grid>
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
                                disabled={useCaptcha && !verified}
                            >
                                Forgot Password
                            </Button>

                            <Box sx={{ m: 2 }} />

                            <Grid
                                container
                                item
                                xs
                                justifyContent="right"
                                alignItems="center"
                            >
                                <Link href="/login">Back to Login</Link>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </IllustrationLayout>
    );
}

export default Forgot;