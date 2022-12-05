import React, {useCallback, useRef, useState} from 'react';
import AuthCode from 'react-auth-code-input';
import IllustrationLayout from "../components/IllustrationLayout";
import BackgroundLayout from "../components/BackgroundLayout";
import {Button, Divider, Grid, Typography} from "@mui/material";
import GeneralService from "../../../services/api/general.service";

/** Translation */
import { useTranslation } from 'react-i18next';
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import swal from "sweetalert";
import UsersService from "../../../services/api/users.service";

// Image
const bgImage = "/images/loginbg.jpg";

const TwoFactorAuthentication = () => {
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
        },

        code_input: {
            width: "45px",
            height: "45px",
            padding: "0",
            fontSize: "24px",
            textAlign: "center",
            marginRight: "12px",
            textTransform: "uppercase",
            color: "#494949",
            fontFamily: "SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
            border: "1px solid #d6d6d6",
            borderRadius: "4px",
            background: "#fff",
            backgroundClip: "padding-box"
        }
    }));

    const classes = useStyles(theme);

    const AuthInputRef = useRef(null);
    const [code, setCode] = useState();
    const [isPassword, setIsPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [allowedCharacters, setAllowedCharacters] = useState('numeric');
    const handleOnChange = (res) => {
        setCode(res);

        if (!res) return;
        if (res.length!=6) return;

        UsersService.validate2FA(res).then((res) => {
            if (res.error) {
                swal("Failed", res.error, "error");

                //Clear Code
                AuthInputRef.current?.clear();

                return;
            }

            swal("Success", t("messages.login_success"), "success", {
                buttons: false,
                timer: 2000,
            })
                .then(() => {
                    window.location.href = "/studies"; // REDIRECTION APRES SUCCESS ? PROFILE OU STUDIES ?
                });
        });

    };

    const [otpTimer, setOtpTimer] = useState(60);
    const timeOutCallback = useCallback(() => setOtpTimer(currTimer => currTimer - 1), []);
    React.useEffect(() => {
        otpTimer > 0 && setTimeout(timeOutCallback, 1000);
    }, [otpTimer, timeOutCallback]);

    const refreshOTP = () => {
        UsersService.generate2FA().then((res) => {
            if (res.error) {
                swal("Failed", res.error, "error");
                return;
            }
            setOtpTimer(60);
        });
    }

    React.useEffect(() => {
        //Generate new code
        refreshOTP();
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

                        <Grid align='center' sx={{whiteSpace: "pre-line"}}>
                            <h1>
                                {t("2fa.title")}
                            </h1>
                            <AuthCode
                                key={allowedCharacters}
                                allowedCharacters={allowedCharacters}
                                ref={AuthInputRef}
                                onChange={handleOnChange}
                                containerClassName='container'
                                inputClassName={classes.code_input}
                                isPassword={isPassword}
                                disabled={disabled}
                            />
                            <p>{t("2fa.description")}</p>
                        </Grid>
                        <Grid align='center'>
                            {t("2fa.no_otp")}
                        </Grid>
                        <Grid align='center'>
                            <Button
                                disabled={otpTimer>0}
                                onClick={() => {refreshOTP()}}
                            >
                                {otpTimer>0? t("2fa.actions.resend_otp_timer", {seconds: otpTimer}):t("2fa.actions.resend_otp")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </IllustrationLayout>
    );
}

export default TwoFactorAuthentication;

