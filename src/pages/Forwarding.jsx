import React from 'react';
import { Divider, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import t from "../services/Translation"; 
import TableForwardingStatus from '../components/forwarding/TableForwardingStatus'
import AuthService from "../services/api/auth.service";

const Forwarding = () => {
  /** THEME */
  const theme = useTheme();

  return (
    <React.Fragment>
        <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('forwarding')} </Typography>
        <Divider style={{ marginBottom: theme.spacing(2) }} />

        <TableForwardingStatus
          page="forwarding"
          autoRefresh={false}
        />

    </React.Fragment>
  )
}
export default Forwarding