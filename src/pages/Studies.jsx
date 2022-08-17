import React, {useState} from 'react';
import {Divider, Typography} from "@mui/material";
import {useTheme} from '@emotion/react';
import t from "../services/Translation";
import Index from "../layouts/studies";

export default function Studies() {

    /** THEME */
    const theme = useTheme();

    return (
        <React.Fragment>
            <Typography variant="h4"
                        style={{textAlign: 'left', color: theme.palette.primary.main}}> {t('studies')} </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Index
                page="studies"
            />

        </React.Fragment>
    );
}