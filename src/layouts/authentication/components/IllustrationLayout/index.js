// prop-types is a library for typechecking of props
//import PropTypes from "prop-types";

// @mui material settingsActoins
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI settingsActoins
import React from "react";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import Footer from "../../../Footer";

function IllustrationLayout({bgImage, children}) {

    /** THEME AND CSS */
    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        root: {
            height: "100vh",
            /*backgroundColor:
                theme.palette.type === "light"
                    ? theme.palette.grey[50]
                    : theme.palette.grey[900],*/

            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        size: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
    }));

    const classes = useStyles(theme);

    return (
        <>
            <Grid
                container
                component="main"
                className={classes.root}
            >
                <Grid
                    className={classes.size}
                    item
                    xs={12}
                    sm={8}
                    md={10}
                    elevation={1}
                    //square
                    bgcolor='white'
                >
                    <Grid
                        container
                    >
                        {children}
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
}

export default IllustrationLayout;
