import React from 'react';
import { Divider, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import ForwardingLayout from '../layouts/forwarding';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../translations/i18n";

const Forwarding = () => {
    const { t } = useTranslation('common');

  /** THEME */
  const theme = useTheme();

  return (
    <React.Fragment>
        <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('titles.forwarding')} </Typography>
        <Divider style={{ marginBottom: theme.spacing(2) }} />

        <ForwardingLayout
          page="forwarding"
          autoRefresh={true}
        />

    </React.Fragment>
  )
}
export default Forwarding