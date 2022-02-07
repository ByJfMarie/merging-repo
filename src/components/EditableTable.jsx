import React from "react";
// import ReactDOM from "react-dom";
import { makeStyles } from "@mui/styles";
import { Button, Menu, MenuItem } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import t from "../services/Translation";
import { useTheme } from '@emotion/react';
// Icons
import EditIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    selectTableCell: {
        width: 60,
        padding: "0px !important",
        height: "50px !important",
        backgroundColor: theme.palette.table.body + " !important",
    },
    tableCell: {
        padding: "0px !important",
        height: "50px !important",
        backgroundColor: theme.palette.table.body + " !important",
    },
    input: {
        width: 130,
        height: 40
    }
}));

const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

export default function EditabeTable(props) {
    const theme = useTheme();

    const [rows, setRows] = React.useState(props.rows)
    const [headers] = React.useState(props.headers)

    const [previous, setPrevious] = React.useState({});
    const classes = useStyles();

    const onToggleEditMode = id => {
        setRows(state => {
            return rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const onRevert = id => {
        const newRows = rows.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };

    /** BUTTON MENU */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableCell}></TableCell>
                        {headers.map((row) => (
                            <TableCell className={classes.tableCell}>{t(row)}</TableCell>
                        ))}

                        {(props.actions === true) && (
                            <TableCell className={classes.tableCell} style={{ width: '100px !important' }}></TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, k) => (
                        <TableRow key={row.id}>
                            <TableCell className={classes.selectTableCell}>
                                {row.isEditMode ? (
                                    <>
                                        <IconButton
                                            aria-label="done"
                                            onClick={() => onToggleEditMode(row.id)}
                                        >
                                            <DoneIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="revert"
                                            onClick={() => onRevert(row.id)}
                                        >
                                            <RevertIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => onToggleEditMode(row.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )}
                            </TableCell>

                            {console.log(row)}

                            { // eslint-disable-next-line
                                Object.entries(row).map(rowCell => {
                                if (rowCell[0] !== 'id' && rowCell[0] !== 'isEditMode') {
                                    console.log(rowCell[0])
                                    return <CustomTableCell {...{ row, name: rowCell[0], onChange }} />
                                }
                            })}

                            {(props.actions === true) && (
                                <TableCell style={{width: '100px'}} className={classes.tableCell}>
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
        </Paper>
    );
}