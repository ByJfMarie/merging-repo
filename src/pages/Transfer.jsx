import React from 'react';
import { Divider, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import t from "../services/Translation";
import TableTransferStatus from '../components/transfer/TableTransferStatus';
import AuthService from "../services/api/auth.service";

export default function Transfer() {
    /** THEME */
    const theme = useTheme();

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('transfer')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <TableTransferStatus
                page="transfer"
            />
            
        </React.Fragment>
    );
}