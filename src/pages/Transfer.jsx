import React from 'react';
import {Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import { useTheme } from '@emotion/react';
import TransferStatusLayout from '../layouts/transfer';
import TransferService from "../services/api/transfer.service";
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

/** Translation */
import { useTranslation } from 'react-i18next';

export default function Transfer() {
    const { t } = useTranslation('common');

    /** THEME */
    const theme = useTheme();

    //Local Site
    const [localSite, setLocalSite] = React.useState("");

    //Remote Sites
    const [remoteSites, setRemoteSites] = React.useState([]);

    //Filters
    const [filters, setFilters] = React.useState({
        site_id: "all",
        direction: "all",
        status: "all",
        remote_status: "all"
    });
    const handleFiltersChange = (id, value) => {
        setFilters({...filters, [id]: value});
    }

    React.useEffect(() => {
        TransferService.getLocalSite().then((response) => {
                if (response.items) {
                    setLocalSite("("+response.items.alias+" - "+response.items.id+")")
                }
            }
        );

        TransferService.getRemoteSites().then((response) => {
            if (response.items) {
                const items = Object.keys(response.items).map((key, i) => ({
                    name: key,
                    label: response.items[key]
                }));
                setRemoteSites(items);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <Typography
                variant="h4"
                style={{textAlign: 'left', color: theme.palette.primary.main}}
            >
                <Grid container direction="row" alignItems="center">
                <i class="fi fi-rr-data-transfer text-2xl"></i> <Box sx={{ m: 0.5 }} /> {t('titles.transfer')+" "+localSite}
                </Grid>
            </Typography>

            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                <Grid item xs={3}>
                    <FormControl
                        //className={classes.root}
                        variant="standard"
                        fullWidth
                    >
                        <InputLabel id="site" >{t("filters.transfer_site")}</InputLabel>
                        <Select
                            labelId="site"
                            id="site"
                            value={filters.site_id}
                            onChange={(e) => {handleFiltersChange("site_id", e.target.value)}}
                        >
                            <MenuItem value="all">{t("filters.transfer_site_value.all")}</MenuItem>
                            {
                                remoteSites.map((option) => (
                                    <MenuItem value={option.name}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl
                        //className={classes.root}
                        variant="standard"
                        fullWidth
                    >
                        <InputLabel id="direction" >{t("filters.transfer_direction")}</InputLabel>
                        <Select
                            labelId="direction"
                            id="direction"
                            value={filters.direction}
                            onChange={(e) => {handleFiltersChange("direction", e.target.value)}}
                        >
                            <MenuItem value="all">{t("filters.transfer_direction_value.all")}</MenuItem>
                            <MenuItem value="0">{t("filters.transfer_direction_value.send")}</MenuItem>
                            <MenuItem value="1">{t("filters.transfer_direction_value.receive")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl
                        //className={classes.root}
                        variant="standard"
                        fullWidth
                    >
                        <InputLabel id="status" >{t("filters.transfer_status")}</InputLabel>
                        <Select
                            labelId="status"
                            id="status"
                            value={filters.status}
                            onChange={(e) => {handleFiltersChange("status", e.target.value)}}
                        >
                            <MenuItem value="all">{t("filters.transfer_status_value.all")}</MenuItem>
                            <MenuItem value="0">{t("filters.transfer_status_value.wait")}</MenuItem>
                            <MenuItem value="1">{t("filters.transfer_status_value.ready")}</MenuItem>
                            <MenuItem value="2">{t("filters.transfer_status_value.sending")}</MenuItem>
                            <MenuItem value="3">{t("filters.transfer_status_value.receiving")}</MenuItem>
                            <MenuItem value="4">{t("filters.transfer_status_value.done")}</MenuItem>
                            <MenuItem value="100">{t("filters.transfer_status_value.error")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl
                        //className={classes.root}
                        variant="standard"
                        fullWidth
                    >
                        <InputLabel id="remote_status" >{t("filters.transfer_remoteStatus")}</InputLabel>
                        <Select
                            labelId="remote_status"
                            id="remote_status"
                            value={filters.remote_status}
                            onChange={(e) => {handleFiltersChange("remote_status", e.target.value)}}
                        >
                            <MenuItem value="all">{t("filters.transfer_remoteStatus_value.all")}</MenuItem>
                            <MenuItem value="0">{t("filters.transfer_remoteStatus_value.wait")}</MenuItem>
                            <MenuItem value="1">{t("filters.transfer_remoteStatus_value.ready")}</MenuItem>
                            <MenuItem value="2">{t("filters.transfer_remoteStatus_value.sending")}</MenuItem>
                            <MenuItem value="3">{t("filters.transfer_remoteStatus_value.receiving")}</MenuItem>
                            <MenuItem value="4">{t("filters.transfer_remoteStatus_value.done")}</MenuItem>
                            <MenuItem value="100">{t("filters.transfer_remoteStatus_value.error")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <TransferStatusLayout
                page="transfer"
                autoRefresh={true}
                filters={filters}
            />
            
        </React.Fragment>
    );
}