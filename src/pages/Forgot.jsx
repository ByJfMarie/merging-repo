import React, { useState } from 'react'
import {Container, Grid, Paper, TextField, Button, Typography, Divider, Link} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import swal from 'sweetalert';
import sha512 from 'js-sha512';

import AuthService from "../services/api/auth.service";
import Background from "../components/login/Background";

import ClientCaptcha from 'react-client-captcha'

export default function Forgot() {

    // function changeRole(props) {
    //     switch (props) {
    //         case 'administrator':
    //             localStorage.setItem('userRole', 'administrator');
    //             break;
    //         case 'patient':
    //             localStorage.setItem('userRole', 'patient');
    //             break;
    //         case 'doctor':
    //             localStorage.setItem('userRole', 'doctor');
    //             break;
    //         case 'radiologist':
    //             localStorage.setItem('userRole', 'radiologist');
    //             break;
    //         default:
    //             localStorage.setItem('userRole', 'patient');
    //     }
    //     localStorage.setItem('privileges', "");
    // }

    /** THEME AND CSS */

    const paperStyle = { padding: 20, width: '100%', margin: "auto"}
    const btnstyle = { margin: '8px 0' }

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

        if (userCaptcha !== captcha) {
            swal("Failed", "Protection Code is incorrect!", "error");
            return;
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

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Container maxWidth="lg">
                <Background>
                    <Grid
                        container
                        sx={{height: '100%'}}
                        alignItems="flex-start"
                    >
                        <Grid
                            container
                            item
                            spacing={3}
                            xs={5}
                            m={2}
                        >
                            <Grid item xs={12}><Typography variant="h2">My Image Portal</Typography></Grid>
                            <Grid item xs={12}><Divider  sx={{borderColor: 'white'}}/></Grid>
                            <Grid item xs={12}><Typography variant="h4">Access your studies</Typography></Grid>
                            <Grid item xs={12}><Typography variant="body2">Welcome to the Perennity Radiology Portal. This portal access is only available for authorized users.</Typography></Grid>
                        </Grid>

                        <Grid item xs></Grid>

                        <Grid
                            container
                            item
                            xs={6}
                            sx={{height: '100%'}}
                            justifyContent="center"
                            alignItems="center">
                            <Grid item xs={8}>
                                <Paper elevation={10} style={paperStyle}>
                                    <Grid align='center'>
                                        <img src="/images/logo.svg" alt="Logo" style={{ width: "200px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
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

                                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Forgot Password</Button>

                                        <Grid
                                            container
                                            item
                                            xs
                                            justifyContent="center"
                                            alignItems="center">
                                            <Link href="/login">Back to Login</Link>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Background>
            </Container>
        </Grid>
    )

}