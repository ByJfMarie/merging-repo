import React, { useState } from "react";

import {Box, Button, Divider, Grid, Link, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import swal from "sweetalert";
import BackgroundLayout from "../components/BackgroundLayout";
import IllustrationLayout from "../components/IllustrationLayout";
import Reaptcha from "reaptcha";
import AuthService from "../../../services/api/auth.service";
import GeneralService from "../../../services/api/general.service";

/** Translation */
import { useTranslation } from 'react-i18next';

// Image
const bgImage = "/images/loginbg.jpg";

function Forgot() {
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

    const [username, setUserName] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        if (!username) {
            swal("Failed", t("msg_error.username_required"), "error");
            return;
        }

        if (useCaptcha===true && !captchaValue) {
            swal("Failed", t("msg_error.captcha_required"), "error");
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
        AuthService.config()
            .then(rsp => {
                if (!rsp || !rsp.items) return;
                setUseCaptcha(rsp.items.enable_captcha);
                setCaptchaSiteKey(rsp.items.captcha_site_key);
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
                                {t("buttons.forgot")}
                            </Button>

                            <Box sx={{ m: 2 }} />

                            <Grid
                                container
                                item
                                xs
                                justifyContent="right"
                                alignItems="center"
                            >
                                <Link href="/login">{t("actions.back_login")}</Link>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </IllustrationLayout>
    );
}

export default Forgot;