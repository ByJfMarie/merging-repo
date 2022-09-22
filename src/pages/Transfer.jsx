import React from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import TransferStatusLayout from '../layouts/transfer';
import TransferService from "../services/api/transfer.service";
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../translations/i18n";

export default function Transfer() {
    const { t } = useTranslation('common');

    /** THEME */
    const theme = useTheme();

    const [localSite, setLocalSite] = React.useState("");
    React.useEffect(() => {
        TransferService.getLocalSite().then((response) => {
                if (response.items) {
                    setLocalSite("("+response.items.alias+" - "+response.items.id+")")
                }
            }
        );
    }, []);

    return (
        <React.Fragment>
            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                    <ConnectingAirportsIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.transfer')+" "+localSite}
                </Grid>
            </Typography>

            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <TransferStatusLayout
                page="transfer"
                autoRefresh={true}
            />
            
        </React.Fragment>
    );
}