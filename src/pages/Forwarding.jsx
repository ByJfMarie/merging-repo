import React from 'react';
import { Divider, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import t from "../services/Translation"; 
import ForwardingLayout from '../layouts/forwarding';

const Forwarding = () => {
  /** THEME */
  const theme = useTheme();

  return (
    <React.Fragment>
        <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('forwarding')} </Typography>
        <Divider style={{ marginBottom: theme.spacing(2) }} />

        <ForwardingLayout
          page="forwarding"
          autoRefresh={false}
        />

    </React.Fragment>
  )
}
export default Forwarding