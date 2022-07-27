import React, { useState } from 'react'
import { Container, Grid, Paper, TextField, Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import swal from 'sweetalert';
import sha512 from 'js-sha512';

/*import PryApi from '../services/PryApi';
const PryAPI = new PryApi();*/

import AuthService from "../services/api/auth.service";
import Footer from "../layouts/Footer";

export default function Signin() {

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

    const paperStyle = { padding: 20, width: '100%', margin: "auto" }
    const btnstyle = { margin: '8px 0' }

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const password_sha = sha512(password);

    const handleSubmit = async e => {
        e.preventDefault();

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

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >

            <Container maxWidth="xs">
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
                            onChange={e => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    </form>

                    {/*<Typography >*/}
                    {/*    <Link href="#" >*/}
                    {/*        Forgot password ?*/}
                    {/*    </Link>*/}
                    {/*</Typography>*/}
                    {/*<Typography > Do you have an account ?*/}
                    {/*    <Link href="#" >*/}
                    {/*        Sign Up*/}
                    {/*    </Link>*/}
                    {/*</Typography>*/}

                </Paper>
            </Container>
            <Footer />
        </Grid>
    )

}