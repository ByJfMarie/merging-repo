import React from 'react';
import { Divider, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import CustomStatusTable from '../layouts/media';
import AuthService from "../services/api/auth.service";

/** Translation */
import { useTranslation } from 'react-i18next';

const Media = () => {
    const { t } = useTranslation('settings');

    /** THEME */
    const theme = useTheme();

    const priviledges = AuthService.getCurrentUser().priviledges;

    return (
        <React.Fragment>

            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('mediaOutput')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <CustomStatusTable {...priviledges} page="media"/>

        </React.Fragment>
    )
}
export default Media