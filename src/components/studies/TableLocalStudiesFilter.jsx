import React, { useEffect } from 'react';
import { Grid, Chip, MenuItem, Input, FormGroup, FormControlLabel, Checkbox, Container, Divider, Box, Select, InputLabel, FormControl, Dialog, DialogContent, DialogContentText, Button, DialogActions, DialogTitle, Card, CardContent, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import { TextField } from "@mui/material";
import t from "../../services/Translation";
import BlockIcon from '@mui/icons-material/Block';
import Popover from '@mui/material/Popover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from "moment";
import UserStorage from "../../services/storage/user.storage";

const useStyles = makeStyles((theme) => ({
    root: {
        // "& .MuiFilledInput-underline:after": {
        //     borderBottomColor: theme.palette.input.borderBottom
        // },
        // "& .MuiInputBase-root.Mui-focused": {
        //     boxShadow: '0px 0px 5px 2px rgba(45, 180, 235,0.60)'
        // },
    },

    popover: {
        "& .MuiPopover-paper": {
            backgroundColor: theme.palette.card.color
        }
    },

    clear: {
        display: "flex",

        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
        },
        [theme.breakpoints.up('sm')]: {
            justifyContent: "flex-end"
        },
    },

    delete: {
        display: "flex",

        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
        }
    },

    button: {
        color: theme.palette.text.primary,
        float: 'right',
        backgroundColor: theme.palette.chip.color + "!important",
        margin: '10px !important'
    },

    presetPhone: {
        [theme.breakpoints.down('sm')]: {
            display: "none !important",
        }
    }
}));

export default function TableLocalStudiesFilter(props) {

    const fields = [
        "patient_id",
        "patient_name",
        "accession_number",
        "description",
        "referring_physician",
        "modality",
        "birthdate",
    ];

    /** MODALITY ELEMENTS */
    const names = [
        'CR',
        'MR',
        'PT',
        'CT',
        'MG',
        'US',
        'RF',
        'DX'
    ];

    const [settings, setSettings] = React.useState(null);
    const [showDeleted, setShowDeleted] = React.useState(true);

    /** POP UP MORE FILTERS */
    const [anchorElMore, setAnchorElMore] = React.useState(null);
    const handleClickMore = (event) => {
        setAnchorElMore(event.currentTarget);
    };
    const handleCloseMore = () => {
        setAnchorElMore(null);
    };
    const openMore = Boolean(anchorElMore);
    const id = openMore ? 'simple-popover' : undefined;

    /** THEME AND CSS */
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };

    const theme = useTheme();
    const classes = useStyles(theme);

    const [values, setValues] = React.useState(props.initialValues);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        UserStorage.getSettings()
            .then(settings => {
                setSettings(settings);
            });

        props.searchFunction(values);
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    /** MODALITY FIELD */
    const handleChangeModality = (event) => {
        const value = event.target.value;
        const filter = {...values, modality: (typeof value === 'string') ? value.split(',') : value};
        setValues(filter);
        props.searchFunction(filter);
    };

    /** PRESET BUTTON FUNCTION */
    const handleChangeDate = (param) => {

        let items = values;
        items = {...items, date_preset: param};

        switch (param) {
            case 'today':
                items = {...items, from: calcDate(), to: calcDate()};
                break;
            case 'yesterday':
                items = {...items, from: calcDate(1), to: calcDate()};
                break;
            case 'last_3days':
                items = {...items, from: calcDate(3), to: calcDate()};
                break;
            case 'last_week':
                items = {...items, from: calcDate(7), to: calcDate()};
                break;
            case 'last_month':
                items = {...items, from: calcDate(30), to: calcDate()};
                break;
            case 'last_year':
                items = {...items, from: calcDate(365), to: calcDate()};
                break;
            case 'all':
                items = {...items, from: "", to: ""};
                break;
            default:
                items = {...items, from: calcDate(param), to: calcDate()};
        }

        setValues(items);
        props.searchFunction(items);
    }

    /** RESET BUTTON */
    const clearValues = () => {
        setValues(props.initialValues);
        props.searchFunction(props.initialValues);
    }

    /** SEND VALUE */
    const handleSearch = (id, value) => {
        let filter = values;

        if (id==='from' || id==='to') {
            filter = {...filter, date_preset: ""};
            if (value && !moment(value).isValid()) return;
        }
        filter = {...filter, [id]: value};

        setValues(filter);
        props.searchFunction(filter);
    }

    const statusComponent = (
        <FormControl className={classes.root} variant="standard" size="medium" >
            <InputLabel id="status" shrink>{t("status")}</InputLabel>
            <Select
                labelId="status"
                id="status"
                value={values.status}
                onChange={(e) => { setValues({ ...values, status: e.target.value }) }}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={10}>In Progress</MenuItem>
                <MenuItem value={20}>Download Locally</MenuItem>
                <MenuItem value={30}>Download Remotely</MenuItem>
                <MenuItem value={30}>Error</MenuItem>
            </Select>
        </FormControl>)

    const modalityComponent = (
        <FormControl className={classes.root} size="small" fullWidth={true} >
            <InputLabel variant="standard" id="modality">{t("modality")}</InputLabel>
            <Select
                labelId="modality"
                id="modality"
                multiple
                value={values.modality}
                onChange={handleChangeModality}
                input={<Input id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )

    const birthdateComponent = (<TextField
        className={classes.root}
        type="date"
        id="birthdate"
        label={t('birthdate')}
        variant="standard"
        size="normal"
        fullWidth
        value={values.birthdate}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => { handleSearch("birthdate", e.target.value) }}
    />)

    /** RETURN DATE (PARAM = REMOVE x DAYs) */
    const calcDate = (remove = 0) => {
        let today = new Date();
        let d = new Date();
        d.setDate(today.getDate() - remove);
        return d;
    }


    // var moreFilters = ""
    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('termTooShort')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('termMessage')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <form>
                <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                    <CardContent>
                        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

                            {
                                settings &&
                                settings.filters_studies_primary.map((value, key) => {

                                    if (value === "status") {
                                        return (
                                            <Grid key={value} item xs={6} sm>
                                                {statusComponent}
                                            </Grid>
                                        )
                                    }

                                    if (value === "modality") {
                                        return (
                                            <Grid key={value} item xs={6} sm>
                                                {modalityComponent}
                                            </Grid>
                                        )
                                    }

                                    if (value === "birthdate") {
                                        return (
                                            <Grid key={value} item xs={6} sm>
                                                {birthdateComponent}
                                            </Grid>
                                        )
                                    }

                                    return (
                                        <Grid key={value} item xs={6} sm>
                                            <TextField
                                                key={value}
                                                className={classes.root}
                                                id={value}
                                                label={t(value)}
                                                variant="standard"
                                                fullWidth
                                                value={values[value] || ""}
                                                onChange={(e) => handleSearch(value, e.target.value)}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>

                        <Container maxWidth="sm" style={{ display: "flex", justifyContent: 'center' }}>

                            <ToggleButtonGroup
                                color="primary"
                                exclusive
                                value={values.date_preset}
                            >
                                {
                                    settings &&
                                    settings.filters_studies_date_presets.map((key, index) => {

                                        return (
                                            <ToggleButton
                                                key={key}
                                                style={{ border: '0px solid', borderRadius: '5px', textDecoration: 'underline', color: theme.palette.primary.main }}
                                                onClick={() => handleChangeDate(key)}
                                                value={key}
                                                className={key > 2 ? classes.presetPhone : ""}
                                            >
                                                {t(key)}
                                            </ToggleButton>
                                        )
                                    })

                                }

                            </ToggleButtonGroup>

                        </Container>

                        <Button size="small" onClick={handleClickMore} variant="contained" className={classes.button} style={{ fontSize: '12px', width: '80px' }}>
                            <MoreVertIcon style={{ transform: "scale(0.8)" }} /> {t('more')}
                        </Button>

                        <Button
                            size="small"
                            onClick={clearValues}
                            variant="contained"
                            className={classes.button}
                            style={{ fontSize: '12px', width: '80px', heigh: '50px' }}
                        >
                            <BlockIcon style={{ transform: "scale(0.8)" }} />
                            {t('reset')}
                        </Button>

                        <Popover
                            id={id}
                            open={openMore}
                            anchorEl={anchorElMore}
                            onClose={handleCloseMore}
                            anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'bottom'
                            }}
                            className={classes.popover}
                        >
                            <Container style={{ maxWidth: "500px" }}>

                                {
                                    settings &&
                                    settings.filters_studies_primary.length < fields.length ? (<>

                                    <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}>
                                        <Chip size="medium" label={t('moreFilters')} style={{ backgroundColor: theme.palette.chip.color }} />
                                    </Divider>

                                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>

                                        {
                                            fields.map((value) => {
                                                if (settings.filters_studies_primary.includes(value)) return;

                                                if (value === "status") {
                                                    return (
                                                        <Grid key={value} item xs={6} md={6}>
                                                            {statusComponent}
                                                        </Grid>
                                                    )
                                                }

                                                if (value === "modality") {
                                                    return (
                                                        <Grid key={value} item xs={6} md={6}>
                                                            {modalityComponent}
                                                        </Grid>)
                                                }

                                                if (value === "birthdate") {
                                                    return (
                                                        <Grid key={value} item xs={6} md={6}>
                                                            {birthdateComponent}
                                                        </Grid>)
                                                }

                                                return (<Grid key={value} item xs={6} md={6} >
                                                    <TextField
                                                        className={classes.root}
                                                        id={value}
                                                        label={t(value)}
                                                        variant="standard"
                                                        fullWidth
                                                        value={values[value]}
                                                        onChange={(e) => { handleSearch(value, e.target.value) }}
                                                    />
                                                </Grid>)
                                            })
                                        }

                                    </Grid>
                                </>) : ""}

                                <Container maxWidth="false" style={{ padding: '0 0 25px 0 ' }}>

                                    <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}>
                                        <Chip size="medium" label={t('date')} style={{ backgroundColor: theme.palette.chip.color }} />
                                    </Divider>

                                    <Grid container justifyContent="center" style={{ display: "flex", justifyContent: "center", direction: "column", alignItems: "center" }} spacing={2}>

                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Grid item xs={6} md={6}>
                                                    <DesktopDatePicker
                                                        id="from"
                                                        label={t('from')}
                                                        //inputFormat="yyyy.MM.dd"
                                                        value={values.from || null}
                                                        onChange={(date, keyboardInputValue) => {
                                                            if (keyboardInputValue && keyboardInputValue.length>0 && keyboardInputValue.length<10) return;
                                                            handleSearch("from", date);}
                                                        }
                                                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} variant="standard" size="small" {...params} />}
                                                        dateAdapter={AdapterDateFns}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} md={6}>
                                                    <DesktopDatePicker
                                                        id="to"
                                                        label={t('to')}
                                                        //inputFormat="yyyy.MM.dd"
                                                        value={values.to || null}
                                                        onChange={(date) => {handleSearch("to", date);}}
                                                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} variant="standard" size="small" {...params} />}
                                                        dateAdapter={AdapterDateFns}
                                                    />
                                                </Grid>
                                            </LocalizationProvider>

                                    </Grid>
                                    <Grid container style={{ display: "flex", marginTop: "15px" }} spacing={2}>
                                        <Grid item xs={12} sm={8} md={7} className={classes.delete}>
                                            {showDeleted && (<FormGroup>
                                                <FormControlLabel size="small"
                                                    control={
                                                        <Checkbox
                                                            id="showDeleted"
                                                            checked={showDeleted} />
                                                    }
                                                    label={t('show_deleted')}
                                                    onChange={(e) => {handleSearch("showDeleted", !values.showDeleted)}}
                                                />
                                            </FormGroup>)}
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Container>
                        </Popover>

                    </CardContent>
                </Card>
            </form>
        </React.Fragment >)
}
