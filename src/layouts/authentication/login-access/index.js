import React, { useState } from "react";

import {Box, Button, Divider, Grid, Link, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import swal from "sweetalert";
import AuthService from "../../../services/api/auth.service";
import BackgroundLayout from "../components/BackgroundLayout";
import IllustrationLayout from "../components/IllustrationLayout";
import Reaptcha from "reaptcha";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import GeneralService from "../../../services/api/general.service";

/** Translation */
import { useTranslation } from 'react-i18next';

// Image
const bgImage = "/images/loginbg.jpg";

function LoginAccess() {
    const { t } = useTranslation(['login', 'common']);

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

    const handleSubmit = async e => {
        e.preventDefault();

        if (!reference) {
            swal("Failed", t("messages.reference_required"), "error");
            return;
        }

        if (!birthdate) {
            swal("Failed", t("messages.birthdate_required"), "error");
            return;
        }

        if (useCaptcha===true && !captchaValue) {
            swal("Failed", t("messages.captcha_required"), "error");
            return;
        }

        const response = await AuthService.loginReference(reference, birthdate, captchaValue);
        if (response.error) {
            swal("Failed", response.error, "error");
            return;
        }

        swal("Success", t("messages.login_success"), "success", {
            buttons: false,
            timer: 2000,
        })
            .then(() => {
                window.location.href = "/studies"; // REDIRECTION APRES SUCCESS ? PROFILE OU STUDIES ?
            });
    }

    const [verified, setVerified] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    function onVerify(value) {
        setVerified(true);
        setCaptchaValue(value);
    }

    const [dateFormat, setDateFormat] = useState("dd/MM/yyyy");
    const [useCaptcha, setUseCaptcha] = useState(false);
    const [captchaSiteKey, setCaptchaSiteKey] = useState(false);
    React.useEffect(() => {
        AuthService.config()
            .then(rsp => {
                if (!rsp || !rsp.items) return;
                setDateFormat(rsp.items.date_format);
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
                    <Grid item xs={12}><Typography variant="h2">{t("portal_name", {ns: "common"})}</Typography></Grid>
                    <Grid item xs={12}><Divider  sx={{borderColor: 'white'}}/></Grid>
                    <Grid item xs={12}><Typography variant="h4">{t("portal_welcome.title")}</Typography></Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            {t("portal_welcome.line_1")}<br/>
                            {t("portal_welcome.line_2")}<br/>
                            {t("portal_welcome.line_3")}<br/>
                            {t("portal_welcome.line_4")}<br/>
                            {t("portal_welcome.line_5")}<br/>
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
                                id="access_code"
                                name="access_code"
                                label={t("login_by_reference.reference_number")}
                                onChange={e => setReference(e.target.value)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="birthdate"
                                    label={t("login_by_reference.birthdate")}
                                    inputFormat={dateFormat}
                                    value={""}
                                    onChange={(date, keyboardInputValue) => {
                                        if (keyboardInputValue && keyboardInputValue.length>0 && keyboardInputValue.length<10) return;
                                        setBirthdate(date);
                                    }}
                                    renderInput={
                                        (params) => <TextField InputLabelProps={{ shrink: true }} variant="standard" fullWidth {...params} required/>
                                    }
                                    dateAdapter={AdapterDateFns}
                                />
                            </LocalizationProvider>

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
                                {t("login_by_reference.actions.sign_in")}
                            </Button>

                            <Box sx={{ m: 2 }} />

                            <Grid
                                container
                                item
                                xs
                                justifyContent="left"
                                alignItems="center"
                            >
                                <Typography variant="h6">{t("login_by_reference.actions.login.text")} <Link href="/login">{t("login_by_reference.actions.login.link")}</Link></Typography>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </IllustrationLayout>
    );
}

export default LoginAccess;