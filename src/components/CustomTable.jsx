import {
    Box,
    Checkbox, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import t from "../services/Translation";
import * as React from 'react';
import {DataGrid, GridActionsCellItem, GridSelectionModel} from "@mui/x-data-grid";
import styled from "styled-components/macro";
import {useState} from "react";
import Thumbnail from "./Thumbnail";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ReportCell from "./ReportCell";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import UpdateIcon from "@mui/icons-material/Update";
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LockIcon from '@mui/icons-material/Lock';

function CustomTable(props) {

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
    const [rows, setRows] = React.useState(props.rows)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


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
    }, [props.rows])

    React.useEffect(() => {
        setRows(props.rows.slice((page) * rowsPerPage, (page + 1) * rowsPerPage))
    }, [page, rowsPerPage])

    const [thumbnail, setThumbnail] = useState({})

    //Create Columns
    const columns = [];
    props.settings[props.page].searchTable.columns.map((row) => {

        if (row === 'patient') {
            columns.push({
                field: "patient_full",
                headerName: t(row),
                flex: 25,
                maxWidth: 250,
                //resizable: true,
                encodeHtml: false,
                renderCell: (params) => {
                    return <div
                        style={{lineHeight: "normal"}}>{params.row.p_name || ''} ({params.row.p_id || ''})<br/>{params.row.p_birthdate || ''}
                    </div>
                }
            });
        } else if (row === 'study') {
            columns.push({
                field: "study_full",
                headerName: t(row),
                flex: 25,
                maxWidth: 250,
                encodeHtml: false,
                renderCell: (params) => {
                    return <div style={{display: "flex", alignItems: "center !important", lineHeight: "normal"}}>
                        <Thumbnail
                            study_uid={params.row.st_uid}
                            size={50}
                        />
                        <Box style={{paddingLeft: '15px'}}>
                            {params.row.st_date+" - "+params.row.st_accession_number+" - "+params.row.st_modalities}<br/>
                            {params.row.st_description}<br/>
                            {params.row.nb_series+" serie(s) - "+params.row.nb_images+" image(s)"}
                        </Box>
                    </div>
                }
            });
        }
        else if (row === 'report') {
            columns.push({
                field: "report",
                headerName: t(row),
                flex: 15,
                maxWidth: 150,
                encodeHtml: false,
                renderCell: (params) => {
                    return (
                        <div style={{display: "flex", alignItems: "center !important", lineHeight: "normal"}}>
                            <ReportCell
                                study_uid={params.row.st_uid}
                            />
                        </div>
                    )
                }
            });
        }
        else if (row === 'permissions') {
            columns.push({
                field: "permissions",
                headerName: t(row),
                flex: 10,
                maxWidth: 100,
                encodeHtml: false,
                renderCell: (params) => {
                    return (
                        <div style={{display: "flex", alignItems: "center !important", lineHeight: "normal"}}>
                            {
                                (props.rows['nb_shares']>0)
                                    ? <IconButton><ShortcutIcon fontSize="small"/></IconButton>
                                    : <IconButton><UpdateIcon fontSize="small"/></IconButton>
                            }

                            {
                                (props.rows['nb_shares']>0)?(props.rows['nb_shares']+" share(s)"):"To be processed"
                            }
                        </div>
                    )
                }
            });
        }
        else if (row === 'accession_number') {
            columns.push(
                {
                    flex: 5,
                    field: 'st_accession_number',
                    headerName: t('accession_number'),
                }
            );
        }
        else if (row === 'modality') {
            columns.push(
                {
                    flex: 5,
                    field: 'st_modalities',
                    headerName: t('modality'),
                }
            );
        }
        else if (row === 'date') {
            columns.push(
                {
                    flex: 5,
                    field: 'st_date',
                    headerName: t('date')
                }
            );
        }
        else if (row === 'description') {
            columns.push(
                {
                    flex: 10,
                    field: 'st_description',
                    headerName: t('description'),
                }
            );
        }
        else if (row === 'referring_physician') {
            columns.push(
                {
                    flex: 15,
                    field: 'st_ref_physician',
                    headerName: t('referring_physician')
                }
            );
        }
        else if (row === 'noi') {
            columns.push(
                {
                    flex: 10,
                    field: 'noi',
                    headerName: t('noi'),
                    renderCell: (params) => {
                        return <div style={{ lineHeight: "normal" }}>{params.row.nb_series || ''} serie(s)<br/>{params.row.nb_images || ''} image(s)</div>;
                    }
                }
            );
        }
    });

    if (props.privileges.pages[props.page].searchTable.actionsRow.length !== 0) {
        columns.push(
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) =>
                    props.privileges.pages[props.page].searchTable.actionsRow.map((action) => {

                        if (action ==='info') {
                            return <GridActionsCellItem
                                icon={<InfoIcon/>}
                                label="Study Info"
                                onClick={() => props.handleOpenDialogStudy(params.row)}
                                showInMenu
                            />
                        }
                        else if (action === 'login_sheet') {
                            return <GridActionsCellItem
                                icon={<ContactPageIcon/>}
                                label="Login Sheet"
                                onClick={() => props.handleLoginSheet(params.row.key)}
                                showInMenu
                            />
                        }
                        else if (action === 'permissions') {
                            return <GridActionsCellItem
                                icon={<LockIcon/>}
                                label="Set Permissions"
                                onClick={() => props.handleOpenDialogPermissions(params.row.key)}
                                showInMenu
                            />
                        }

                        return <></>;
                    })
            }
        );
    }

    return (
        <TableContainer component={Paper} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(1), backgroundColor: theme.palette.table.head }}>
            <DataGrid
                columns={columns}
                rows={rows}
                //loading={!rows.length}
                //error={error}
                rowHeight={60}
                pageSize={20}
                autoHeight={true}
                rowsPerPageOptions={[20]}
                getRowId={(row) => row.key}
                checkboxSelection
                selectionModel={props.selectedRows}
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = rows.filter((row) =>
                        selectedIDs.has(row.key.toString())
                    );
                    props.selectionHandler(ids, selectedRowData);

                }}
            />
        </TableContainer>

        /*&&

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
                    {
                        rows &&

                        rows.map((row) => {
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

        </TableContainer>*/
    )
}

export default CustomTable;
