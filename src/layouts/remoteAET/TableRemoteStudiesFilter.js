import React, {useEffect} from 'react';
import {
    Grid,
    Chip,
    MenuItem,
    Input,
    Container,
    Divider,
    Box,
    Select,
    InputLabel,
    FormControl,
    Dialog,
    DialogContent,
    DialogContentText,
    Button,
    DialogActions,
    DialogTitle,
    Card,
    CardContent,
    ToggleButtonGroup,
    ToggleButton,
    Badge, Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import { TextField, Paper, Fade, Popper } from "@mui/material";
import PopupState, {bindPopper, bindToggle} from 'material-ui-popup-state'
import BlockIcon from '@mui/icons-material/Block';
import Popover from '@mui/material/Popover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import moment from "moment";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import UserContext from "../../components/UserContext";
import styled from "styled-components";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

/** Translation */
import { useTranslation } from 'react-i18next';


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
        backgroundColor: theme.palette.chip.color + "!important",
        margin: '10px !important'
    },

    buttonQuery: {
        margin: '10px !important'
    },

    presetPhone: {
        [theme.breakpoints.down('sm')]: {
            display: "none !important",
        }
    }
}));

const BadgeMore = styled(Badge)`
          .MuiBadge-badge {
                right: -10px;
                top: -3px;
          }
    `;

export default function TableRemoteStudiesFilter(props) {
    const { t } = useTranslation('common');

    /** User & privileges */
    const { settings } = React.useContext(UserContext);

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
    const names = ['CR', 'CT', 'DX', 'ECG', 'ES', 'MG', 'MR', 'NM', 'PT', 'PX', 'RF', 'US', 'XA'];

    /** POP UP MORE FILTERS */
    const [anchorElMore, setAnchorElMore] = React.useState(null);

    const handleClickQuery = (event) => {
        event.preventDefault();
        props.searchFunction(values);
    };

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
        handleChangeDate(values.date_preset, false);
    }, []);

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
    const handleChangeDate = (param, refresh) => {

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
        if (refresh) props.searchFunction(items);
    }

    /** RESET BUTTON */
    const clearValues = () => {
        setValues(props.initialValues);
        setActiveSecondaryFilters([]);
        //props.searchFunction(props.initialValues);
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
        //props.searchFunction(filter);
    }

    const modalityComponent = (primary) => (
        <FormControl className={classes.root} size="small" fullWidth={true} >
            <InputLabel variant="standard" id="modality">{t("filters.modality")}</InputLabel>
            <Select
                labelId="modality"
                id="modality"
                multiple
                value={values.modality}
                onChange={(e) => {
                    handleChangeModality(e);
                    if (!primary) handleSecondaryFilters("modality", e.target.value);
                }}
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

    const birthdateComponent = (primary) => (
        settings &&
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                id="birthdate"
                label={t('filters.birthdate')}
                inputFormat={settings.date_format}
                value={values.birthdate || null}
                onChange={(date, keyboardInputValue) => {
                    if (keyboardInputValue && keyboardInputValue.length > 0 && keyboardInputValue.length < 10) return;
                    handleSearch("birthdate", date);
                    if (!primary) handleSecondaryFilters("birthdate", date);
                }}
                renderInput={(params) => <TextField InputLabelProps={{shrink: true}} variant="standard"
                                                    size="small" {...params} />}
                dateAdapter={AdapterDateFns}
            />
        </LocalizationProvider>
    )

    /** RETURN DATE (PARAM = REMOVE x DAYs) */
    const calcDate = (remove = 0) => {
        let today = new Date();
        let d = new Date();
        d.setDate(today.getDate() - remove);
        return d;
    }

    //Badge for filter
    const [activeSecondaryFilters, setActiveSecondaryFilters] = React.useState([]);
    const handleSecondaryFilters = (id, value) => {
        let tmp = activeSecondaryFilters;

        if (id==='from' || id==='to' || id==='birthdate') {
            if (value && moment(value).isValid()) {
                if (!tmp.includes(id)) tmp.push(id);
            }
            else tmp.splice(tmp.indexOf(id), 1);
        }
        else if (id==="showDeleted") {
            if (value) {
                if (!tmp.includes(id)) tmp.push(id);
            } else tmp.splice(tmp.indexOf(id), 1);
        }
        else {
            if (value && value.length > 0) {
                if (!tmp.includes(id)) tmp.push(id);
            } else tmp.splice(tmp.indexOf(id), 1);
        }

        console.log(tmp);
        setActiveSecondaryFilters(tmp);
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
                    {t('filters.termTooShort')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('filters.termMessage')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <form onSubmit={handleClickQuery}>

            <Card className='hidden laptop:block' style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                    <CardContent>
                        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

                            {
                                settings &&
                                settings.filters_aets_primary.map((value, key) => {

                                    if (value === "modality") {
                                        return (<Grid key={value} item xs={6} sm>
                                            {modalityComponent(true)}
                                        </Grid>)
                                    }

                                    if (value === "birthdate") {
                                        return (<Grid key={value} item xs={6} sm>
                                            {birthdateComponent(true)}
                                        </Grid>)
                                    }

                                    return (<Grid key={value} item xs={6} sm>
                                        <TextField
                                            key={key}
                                            className={classes.root}
                                            id={value}
                                            label={t("filters."+value)}
                                            variant="standard"
                                            fullWidth
                                            value={values[value] || ""}
                                            onChange={(e) => {
                                                handleSearch(value, e.target.value);
                                            }}
                                        />
                                    </Grid>)
                                })
                            }
                        </Grid>

                        <Container maxWidth="sm" style={{ display: "flex", justifyContent: 'center' }}>

                            <ToggleButtonGroup
                                size='small'
                                color="primary"
                                exclusive
                                value={values.date_preset}
                            >
                                {
                                    settings &&
                                    settings.filters_aets_date_presets.map((key, index) => {

                                        return (
                                            <ToggleButton
                                                key={key}
                                                style={{ border: '0px solid', borderRadius: '5px', textDecoration: 'underline', color: theme.palette.primary.main }}
                                                onClick={() => handleChangeDate(key, true)}
                                                value={key}
                                                className={key > 2 ? classes.presetPhone : ""}
                                            >
                                                {t("date_presets."+key)}
                                            </ToggleButton>
                                        )
                                    })
                                }

                            </ToggleButtonGroup>

                        </Container>

                        <Box sx={{ float: "inline-start", height: "42px", display: "flex", alignItems: 'flex-end', color: 'warning.main'}}>
                            <Typography variant="caption">
                                {t("msg_info.remote_use_wildcard")}
                            </Typography>
                        </Box>

                        <Button type="submit" size="small" variant="contained" color="primary" className={classes.buttonQuery} style={{ fontSize: '12px', width: '80px',float: 'inline-end' }}>
                            <SearchIcon style={{ transform: "scale(0.8)" }} />
                            {t('buttons.query')+"   "}
                        </Button>

                        <Button size="small" onClick={handleClickMore} variant="contained" className={classes.button} style={{ fontSize: '12px', width: '80px', float: 'inline-end' }}>
                            <MoreVertIcon style={{ transform: "scale(0.8)" }} />
                            <BadgeMore badgeContent={activeSecondaryFilters.length} color="primary">{t('filters.more')+"   "} </BadgeMore>
                        </Button>

                        <Button
                            size="small"
                            onClick={clearValues}
                            variant="contained"
                            className={classes.button}
                            style={{ fontSize: '12px', width: '80px', heigh: '50px',float: 'inline-end' }}
                        >
                            <BlockIcon style={{ transform: "scale(0.8)" }} />
                            {t('buttons.reset')}
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
                            <form>
                            <Container style={{ maxWidth: "500px" }}>
                                {
                                    settings &&
                                    settings.filters_studies_primary.length < fields.length ? (<>

                                    <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}>
                                        <Chip size="medium" label={t('filters.more')} style={{ backgroundColor: theme.palette.chip.color }} />
                                    </Divider>

                                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>

                                        {
                                            fields.map((value) => {
                                                if (settings.filters_aets_primary.includes(value)) return;

                                                if (value === "modality") {
                                                    return (
                                                        <Grid key={value} item xs={6} md={6}>
                                                            {modalityComponent(false)}
                                                        </Grid>)
                                                }

                                                if (value === "birthdate") {
                                                    return (
                                                        <Grid key={value} item xs={6} md={6}>
                                                            {birthdateComponent(false)}
                                                        </Grid>)
                                                }

                                                return (<Grid key={value} item xs={6} md={6} >
                                                    <TextField
                                                        className={classes.root}
                                                        id={value}
                                                        label={t("filters."+value)}
                                                        variant="standard"
                                                        fullWidth
                                                        value={values[value] || ""}
                                                        onChange={(e) => {
                                                            handleSearch(value, e.target.value);
                                                            handleSecondaryFilters(value, e.target.value);
                                                        }}
                                                    />
                                                </Grid>)

                                            })}

                                    </Grid>
                                </>) : ""}

                                <Container maxWidth="false" style={{ padding: '0 0 25px 0 ' }}>

                                    <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}>
                                        <Chip size="medium" label={t('filters.study_date')} style={{ backgroundColor: theme.palette.chip.color }} />
                                    </Divider>

                                    {
                                        settings &&
                                        <Grid container justifyContent="center" style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            direction: "column",
                                            alignItems: "center"
                                        }} spacing={2}>

                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Grid item xs={6} md={6}>
                                                    <DesktopDatePicker
                                                        id="from"
                                                        label={t('filters.from')}
                                                        inputFormat={settings.date_format}
                                                        value={values.from || null}
                                                        onChange={(date, keyboardInputValue) => {
                                                            if (keyboardInputValue && keyboardInputValue.length > 0 && keyboardInputValue.length < 10) return;
                                                            handleSearch("from", date);
                                                            handleSecondaryFilters("from", date);
                                                        }
                                                        }
                                                        renderInput={(params) => <TextField
                                                            InputLabelProps={{shrink: true}} variant="standard"
                                                            size="small" {...params} />}
                                                        dateAdapter={AdapterDateFns}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} md={6}>
                                                    <DesktopDatePicker
                                                        id="to"
                                                        label={t('filters.to')}
                                                        inputFormat={settings.date_format}
                                                        value={values.to || null}
                                                        onChange={(date, keyboardInputValue) => {
                                                            if (keyboardInputValue && keyboardInputValue.length > 0 && keyboardInputValue.length < 10) return;
                                                            handleSearch("to", date);
                                                            handleSecondaryFilters("to", date);
                                                        }}
                                                        renderInput={(params) => <TextField
                                                            InputLabelProps={{shrink: true}} variant="standard"
                                                            size="small" {...params} />}
                                                        dateAdapter={AdapterDateFns}
                                                    />
                                                </Grid>
                                            </LocalizationProvider>
                                        </Grid>
                                    }
                                </Container>
                            </Container>
                                <Button type="submit"/>
                            </form>
                        </Popover>
                    </CardContent>
                </Card>

 {/* -----------------------------------------------PHONE VERSION------------------------------------------------ */}

                <Card className='laptop:hidden' style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                    <CardContent>
                        <Grid container spacing={2} style={{ marginBottom: '15px', flexDirection:'column', width:'100%' }}>
                            {
                                settings &&
                                settings.filters_aets_primary.map((value, key) => {

                                    if (value === "modality") {
                                        return (<Grid key={value} item xs={6} sm>
                                            {modalityComponent(true)}
                                        </Grid>)
                                    }

                                    if (value === "birthdate") {
                                        return (<Grid key={value} item xs={6} sm>
                                            {birthdateComponent(true)}
                                        </Grid>)
                                    }

                                    return (
                                            <Grid key={value} item xs={15} sm>
                                                <TextField
                                                    key={key}
                                                    className={classes.root}
                                                    id={value}
                                                    label={t("filters."+value)}
                                                    variant="standard"
                                                    fullWidth
                                                    value={values[value] || ""}
                                                    onChange={(e) => {
                                                        handleSearch(value, e.target.value);
                                                        }
                                                    }
                                                />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>

                        <Container maxWidth="sm" style={{ display: "flex", justifyContent: 'center'}}>
                            <ToggleButtonGroup
                                style={{marginTop: '20px', height: '30px'}}
                                color="primary"
                                exclusive
                                value={values.date_preset}
                            >
                                {
                                    settings &&
                                    settings.filters_aets_date_presets.map((key, index) => {

                                        return (
                                            <ToggleButton
                                                size='small'
                                                key={key}
                                                style={{ border: '0px solid', borderRadius: '5px', textDecoration: 'underline', color: theme.palette.primary.main,  marginRight: '5px' }}
                                                onClick={() => handleChangeDate(key, true)}
                                                value={key}
                                                className={key > 2 ? classes.presetPhone : ""}
                                            >
                                                {t("date_presets."+key)}
                                            </ToggleButton>
                                        )
                                    })
                                }

                            </ToggleButtonGroup>
                        
                        </Container>

                        <Container maxWidth="sm"  style={{ display: "flex", justifyContent: 'center', marginTop: '10px'}}>
                                

                            {/* <Button size='small' sx={{ float: "inline-start", height: "42px", display: "flex", alignItems: 'flex-end', color: 'warning.main'}}>
                                <InfoTwoToneIcon style={{ transform: "scale(0.8)", color: 'blue' }}/>
                                <Typography variant="caption" style={{fontSize: '10px'}}>
                                    {t("msg_info.remote_use_wildcard")}
                                </Typography>
                            </Button> */}

                        <Button type="submit" size="small" variant="contained" color="primary" className={classes.buttonQuery} style={{ fontSize: '12px', width: '80px',float: 'inline-end' }}>
                            <SearchIcon style={{ transform: "scale(0.8)" }} />
                            {t('buttons.query')+"   "}
                        </Button>

                        <Button size="small" onClick={handleClickMore} variant="contained" className={classes.button} style={{ fontSize: '12px', width: '80px', float: 'inline-end' }}>
                            <MoreVertIcon style={{ transform: "scale(0.8)" }} />
                            <BadgeMore badgeContent={activeSecondaryFilters.length} color="primary">{t('filters.more')+"   "} </BadgeMore>
                        </Button>

                        <Button
                            size="small"
                            onClick={clearValues}
                            variant="contained"
                            className={classes.button}
                            style={{ fontSize: '12px', width: '80px', heigh: '50px',float: 'inline-end' }}
                        >
                            <BlockIcon style={{ transform: "scale(0.8)" }} />
                            {t('buttons.reset')}
                        </Button>
                        </Container>

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
                            <form>
                            <Container style={{ maxWidth: "500px" }}>
                                {
                                    settings &&
                                    settings.filters_studies_primary.length < fields.length ? (<>

                                    <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}>
                                        <Chip size="medium" label={t('filters.more')} style={{ backgroundColor: theme.palette.chip.color }} />
                                    </Divider>

                                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>

                                        {
                                            fields.map((value) => {
                                                if (settings.filters_aets_primary.includes(value)) return;

                                                if (value === "modality") {
                                                    return (
                                                        <Grid key={value} item xs={6} md={6}>
                                                            {modalityComponent(false)}
                                                        </Grid>)
                                                }

                                                if (value === "birthdate") {
                                                    return (
                                                        <Grid key={value} item xs={6} md={6}>
                                                            {birthdateComponent(false)}
                                                        </Grid>)
                                                }

                                                return (<Grid key={value} item xs={6} md={6} >
                                                    <TextField
                                                        className={classes.root}
                                                        id={value}
                                                        label={t("filters."+value)}
                                                        variant="standard"
                                                        fullWidth
                                                        value={values[value] || ""}
                                                        onChange={(e) => {
                                                            handleSearch(value, e.target.value);
                                                            handleSecondaryFilters(value, e.target.value);
                                                        }}
                                                    />
                                                </Grid>)

                                            })}

                                    </Grid>
                                </>) : ""}

                                <Container maxWidth="false" style={{ padding: '0 0 25px 0 ' }}>

                                    <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}>
                                        <Chip size="medium" label={t('filters.study_date')} style={{ backgroundColor: theme.palette.chip.color }} />
                                    </Divider>

                                    {
                                        settings &&
                                        <Grid container justifyContent="center" style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            direction: "column",
                                            alignItems: "center"
                                        }} spacing={2}>

                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Grid item xs={6} md={6}>
                                                    <DesktopDatePicker
                                                        id="from"
                                                        label={t('filters.from')}
                                                        inputFormat={settings.date_format}
                                                        value={values.from || null}
                                                        onChange={(date, keyboardInputValue) => {
                                                            if (keyboardInputValue && keyboardInputValue.length > 0 && keyboardInputValue.length < 10) return;
                                                            handleSearch("from", date);
                                                            handleSecondaryFilters("from", date);
                                                        }
                                                        }
                                                        renderInput={(params) => <TextField
                                                            InputLabelProps={{shrink: true}} variant="standard"
                                                            size="small" {...params} />}
                                                        dateAdapter={AdapterDateFns}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} md={6}>
                                                    <DesktopDatePicker
                                                        id="to"
                                                        label={t('filters.to')}
                                                        inputFormat={settings.date_format}
                                                        value={values.to || null}
                                                        onChange={(date, keyboardInputValue) => {
                                                            if (keyboardInputValue && keyboardInputValue.length > 0 && keyboardInputValue.length < 10) return;
                                                            handleSearch("to", date);
                                                            handleSecondaryFilters("to", date);
                                                        }}
                                                        renderInput={(params) => <TextField
                                                            InputLabelProps={{shrink: true}} variant="standard"
                                                            size="small" {...params} />}
                                                        dateAdapter={AdapterDateFns}
                                                    />
                                                </Grid>
                                            </LocalizationProvider>
                                        </Grid>
                                    }
                                </Container>
                            </Container>
                                <Button type="submit"/>
                            </form>
                        </Popover>
                    </CardContent>
                </Card>
{/* ----------------------------------------------------------------------------------  */}
            </form>
        </React.Fragment >)
}
