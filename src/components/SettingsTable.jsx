import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, Button, MenuItem } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../services/Translation";

const SettingsTable = (props) => {
    /** THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        field: {
            width: '100%'
        },
        tableCell: {
            padding: "0px 16px !important",
            height: "50px !important",
            backgroundColor: theme.palette.table.body + " !important",
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

    /** ROWS AND HEADERS */
    const [rows] = React.useState(props.rows)
    const [headers] = React.useState(props.headers)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ backgroundColor: theme.palette.textfield.background, borderColor: theme.palette.table.line + " !important", }}>
                    <TableHead>
                        <TableRow classes={{ hover: classes.hover }}>
                            {headers.map((row) => (
                                <TableCell className={classes.tableCell}>{t(row)}</TableCell>
                            ))}

                            {(props.actions === true) && (
                                <TableCell className={classes.tableCell} style={{width: '100px' }}></TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, k) => (
                            <TableRow
                                hover
                                classes={{ hover: classes.hover }}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {Object.keys(row).map((rowCell) => (
                                    row[rowCell].map((key) => (
                                        <TableCell className={classes.tableCell}>{key}</TableCell>
                                    ))
                                ))}

                                {(props.actions === true) && (
                                    <TableCell className={classes.tableCell}>
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            style={{ color: theme.palette.text.primary }}
                                        >
                                            ...
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
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                                        </Menu>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
export default SettingsTable