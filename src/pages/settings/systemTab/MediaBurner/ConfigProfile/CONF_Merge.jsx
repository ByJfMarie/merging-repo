import React from 'react'
import { Typography, Box, Divider } from '@mui/material';

import { useTheme } from '@emotion/react';
import t from "../../../../../services/Translation";
import SettingsTable from '../../../../../components/SettingsTable';

export default function CONF_Merge() {
    const theme = useTheme();

    /** HEADERS AND ROW FOR THE PROFILES TABLE */
    const headers = ['name', 'value'];
    const rows = [
        { "row": ["", ""] },
        { "row": ["", ""] },
    ]

    return (
        <>
            <Box style={{ backgroundColor: theme.palette.dialog.color, width: "100% !important"}}>
                <Typography variant="h5" style={{ color: theme.palette.primary.main }} > {t('merge_fields')} </Typography>
                <Divider style={{ marginBottom: theme.spacing(2) }} />

                <SettingsTable headers={headers} rows={rows} actions/>
            </Box>

        </>
    )
}