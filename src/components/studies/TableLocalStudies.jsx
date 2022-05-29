import {Box, IconButton, Paper, TableContainer,} from "@mui/material";
import { useTheme } from '@emotion/react';
import t from "../../services/Translation";
import * as React from 'react';
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {useState} from "react";
import Thumbnail from "./Thumbnail";
import ReportCell from "./ReportCell";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import UpdateIcon from "@mui/icons-material/Update";
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LockIcon from '@mui/icons-material/Lock';
import TableLocalStudiesFilter from "./TableLocalStudiesFilter";
import StudiesService from "../../services/api/studies.service";
import ForwardingService from "../../services/api/forwarding.service";
import CustomDialogAddPermission from "./CustomDialogAddPermission";
import AuthService from "../../services/api/auth.service";
import CustomDialogStudyInfo from "./CustomDialogStudyInfo";
import TableLocalStudiesActions from "../studies/TableLocalStudiesActions";

function TableLocalStudies(props) {

    const priviledges = AuthService.getCurrentUser().priviledges;

    const filtersInitValue = {
        patient_id: "",
        patient_name: "",
        study: "",
        accession_number: "",
        status: "",
        birthdate: "",
        aet: "",
        description: "",
        referring_physician: "",
        modality: [],
        showDeleted: false,
        date_preset: '*',
        from: "",
        to: "",
    };

    /** THEME AND CSS */
    const theme = useTheme();

    const [filters, setFilters] = useState(filtersInitValue);
    const [rows, setRows] = React.useState([]);

    const searchStudies = async(values) => {
        setFilters(values);

        const response = await StudiesService.searchStudies(values);

        if (response.error) {
            console.log(response.error);
            //window.location.href = "/login";
            return;
        }

        setRows(response.items)
    }


    // Manage Dialog Add Permission
    const [dialogPermissionsOpen, setDialogPermissionsOpen] = React.useState(false)
    const [dialogPermissions, setDialogPermissions] = useState(null);
    const handleDialogPermissionsOpen = (study) => {
        setDialogPermissionsOpen(true)
        setDialogPermissions(study)
    }
    const handleDialogPermissionsClose = () => {
        setDialogPermissionsOpen(false)
        setDialogPermissions(null)
        searchStudies(filters);
    }

    // Manage Dialog Study Info
    const [dialogStudyOpen, setDialogStudyOpen] = React.useState(false)
    const [dialogStudy, setDialogStudy] = useState(null);
    const handleDialogStudyOpen = (study) => {
        setDialogStudyOpen(true)
        setDialogStudy(study)
    }
    const handleDialogStudyClose = () => {
        setDialogStudyOpen(false)
        setDialogStudy(null)
    }

    //Login Sheet
    const handleActionLoginSheet = async (key) => {
        const rsp = await StudiesService.openLoginSheet(key);
        if (rsp && rsp.data && rsp.data.size) {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [rsp.data],
                {type: 'application/pdf'});

            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);

            //Open the URL on new Window
            window.open(fileURL);
        }
    };

    //Selection
    const [selectedRows, setSelectedRows] = useState([])

    //Download
    const downloadStudies = async(type) => {
        console.log("Download ("+type+") "+selectedRows);
    };

    //Forward
    const forwardStudies = async(aet) => {
        if (!aet) return;
        const response = await ForwardingService.forward(aet, selectedRows);
        if (response.error) {
            console.log(response.error);
            return;
        }

        setSelectedRows([]);
    };

    //Transfer
    const transferStudies = async(site) => {
        console.log("Transfer "+selectedRows+" to "+site);
    };

    //Media
    const mediaStudies = async() => {
        console.log("Media "+selectedRows);
    };

    //Create Columns
    const columns = [];
    priviledges.settings[props.page].searchTable.columns.map((row) => {

        if (row === 'patient') {
            columns.push({
                field: "patient_full",
                headerName: t(row),
                flex: 3,
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
                flex: 4,
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
                flex: 2,
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
                flex: 2,
                maxWidth: 100,
                encodeHtml: false,
                renderCell: (params) => {
                    return (
                       <div style={{display: "flex", alignItems: "center !important", lineHeight: "normal"}}>
                            {
                                (params.row.nb_shares>0)
                                    ? <IconButton><ShortcutIcon fontSize="small"/></IconButton>
                                    : <IconButton><UpdateIcon fontSize="small"/></IconButton>
                            }

                            {
                                (params.row.nb_shares>0)?(params.row.nb_shares+" share(s)"):"To be processed"
                            }
                        </div>
                    )
                }
            });
        }
        else if (row === 'accession_number') {
            columns.push(
                {
                    flex: 2,
                    field: 'st_accession_number',
                    headerName: t('accession_number'),
                }
            );
        }
        else if (row === 'modality') {
            columns.push(
                {
                    flex: 2,
                    field: 'st_modalities',
                    headerName: t('modality'),
                }
            );
        }
        else if (row === 'date') {
            columns.push(
                {
                    flex: 2,
                    field: 'st_date',
                    headerName: t('date')
                }
            );
        }
        else if (row === 'description') {
            columns.push(
                {
                    flex: 2,
                    field: 'st_description',
                    headerName: t('description'),
                }
            );
        }
        else if (row === 'referring_physician') {
            columns.push(
                {
                    flex: 2,
                    field: 'st_ref_physician',
                    headerName: t('referring_physician')
                }
            );
        }
        else if (row === 'noi') {
            columns.push(
                {
                    flex: 1,
                    field: 'noi',
                    headerName: t('noi'),
                    renderCell: (params) => {
                        return <div style={{ lineHeight: "normal" }}>{params.row.nb_series || ''} serie(s)<br/>{params.row.nb_images || ''} image(s)</div>;
                    }
                }
            );
        }

        return true;
    });

    if (priviledges.privileges.pages[props.page].searchTable.actionsRow.length !== 0) {
        columns.push(
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) =>
                    priviledges.privileges.pages[props.page].searchTable.actionsRow.map((action) => {

                        if (action ==='info') {
                            return <GridActionsCellItem
                                icon={<InfoIcon/>}
                                label="Study Info"
                                onClick={() => handleDialogStudyOpen(params.row)}
                                showInMenu
                            />
                        }
                        else if (action === 'login_sheet') {
                            return <GridActionsCellItem
                                icon={<ContactPageIcon/>}
                                label="Login Sheet"
                                onClick={() => handleActionLoginSheet(params.row.key)}
                                showInMenu
                            />
                        }
                        else if (action === 'permissions') {
                            return <GridActionsCellItem
                                icon={<LockIcon/>}
                                label="Set Permissions"
                                onClick={() => handleDialogPermissionsOpen(params.row.key)}
                                showInMenu
                            />
                        }

                        return <></>;
                    })
            }
        );
    }

    return (
        <>
            <TableLocalStudiesFilter
                initialValues={filtersInitValue}
                searchFunction={searchStudies}
                page="studies"
            />

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
                    selectionModel={selectedRows}
                    onSelectionModelChange={(ids) => {
                        setSelectedRows(ids);
                    }}
                />
            </TableContainer>

            <TableLocalStudiesActions
                page="studies"
                downloadFunction={downloadStudies}
                forwardFunction={forwardStudies}
                transferFunction={transferStudies}
                mediaFunction={mediaStudies}
            />

            <CustomDialogStudyInfo
                open={dialogStudyOpen}
                handleOpenDialog={handleDialogStudyOpen}
                handleCloseDialog={handleDialogStudyClose}
                study={dialogStudy}
            />

            <CustomDialogAddPermission
                open={dialogPermissionsOpen}
                handleOpenDialog={handleDialogPermissionsOpen}
                handleCloseDialog={handleDialogPermissionsClose}
                study={dialogPermissions}
            />
        </>
    )
}

export default TableLocalStudies;
