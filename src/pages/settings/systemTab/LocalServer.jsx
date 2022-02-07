
import { Card, CardContent, TextField, Divider, FormGroup, FormControlLabel, Checkbox, Container } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";

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

    return (
        <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
            <CardContent>
                <Container maxWidth="sm" style={{ marginLeft: "0px", marginBottom: '15px', paddingLeft : "0px" }}>
                    <TextField className={classes.field} id="filled-basic" label={t("aet")} variant="standard" />
                    <TextField style={{ width: '100%' }} id="filled-basic" label={t("port")} variant="standard" />
                    <TextField style={{ width: '100%' }} id="filled-basic" label={t("latency")} variant="standard" />
                </Container>


                <FormGroup>
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("implicit_vr_endian")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("explicit_vr_little_endian")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("explicit_vr_big_endian")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("jpeg_baseline_(process 1)")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("jpeg_baseline_(process 2 & 4)")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("jpeg_lossless, nonhierarchical_(processes 14)")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPEG Lossless, Nonhierarchical, First- Order Prediction (Processes 14 [Selection Value 1])")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPEG-LS_lossless_image_compression")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPEG-LS_Lossy_(Near- Lossless)_image_compression")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPEG_2000_image_compression_(Lossless Only)")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPEG_2000_image_compression")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPEG 2000 Part 2 Multicomponent Image Compression (Lossless Only)")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPEG 2000 Part 2 Multicomponent Image Compression")} />
                </FormGroup>

                <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }} />

                <FormGroup>
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPIP Referenced")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("JPIP Referenced Deflate")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("RLE Lossless")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("RFC 2557 MIME Encapsulation")} />
                </FormGroup>

                <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }} />

                <FormGroup>
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("MPEG2 Main Profile Main Level")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("MPEG-4 AVC/H.264 High Profile / Level 4.1")} />
                    <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("MPEG-4 AVC/H.264 BD-compatible High Profile / Level 4.1")} />
                </FormGroup>

            </CardContent>
        </Card>)
}