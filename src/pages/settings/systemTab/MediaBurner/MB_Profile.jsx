import React from 'react'
import { TextField, Typography, FormControlLabel, FormControl, FormGroup, Checkbox, InputLabel, Select, MenuItem, Box, Divider, Link, Grid, Dialog, DialogActions, DialogContent, Slide, Button, } from '@mui/material';

import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../../services/Translation";

import ConfEncrypt from './ConfigProfile/CONF_Encrypt';
import ConFAnonym from './ConfigProfile/CONF_Anonym';
import ConFTag from './ConfigProfile/CONF_Tag';
import ConFMerge from './ConfigProfile/CONF_Merge';
import ViewLabel from './ConfigProfile/VIEW_Label';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MB_Profile() {
    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%'
        },
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },
        linkDisabled: {
            color: 'grey !important',
            textDecoration: 'none !important'
        }

    });
    const classes = useStyles();

    /** ADD/EDIT OUTPUT DEVICE */
    /** FIRST DIALOG POPUP */
    const [scroll] = React.useState('paper');

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    /** SECOND DIALOG POPUP */
    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    /** THIRD DIALOG POPUP */
    const [open3, setOpen3] = React.useState(false);

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    /** FOURTH DIALOG POPUP */
    const [open4, setOpen4] = React.useState(false);

    const handleClickOpen4 = () => {
        setOpen4(true);
    };

    const handleClose4 = () => {
        setOpen4(false);
    };

    /** FIFTH DIALOG POPUP */
    const [open5, setOpen5] = React.useState(false);

    const handleClickOpen5 = () => {
        setOpen5(true);
    };

    const handleClose5 = () => {
        setOpen5(false);
    };

    /** CHECKBOX */
    const [checkBoxEncrypt, setCheckBoxEncrypt] = React.useState(false);
    const [checkBoxAnonym, setCheckBoxAnonym] = React.useState(false);
    const [checkBoxTag, setCheckBoxTag] = React.useState(true);
    const [checkBoxMerge, setCheckBoxMerge] = React.useState(true);

    const handleChangeEncrypt = (event) => {
        setCheckBoxEncrypt(event.target.checked);
    };

    const handleChangeAnonym = (event) => {
        setCheckBoxAnonym(event.target.checked);
    };

    const handleChangeTag = (event) => {
        setCheckBoxTag(event.target.checked);
    };

    const handleChangeMerge = (event) => {
        setCheckBoxMerge(event.target.checked);
    };

    return (
        <>
            <Box style={{ backgroundColor: theme.palette.dialog.color, width: "100% !important" }}>
                <Typography variant="h5" style={{ color: theme.palette.primary.main }} > {t('general')} </Typography>
                <Divider style={{ marginBottom: theme.spacing(2) }} />

                <TextField style={{ width: '100%', marginBottom: '10px' }} id="filled-basic" label={t("name")} variant="standard" />
                <FormControl style={{ width: "100%", marginBottom: '10px' }} variant="standard">
                    <InputLabel id="print_selection">{t('group_by')}</InputLabel>
                    <Select
                        labelId="print_selection"
                        id="print_selection"
                        label="Print Selection"
                        variant='standard'
                    >
                        <MenuItem value={10}>Patient</MenuItem>
                        <MenuItem value={20}>Study</MenuItem>
                        <MenuItem value={30}>Serie</MenuItem>
                        <MenuItem value={0}>None</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ width: "45%", marginBottom: '10px', marginRight: '10%' }} variant="standard">
                    <InputLabel id="print_selection">{t('device')}</InputLabel>
                    <Select
                        labelId="print_selection"
                        id="print_selection"
                        label="Print Selection"
                        variant='standard'
                    >
                        <MenuItem value={10}>Virtual</MenuItem>
                        <MenuItem value={20}>?</MenuItem>
                        <MenuItem value={30}>?</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ width: "45%", marginBottom: '10px' }} variant="standard">
                    <InputLabel id="print_selection">{t('output_media')}</InputLabel>
                    <Select
                        labelId="print_selection"
                        id="print_selection"
                        label="Print Selection"
                        variant='standard'
                    >
                        <MenuItem value={10}>Autoselect</MenuItem>
                        <MenuItem value={20}>CD</MenuItem>
                        <MenuItem value={30}>?</MenuItem>
                    </Select>
                </FormControl>

                <TextField style={{ width: '100%', marginBottom: '10px' }} id="filled-basic" label={t("copies")} variant="standard" />

                <FormControl style={{ width: "100%", marginBottom: '10px' }} variant="standard">
                    <InputLabel id="print_selection">{t('priority')}</InputLabel>
                    <Select
                        labelId="print_selection"
                        id="print_selection"
                        label="Print Selection"
                        variant='standard'
                    >
                        <MenuItem value={10}>Normal</MenuItem>
                        <MenuItem value={20}>Low</MenuItem>
                        <MenuItem value={30}>High</MenuItem>
                    </Select>
                </FormControl>

                <FormControl style={{ width: "100%", marginBottom: '10px' }} variant="standard">
                    <InputLabel id="print_selection">{t('viewer')}</InputLabel>
                    <Select
                        labelId="print_selection"
                        id="print_selection"
                        label="Print Selection"
                        variant='standard'
                    >
                        <MenuItem value={10}>IQView</MenuItem>
                        <MenuItem value={20}>?</MenuItem>
                        <MenuItem value={30}>?</MenuItem>
                    </Select>
                </FormControl>

                <TextField style={{ width: '100%', marginBottom: '10px' }} id="filled-basic" label={t("volume_name")} variant="standard" />

                <TextField style={{ width: '100%', marginBottom: '10px' }} id="filled-basic" label={t("comment_1")} variant="standard" />

                <TextField style={{ width: '100%', marginBottom: '10px' }} id="filled-basic" label={t("comment_2")} variant="standard" />

                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item xs={4}>
                        <FormControl style={{ width: "100%", marginBottom: '10px' }} variant="standard">
                            <InputLabel id="print_selection">{t('label')}</InputLabel>
                            <Select
                                labelId="print_selection"
                                id="print_selection"
                                label="Print Selection"
                                variant='standard'
                            >
                                <MenuItem value={10}>Autoselect</MenuItem>
                                <MenuItem value={20}>?</MenuItem>
                                <MenuItem value={30}>?</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8} style={{marginTop: '20px'}}>
                        <Link style={{ marginLeft: "10px", }} onClick={handleClickOpen5}>View</Link>
                    </Grid>
                </Grid>

                <FormGroup style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <div>
                        <FormControlLabel classes={{ label: classes.label }} control={<Checkbox checked={checkBoxEncrypt} onChange={handleChangeEncrypt} />} label={t("encrypt_media")} /> <Link style={checkBoxEncrypt === false ? { marginLeft: "10px", color: 'grey', textDecoration: 'none' } : { marginLeft: "10px" }} onClick={checkBoxEncrypt === true ? handleClickOpen1 : ""}>Configure</Link>
                    </div>
                    <div>
                        <FormControlLabel classes={{ label: classes.label }} control={<Checkbox checked={checkBoxAnonym} onChange={handleChangeAnonym} />} label={t("anonymize_images")} /> <Link style={checkBoxAnonym === false ? { marginLeft: "10px", color: 'grey', textDecoration: 'none' } : { marginLeft: "10px" }} onClick={checkBoxAnonym === true ? handleClickOpen2 : ""}>Configure</Link>
                    </div>
                    <div>
                        <FormControlLabel classes={{ label: classes.label }} control={<Checkbox checked={checkBoxTag} onChange={handleChangeTag} />} label={t("tag_replacement")} /> <Link style={checkBoxTag === false ? { marginLeft: "10px", color: 'grey', textDecoration: 'none' } : { marginLeft: "10px" }} onClick={checkBoxTag === true ? handleClickOpen3 : ""}>Configure</Link>
                    </div>
                    <div>
                        <FormControlLabel classes={{ label: classes.label }} control={<Checkbox checked={checkBoxMerge} onChange={handleChangeMerge} />} label={t("merge_fields")} /> <Link style={checkBoxMerge === false ? { marginLeft: "10px", color: 'grey', textDecoration: 'none' } : { marginLeft: "10px" }} onClick={checkBoxTag === true ? handleClickOpen4 : ""} >Configure</Link>
                    </div>
                </FormGroup>

                <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("add_dicom")} />
                <FormControlLabel classes={{ label: classes.label }} style={{ marginRight: '20%' }} control={<Checkbox />} label={t("add_report")} />
                <FormControlLabel classes={{ label: classes.label }} control={<Checkbox />} label={t("add_thumbnails")} />
            </Box>

            {/* DIALOG 1  */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open1}
                onClose={handleClose1}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <ConfEncrypt />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>

                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose1}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

            {/* DIALOG 2  */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open2}
                onClose={handleClose2}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <ConFAnonym />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>
                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose2}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

            {/* DIALOG 3 */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open3}
                onClose={handleClose3}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <ConFTag />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>
                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose3}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

            {/* DIALOG 4 */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open4}
                onClose={handleClose4}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <ConFMerge />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>
                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose4}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

            {/* DIALOG 4 (VIEW)*/}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open5}
                onClose={handleClose5}
                scroll={scroll}
                TransitionComponent={Transition}
            >
                <DialogContent dividers={scroll === 'paper'} style={{ backgroundColor: theme.palette.dialog.color }}>
                    <ViewLabel />
                </DialogContent>
                <DialogActions style={{ backgroundColor: theme.palette.dialog.color }}>
                    <Grid container style={{ marginTop: "10px" }}>
                        <Grid item xs />

                        <Grid item >
                            <Button className={classes.button} variant="contained" component="label" onClick={handleClose5}>{t('cancel')}</Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" component="label">{t('save')}</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    )
}