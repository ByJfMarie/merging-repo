import React from 'react';
import { Grid, Chip, MenuItem, Input, FormGroup, FormControlLabel, Checkbox, Container, Divider, Box, Select, InputLabel, FormControl, Dialog, DialogContent, DialogContentText, Button, DialogActions, DialogTitle, Card, CardContent, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import { TextField } from "@mui/material";
import t from "../../services/Translation";
import BlockIcon from '@mui/icons-material/Block';
import Popover from '@mui/material/Popover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from "moment";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import AuthService from "../../services/api/auth.service";

export default function TableRemoteStudiesFilter(props) {

    const priviledges = AuthService.getCurrentUser().priviledges;

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
    const useStyles = makeStyles({
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
    });
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    // eslint-disable-next-line
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /** MODALITY FIELD */
    const handleChangeModality = (event) => {
        const value = event.target.value;
        const filter = {...props.filters, modality: (typeof value === 'string') ? value.split(',') : value};
        props.setFilters(filter);
    };

    /** PRESET BUTTON FUNCTION */
    const handleChangeDate = (param) => {

        let items = {...props.filters, date_preset: param};

        switch (param) {
            case 0:
                items = {...items, from: calcDate(), to: calcDate()};
                break;
            case 3:
                items = {...items, from: calcDate(3), to: calcDate()};
                break;
            case '*':
                items = {...items, from: "", to: ""};
                break;
            default:
                items = {...items, from: calcDate(param), to: calcDate()};
        }
        props.setFilters(items);
    }

    /** RESET BUTTON */
    const clearValues = () => {
        props.setFilters(props.initialValues);
    }

    /** SEND VALUE */
    const handleSearch = (id, value) => {
        let filter = props.filters;

        if (id==='from' || id==='to') {
            filter = {...filter, date_preset: ""};
            if (value && !moment(value).isValid()) return;
        }
        filter = {...filter, [id]: value};
        props.setFilters(filter);
    }

    const statusComponent = (
        <FormControl className={classes.root} variant="standard" size="medium" >
            <InputLabel id="status" shrink>{t("status")}</InputLabel>
            <Select
                labelId="status"
                id="status"
                value={props.filters.status}
                onChange={(e) => { props.setFilters({ ...props.filters, status: e.target.value }) }}
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
                value={props.filters.modality}
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
        value={props.filters.birthdate}
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

                            {priviledges.settings[props.page].search.primary_fields.map((value, key) => {

                                if (value === "status") {
                                    return (
                                        <Grid key={value} item xs={6} sm>
                                            {statusComponent}
                                        </Grid>
                                    )
                                }

                                if (value === "modality") {
                                    return (<Grid key={value} item xs={6} sm>
                                        {modalityComponent}
                                    </Grid>)
                                }

                                if (value === "birthdate") {
                                    return (<Grid key={value} item xs={6} sm>
                                        {birthdateComponent}
                                    </Grid>)
                                }

                                return (<Grid key={value} item xs={6} sm>
                                    <TextField
                                        key={key}
                                        className={classes.root}
                                        id={value}
                                        label={t(value)}
                                        variant="standard"
                                        fullWidth
                                        value={props.filters[value]}
                                        onChange={(e) => handleSearch(value, e.target.value)}
                                    />
                                </Grid>)

                            })}
                        </Grid>

                        <Container maxWidth="sm" style={{ display: "flex", justifyContent: 'center' }}>

                            <ToggleButtonGroup
                                color="primary"
                                exclusive
                                value={props.filters.date_preset}
                            >
                                {priviledges.settings[props.page].search.date_presets.map((value, key) => {


                                    var label;
                                    switch (value) {
                                        case '*':
                                            label = t('all');
                                            break;
                                        case '0':
                                            label = t('today');
                                            break;
                                        case '1':
                                            label = t('yesterday');
                                            break;
                                        case '3':
                                            label = t('last_3days');
                                            break;
                                        case '7':
                                            label = t('last_week');
                                            break;
                                        case '30':
                                            label = t('last_month');
                                            break;
                                        case '365':
                                            label = t('last_year');
                                            break;
                                        default:
                                            label = t(value);

                                    }

                                    return (
                                        <ToggleButton
                                            key={key}
                                            style={{ border: '0px solid', borderRadius: '5px', textDecoration: 'underline', color: theme.palette.primary.main }}
                                            onClick={() => handleChangeDate(value)}
                                            value={value}
                                            className={key > 2 ? classes.presetPhone : ""}
                                        >
                                            {label}
                                        </ToggleButton>
                                    )
                                })}

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

                                {priviledges.settings[props.page].search.secondary_fields.length !== 0 ? (<>

                                    <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}>
                                        <Chip size="medium" label={t('moreFilters')} style={{ backgroundColor: theme.palette.chip.color }} />
                                    </Divider>

                                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>

                                        {priviledges.settings[props.page].search.secondary_fields.map((value, key) => {


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
                                                    value={props.filters[value]}
                                                    onChange={(e) => { handleSearch(value, e.target.value) }}
                                                />
                                            </Grid>)

                                        })}

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
                                                    value={props.filters.from || null}
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
                                                    value={props.filters.to || null}
                                                    onChange={(date) => {handleSearch("to", date);}}
                                                    renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} variant="standard" size="small" {...params} />}
                                                    dateAdapter={AdapterDateFns}
                                                />
                                            </Grid>
                                        </LocalizationProvider>

                                    </Grid>
                                    <Grid container style={{ display: "flex", marginTop: "15px" }} spacing={2}>
                                        <Grid item xs={12} sm={8} md={7} className={classes.delete}>
                                            {priviledges.settings[props.page].search.showDeleted && (<FormGroup>
                                                <FormControlLabel size="small"
                                                    control={
                                                        <Checkbox
                                                            id="showDeleted"
                                                            checked={props.filters.showDeleted} />
                                                    }
                                                    label={t('show_deleted')}
                                                    onChange={(e) => {handleSearch(e)}}
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
