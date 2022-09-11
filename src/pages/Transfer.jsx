import React from 'react';
import { Divider, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import TransferStatusLayout from '../layouts/transfer';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../translations/i18n";

export default function Transfer() {
    const { t } = useTranslation('common');

    /** THEME */
    const theme = useTheme();

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('titles.transfer')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <TransferStatusLayout
                page="transfer"
            />
            
        </React.Fragment>
    );
}