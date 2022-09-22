import React from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import {useTheme} from '@emotion/react';
import Index from "../layouts/studies";
import SearchIcon from '@mui/icons-material/Search';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../translations/i18n";

export default function Studies() {
    const { t } = useTranslation('common');

    /** THEME */
    const theme = useTheme();

    return (
        <React.Fragment>
            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <SearchIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.studies')}
                </Grid>
            </Typography>

            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Index
                page="studies"
            />

        </React.Fragment>
    );
}