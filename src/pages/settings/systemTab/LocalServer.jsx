import {
    Card,
    CardContent,
    TextField,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Container,
    Grid, Button, Alert, Snackbar
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import t from "../../../services/Translation";
import * as React from "react";
import SettingsService from "../../../services/api/settings.service";
import ResetSave from "../../../components/settings/ResetSave";

export default function LocalServer() {
    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        },
        field: {
            width: '100%'
        },
        tableCell: {
            padding: "0px 16px !important",
            height: "50px !important",
            borderColor: theme.palette.textfield.border + " !important",
        },
        hover: {
            "&:hover": {
                transition: '0.3s',
                backgroundColor: theme.palette.table.hover + "! important"
            },
            height: "50px ! important",
            backgroundColor: theme.palette.textfield.background + "! important"
        },
        label: {
            fontSize: '14px !important',
        }

    });
    const classes = useStyles();

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    /** SETTINGS VALUES */
    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async () => {
        const response = await SettingsService.getLocalServer();

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items == null) return;
        setSettingsValue(response.items);
    }

    React.useEffect(() => {
        refreshSettings();
    }, []);

    const getSettingsValue = (id) => {
        if (!settingsValue[id]) return '';
        return settingsValue[id]['value'] || '';
    }
    const handleSettingsChange = (id, value) => {
        let cfg = settingsValue[id];
        if (!cfg) return;
        cfg['value'] = value;
        setSettingsValue({...settingsValue, [id]: cfg});
    }
    const handleSettingsTSChange = (id, value) => {
        let cfg = settingsValue['DCMS.accepted_ts'];
        if (!cfg) return;
        cfg['value'][id] = value;
        setSettingsValue({...settingsValue, ['DCMS.accepted_ts']: cfg});
    }

    const handleSave = async () => {
        const response = await SettingsService.saveLocalServer(settingsValue);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        refreshSettings();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Settings successfully saved!"
        });
    };

    const handleCancel = () => {
        refreshSettings();
    };

    return (
        <>
            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>
            <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <Container maxWidth="sm" style={{marginLeft: "0px", marginBottom: '15px', paddingLeft: "0px"}}>
                        <Grid container rowSpacing={2} style={{marginBottom: '15px'}}>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.field} id="filled-basic"
                                    label={t("aet")}
                                    variant="standard"
                                    value={settingsValue['DCMS.server_aet'] || ''}
                                    value={getSettingsValue('DCMS.server_aet')}
                                    onChange={(e) => {
                                        handleSettingsChange('DCMS.server_aet', e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    style={{width: '100%'}}
                                    id="filled-basic"
                                    label={t("port")}
                                    variant="standard"
                                    value={getSettingsValue('DCMS.port_dicom')}
                                    onChange={(e) => {
                                        handleSettingsChange('DCMS.port_dicom', e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    style={{width: '100%'}}
                                    id="filled-basic"
                                    label={t("latency")}
                                    variant="standard"
                                    value={getSettingsValue('DCMS.latency_time')}
                                    onChange={(e) => {
                                        handleSettingsChange('DCMS.latency_time', e.target.value)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Container>


                    <FormGroup>
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={
                                <Checkbox
                                    checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2'] : false}
                                    onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2', e.target.checked)}
                                />
                            }
                            label={t("implicit_vr_endian")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.1'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.1', e.target.checked)}
                            />}
                            label={t("explicit_vr_little_endian")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.2'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.2', e.target.checked)}
                            />}
                            label={t("explicit_vr_big_endian")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.50'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.50', e.target.checked)}
                            />}
                            label={t("jpeg_baseline_(process 1)")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.51'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.51', e.target.checked)}
                            />}
                            label={t("jpeg_baseline_(process 2 & 4)")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.57'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.57', e.target.checked)}
                            />}
                            label={t("jpeg_lossless, nonhierarchical_(processes 14)")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.70'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.70', e.target.checked)}
                            />}
                            label={t("JPEG Lossless, Nonhierarchical, First- Order Prediction (Processes 14 [Selection Value 1])")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.80'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.80', e.target.checked)}
                            />}
                            label={t("JPEG-LS_lossless_image_compression")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.81'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.81', e.target.checked)}
                            />}
                            label={t("JPEG-LS_Lossy_(Near- Lossless)_image_compression")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.90'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.90', e.target.checked)}
                            />}
                            label={t("JPEG_2000_image_compression_(Lossless Only)")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.91'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.91', e.target.checked)}
                            />}
                            label={t("JPEG_2000_image_compression")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.92'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.92', e.target.checked)}
                            />}
                            label={t("JPEG 2000 Part 2 Multicomponent Image Compression (Lossless Only)")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.93'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.93', e.target.checked)}
                            />}
                            label={t("JPEG 2000 Part 2 Multicomponent Image Compression")}
                        />
                    </FormGroup>

                    <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>

                    <FormGroup>
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.94'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.94', e.target.checked)}
                            />}
                            label={t("JPIP Referenced")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.95'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.95', e.target.checked)}
                            />}
                            label={t("JPIP Referenced Deflate")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.5'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.5', e.target.checked)}
                            />}
                            label={t("RLE Lossless")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.6.1'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.6.1', e.target.checked)}
                            />}
                            label={t("RFC 2557 MIME Encapsulation")}
                        />
                    </FormGroup>

                    <Divider style={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>

                    <FormGroup>
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.100'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.100', e.target.checked)}
                            />}
                            label={t("MPEG2 Main Profile Main Level")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.102'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.102', e.target.checked)}
                            />}
                            label={t("MPEG-4 AVC/H.264 High Profile / Level 4.1")}
                        />
                        <FormControlLabel
                            classes={{label: classes.label}}
                            control={<Checkbox
                                checked={getSettingsValue('DCMS.accepted_ts')?getSettingsValue('DCMS.accepted_ts')['1.2.840.10008.1.2.4.103'] : false}
                                onChange={(e) => handleSettingsTSChange('1.2.840.10008.1.2.4.103', e.target.checked)}
                            />}
                            label={t("MPEG-4 AVC/H.264 BD-compatible High Profile / Level 4.1")}
                        />
                    </FormGroup>
                    <ResetSave
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </CardContent>
            </Card>
        </>
    )
}