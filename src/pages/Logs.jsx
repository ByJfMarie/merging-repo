import {
    Button, Divider,
    Typography,
    MenuItem,Menu,Grid
} from "@mui/material"
import { useTheme } from '@emotion/react';
import * as React from "react";
import {makeStyles} from "@mui/styles";
import t from "../services/Translation";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TableLogs from "../components/logs/TableLogs";

/** RETURN TODAY'S DATE IN STRING (PARAM = REMOVE X DAY) */
function formatDate(remove = 0) {
    var today = new Date();
    var d = new Date();
    d.setDate(today.getDate() - remove);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const Logs = () => {
    /** THEME AND CSS */
    const Date = formatDate();
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
            "& .MuiTableCell-head": {
                color: theme.palette.table.text,
                backgroundColor: theme.palette.table.head
            },
            "& .MuiFilledInput-underline:after": {
                borderBottomColor: theme.palette.input.borderBottom
            },
            "& .MuiInputBase-root.Mui-focused": {
                boxShadow: '-1px 1px 5px 3px rgba(45, 180, 235,0.60)'
            }
        },
        hover: {
            "&:hover": {
                transition: '0.3s',
                backgroundColor: theme.palette.table.head + "! important"
            },
            backgroundColor: theme.palette.table.body + "! important"
        }
    });
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const typeButton = (
        <Grid item sm={4} xs={12} className={classes.left} style={{ display: "flex" }}>

            <Button variant="outlined" size="medium" className={classes.buttonMain} onClick={handleClick}>
                Type
                <ArrowDropDownIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>ALL</MenuItem>
                <MenuItem onClick={handleClose}>Media Burner</MenuItem>
                <MenuItem onClick={handleClose}>DICOM Server</MenuItem>
                <MenuItem onClick={handleClose}>Transfer</MenuItem>
                <MenuItem onClick={handleClose}>Autoloader</MenuItem>
            </Menu>
        </Grid>
    )

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('logs')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <TableLogs
                page="logs"
                autoRefresh={false}
            />

    
        </React.Fragment>
    )
}
export default Logs