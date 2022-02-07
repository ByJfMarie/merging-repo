import { Card, CardContent, Grid, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import SettingsTable from '../../../components/SettingsTable';
import t from "../../../services/Translation";

export default function Plugins() {
    const theme = useTheme();

    /** HEADERS AND ROWS FOR THE TABLE */
    const headers = ['name', 'version', 'type', 'vide'];
    const rows = [
        { "row": ["Meddream Viewer", "7.6.0", "DICOM Viewer", "..."] },
        { "row": ["Meddream Viewer", "7.8.1", "DICOM Viewer", "..."] },
    ]

    return (
        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin : '0px 0px' }}>
            <CardContent>
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item xs />

                    <Grid item >
                        <Button variant="contained" component="label">{t('force_refresh')}</Button>
                    </Grid>
                </Grid>
                <SettingsTable headers={headers} rows={rows} />
            </CardContent>
        </Card>)
}

