import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import t from "../services/Translation";
import CustomTableRow from '../components/CustomTableRow';
import * as React from 'react';

export default function CustomTable(props) {

    /** THEME AND CSS */
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
        }
    });
    const classes = useStyles();

    /* USESTATE */
    const [selectedRows, setSelectedRows] = React.useState([])
    const [rows, setRows] = React.useState(props.rows)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectAll, setselectAll] = React.useState(false)

    /** HANDLE WHEN ALL (DE)SELECTED */
    const handleAllSelect = (e) => {
        setselectAll(e.target.checked)
        if (e.target.checked) {
            setSelectedRows(props.rows.map(row => row.id))
        } else {
            setSelectedRows([])
        }
    }

    /** HANDLE WHEN ONE IS (DE)SELECTED */
    const handleSelect = (id, add) => {
        setselectAll(false)
        if (add) {
            setSelectedRows(selectedRows.concat(id))
        } else {

            setSelectedRows(selectedRows.filter((value) => { return value !== id }))
        }
    }

    /** PAGINATION FUNCTIONS */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        setRows(props.rows.slice((page) * rowsPerPage, (page + 1) * rowsPerPage))
    }, [page, rowsPerPage])

    return (
        <TableContainer component={Paper} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(1), backgroundColor: theme.palette.table.head }}>

            <Table sx={{ minWidth: 650 }} aria-label="simple table" className={classes.root}>
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell width="2%" align="left" className={classes.tableCell} >
                            <Checkbox onChange={(e) => handleAllSelect(e)} checked={selectAll} />
                        </TableCell>
                        {props.settings[props.page].searchTable.columns.map((row) => (
                            <>
                                <TableCell style={row === "actions" ? {width: '100px', padding: 0} : {}} height="60px" align="left" className={classes.tableCell}> {row === "actions" ? "" : t(row)} </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        return (
                            <CustomTableRow
                                rows={row}
                                checked={selectedRows.includes(row.id) ? true : false}
                                onChange={handleSelect}
                                columns={props.settings[props.page].searchTable.columns}
                                actions={props.privileges.pages[props.page].searchTable.actionsRow}
                                handleOpenDialogStudy={props.handleOpenDialogStudy}
                                handleOpenDialoPermissions={props.handleOpenDialogPermissions}
                            />
                        )
                    })}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                style={{ backgroundColor: theme.palette.table.head }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={t('rowsPerPage') + ' :'}
            />

        </TableContainer>
    )
}