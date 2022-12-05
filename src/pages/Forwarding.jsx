import React from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import ForwardingLayout from '../layouts/forwarding';
import FastForwardIcon from '@mui/icons-material/FastForward';

/** Translation */
import { useTranslation } from 'react-i18next';

const Forwarding = () => {
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
            <i class="fi fi-rr-forward text-2xl"></i> <Box sx={{ m: 0.5 }} /> {t('titles.forwarding')}
            </Grid>
        </Typography>

        <Divider style={{ marginBottom: theme.spacing(2) }} />

        <ForwardingLayout
          page="forwarding"
          autoRefresh={true}
        />

    </React.Fragment>
  )
}
export default Forwarding