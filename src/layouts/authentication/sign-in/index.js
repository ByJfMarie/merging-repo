import React, { useState } from "react";

import {Box, Button, Divider, Grid, Link, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import swal from "sweetalert";
import AuthService from "../../../services/api/auth.service";
import sha512 from "js-sha512";
import BackgroundLayout from "../components/BackgroundLayout";
import IllustrationLayout from "../components/IllustrationLayout";
import Reaptcha from 'reaptcha';
import GeneralService from "../../../services/api/general.service";

/** Translation */
import { useTranslation } from 'react-i18next';

// Image
const bgImage = "/images/loginbg.jpg";

function Signin() {
    const { t } = useTranslation('login');

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

    //const [rememberMe, setRememberMe] = useState(false);
    //const handleSetRememberMe = () => setRememberMe(!rememberMe);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const password_sha = sha512(password);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!username) {
            swal("Failed", t("msg_error.username_required"), "error");
            return;
        }

        if (!password) {
            swal("Failed", t("msg_error.password_required"), "error");
            return;
        }

        if (useCaptcha===true && !captchaValue) {
            swal("Failed", t("msg_error.captcha_required"), "error");
            return;
        }

        const response = await AuthService.login(username, password_sha, captchaValue);
        if (response.error) {
            swal("Failed", response.error, "error");
            return;
        }

        swal("Success", t("msg_info.login_success"), "success", {
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

    const [useCaptcha, setUseCaptcha] = useState(false);
    const [captchaSiteKey, setCaptchaSiteKey] = useState(false);
    const [useReference, setUseReference] = useState(false);
    React.useEffect(() => {
        AuthService.config()
            .then(rsp => {
                if (!rsp || !rsp.items) return;
                setUseCaptcha(rsp.items.enable_captcha);
                setCaptchaSiteKey(rsp.items.captcha_site_key);
                setUseReference(rsp.items.enable_ref_login);
            });
    }, [])

    const [verified, setVerified] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    function onVerify(value) {
        setVerified(true);
        setCaptchaValue(value);
    }

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
                    <Grid item xs={12}><Typography variant="h2">{t("texts.portal_name")}</Typography></Grid>
                    <Grid item xs={12}><Divider  sx={{borderColor: 'white'}}/></Grid>
                    <Grid item xs={12}><Typography variant="h4">{t("texts.portal_subtitle")}</Typography></Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            {t("texts.portal_welcome_text.line_1")}<br/>
                            {t("texts.portal_welcome_text.line_2")}<br/>
                            {t("texts.portal_welcome_text.line_3")}<br/>
                            {t("texts.portal_welcome_text.line_4")}<br/>
                            {t("texts.portal_welcome_text.line_5")}<br/>
                        </Typography>
                    </Grid>
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
                            <img src={GeneralService.getLogoURL()} alt="Logo" width="100%"/>
                        </Grid>

                        <form noValidate onSubmit={handleSubmit}>
                            <TextField
                                style={{ marginBottom: '15px' }}
                                variant="standard"
                                required
                                fullWidth
                                id="username"
                                name="username"
                                label={t("fields.username")}
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
                                label={t("fields.password")}
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
                                <Link href="/forgot">{t("actions.forgot_password")}</Link>
                            </Grid>

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
                                {t("buttons.sign_in")}
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
                                    <Typography variant="h6">{t("actions.reference_login.text")} <Link
                                        href="/login-access">{t("actions.reference_login.link")}</Link></Typography>
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
                                    <Typography variant="h6">Not registered? <Link href="#">Sign Up Now</Link></Typography>
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