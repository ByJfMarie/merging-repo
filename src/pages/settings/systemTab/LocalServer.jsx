
import {
    Card,
    CardContent,
    TextField,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Container,
    Grid
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";
import * as React from "react";
import SettingsService from "../../../services/api/settings.service";

export default function LocalServer() {
    const theme = useTheme();
    const useStyles = makeStyles({
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

    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async() => {
        const response = await SettingsService.getLocalServer();

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        setSettingsValue(response.items);
    }

    React.useEffect(() => {
        refreshSettings();
    }, []);

    return (
        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <Container maxWidth="sm" style={{ marginLeft: "0px", marginBottom: '15px', paddingLeft : "0px" }}>
                    <Grid container direction="row-reverse" rowSpacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12} >
                            <TextField
                                className={classes.field} id="filled-basic"
                                label={t("aet")}
                                variant="standard"
                                value={settingsValue['DCMS.server_aet'] || ''}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                style={{ width: '100%' }}
                                id="filled-basic"
                                label={t("port")}
                                variant="standard"
                                value={settingsValue['DCMS.port_dicom'] || ''}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                style={{ width: '100%' }}
                                id="filled-basic"
                                label={t("latency")}
                                variant="standard"
                                value={settingsValue['DCMS.latency_time'] || ''}
                            />
                        </Grid>
                    </Grid>
                </Container>


                <FormGroup>
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2']==='true' || false}/>}
                        label={t("implicit_vr_endian")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.1']==='true' || false}/>}
                        label={t("explicit_vr_little_endian")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.2']==='true' || false}/>}
                        label={t("explicit_vr_big_endian")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.50']==='true' || false}/>}
                        label={t("jpeg_baseline_(process 1)")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.51']==='true' || false}/>}
                        label={t("jpeg_baseline_(process 2 & 4)")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.57']==='true' || false}/>}
                        label={t("jpeg_lossless, nonhierarchical_(processes 14)")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.70']==='true' || false}/>}
                        label={t("JPEG Lossless, Nonhierarchical, First- Order Prediction (Processes 14 [Selection Value 1])")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.80']==='true' || false}/>}
                        label={t("JPEG-LS_lossless_image_compression")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.81']==='true' || false}/>}
                        label={t("JPEG-LS_Lossy_(Near- Lossless)_image_compression")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.90']==='true' || false}/>}
                        label={t("JPEG_2000_image_compression_(Lossless Only)")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.91']==='true' || false}/>}
                        label={t("JPEG_2000_image_compression")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.92']==='true' || false}/>}
                        label={t("JPEG 2000 Part 2 Multicomponent Image Compression (Lossless Only)")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.93']==='true' || false}/>}
                        label={t("JPEG 2000 Part 2 Multicomponent Image Compression")}
                    />
                </FormGroup>

                <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }} />

                <FormGroup>
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.94']==='true' || false}/>}
                        label={t("JPIP Referenced")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.95']==='true' || false}/>}
                        label={t("JPIP Referenced Deflate")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.5']==='true' || false}/>}
                        label={t("RLE Lossless")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.6.1']==='true' || false}/>}
                        label={t("RFC 2557 MIME Encapsulation")}
                    />
                </FormGroup>

                <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }} />

                <FormGroup>
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.100']==='true' || false}/>}
                        label={t("MPEG2 Main Profile Main Level")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.102']==='true' || false}/>}
                        label={t("MPEG-4 AVC/H.264 High Profile / Level 4.1")}
                    />
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={<Checkbox checked={settingsValue['DCMS.1.2.840.10008.1.2.4.103']==='true' || false}/>}
                        label={t("MPEG-4 AVC/H.264 BD-compatible High Profile / Level 4.1")}
                    />
                </FormGroup>

            </CardContent>
        </Card>)
}