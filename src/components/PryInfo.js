import { Cancel, Tag } from "@mui/icons-material";
import {Card, CardContent, FormControl, Stack, TextField, Typography} from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";

export default function PryInfo({text}) {

    /** THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%'
        },
        card: {
            "&.MuiCard-root": {
                padding: '0px !important'
            }
        },
        button: {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },

    });
    const classes = useStyles();

    return (
        <Card style={{ width: "100% !important", marginBottom: '20px' }} className={classes.card} >
            <CardContent style={{ display: "flex" }}>
                <InfoOutlinedIcon sx={{ color: theme.palette.textfield.text, marginRight: '15px' }} />
                <Typography style={{ color: theme.palette.textfield.text, textAlign: "left" }}>{text}</Typography>
            </CardContent>
        </Card>
    );
}