import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {
    Checkbox,
    Divider,
    Grid,
    List,
    ListItem, ListItemButton, ListItemIcon,
    ListItemText,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow
} from "@mui/material";
import CustomTable from "./CustomTable";
import AuthService from "../services/api/auth.service";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import t from "../services/Translation";
import CustomTableRow from "./CustomTableRow";
import SearchBar from "./SearchBar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

let rows = [
    { id: 1, checked: true, login: 'bruno.physician', first_name: 'Bruno', last_name: "volant", title: "Dr.", expiration_date:""},
    { id: 2, checked: false, login: 'rene.physician', first_name: 'Rene', last_name: "Cinderella", title: "Dr.", expiration_date:""},
]

export default function CustomDialogAddPermission({open, handleOpenDialog, handleCloseDialog, study}) {

    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            "& .MuiTableCell-head": {
                color: theme.palette.table.text,
                backgroundColor: theme.palette.table.head
            },
        },
        tableRow: {
            height: "60px !important"
        },
        tableCell: {
            padding: "0px 16px !important"
        },
        hover: {
            "&:hover": {
                transition: '0.3s',
                backgroundColor: theme.palette.table.hover + "! important"
            },
            height: "50px ! important",
            backgroundColor: theme.palette.table.body + "! important"
        },
    });
    const classes = useStyles();

    const priviledges = AuthService.getCurrentUser().priviledges;

    const [values, setValues] = React.useState(null);
    const [searched, setSearched] = React.useState("");

    const requestSearch = (searchedVal) => {
        const filteredItems = rows.filter((item) => {
            if (item.login.toLowerCase().includes(searchedVal.toLowerCase())) return true;
            if (item.first_name.toLowerCase().includes(searchedVal.toLowerCase())) return true;
            if (item.last_name.toLowerCase().includes(searchedVal.toLowerCase())) return true;
            return false;
        });
        setValues(filteredItems);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    React.useEffect(() => {
        setValues(rows)
    }, [study]);

    const handleToggle = (row) => () => {
        const newItems = values.map((item) => {
            if (item.id === row.id) {
                const updatedItem = {
                    ...item,
                    checked: !item.checked,
                };
                return updatedItem;
            }
            return item;
        });

        setValues(newItems);
    };

    return (
        <BootstrapDialog
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                Study Permissions
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {
                    values &&

                    <>
                        <SearchBar
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                            placeholder="filter"
                        />
                        <List sx={{width: '100%', marginTop: '10px', bgcolor: 'background.paper'}} className={classes.root}>
                            {values.map((row) => {
                                return (
                                    <>
                                        <ListItem
                                            key={row.id}
                                            backgroundcolor={theme.palette.mode === 'dark' ? '#1A2027' : '#fff'}
                                            /*secondaryAction={
                                                <IconButton edge="end" aria-label="comments">
                                                    <CommentIcon/>
                                                </IconButton>
                                            }*/
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(row)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={row.checked?'checked':''}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': row.id }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={row.id} primary={row.title+" "+row.last_name+" "+row.first_name} />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </>
                                );
                            })}
                        </List>
                    </>
                }

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseDialog}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}