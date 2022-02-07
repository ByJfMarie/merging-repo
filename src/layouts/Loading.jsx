import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

export default function Loading(props) {
  /** STYLE */
  const useStyles = makeStyles({
        root: {
            background: props.theme.palette.background.default,
            minWidth: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        card: {
            alignItems: "center",
            justifyContent: "center"
        }
    });

    const classes = useStyles();

    return (
      <Grid
        className={classes.root}
        alignItems="center"
        justify="center"
      >
        <Grid className={classes.card}>
            <CircularProgress size = {100}/>
        </Grid>
      </Grid>
    )
}