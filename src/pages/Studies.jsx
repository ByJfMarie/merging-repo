import React from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import {useTheme} from '@emotion/react';
import Index from "../layouts/studies";
import SearchIcon from '@mui/icons-material/Search';

/** Translation */
import { useTranslation } from 'react-i18next';

const Studies = (props) => {
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
                <i class="fi fi-rr-book-alt text-2xl"></i> <Box sx={{ m: 0.5 }} /> {t('titles.studies')}
                </Grid>
            </Typography>

            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <Index
                page="studies"
                darkToggle={props.darkToggle}
            />

        </React.Fragment>
    );
}

export default Studies;