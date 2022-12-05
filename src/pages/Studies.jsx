import React from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import {useTheme} from '@emotion/react';
import StudiesLayout from "../layouts/studies";
import SearchIcon from '@mui/icons-material/Search';

/** Translation */
import { useTranslation } from 'react-i18next';

export default function Studies() {
    const { t } = useTranslation('local_studies');

    /** THEME */
    const theme = useTheme();

    return (
        <React.Fragment>
            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <SearchIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('title')}
                </Grid>
            </Typography>

            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <StudiesLayout
                page="studies"
            />

        </React.Fragment>
    );
}