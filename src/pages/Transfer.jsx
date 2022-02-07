import React from 'react';
import { Divider, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import t from "../services/Translation";
import CustomStatusTable from '../components/CustomStatusTable'
import AuthService from "../services/api/auth.service";

export default function Transfer() {
    /** THEME */
    const theme = useTheme();

    const priviledges = AuthService.getCurrentUser().priviledges;

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('transfer')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <CustomStatusTable {...priviledges} page="transfer" />
            
        </React.Fragment>
    );
}