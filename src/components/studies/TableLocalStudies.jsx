import {Alert, Box, IconButton, Paper, Snackbar, TableContainer,} from "@mui/material";
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableLocalStudiesFilter from "./TableLocalStudiesFilter";
import StudiesService from "../../services/api/studies.service";
import ForwardingService from "../../services/api/forwarding.service";
import ViewersService from "../../services/api/viewers.service";
import CustomDialogAddPermission from "./CustomDialogAddPermission";
import AuthService from "../../services/api/auth.service";
import CustomDialogStudyInfo from "./CustomDialogStudyInfo";
import TableLocalStudiesActions from "../studies/TableLocalStudiesActions";
import DownloadStudies from "./DownloadStudies";
import UserStorage from "../../services/storage/user.storage";

function TableLocalStudies(props) {

    const[privileges] = React.useState(UserStorage.getPrivileges());

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
        date_preset: 'all',
        from: "",
        to: "",
    };

    /** THEME AND CSS */
    const theme = useTheme();

    /** Timer */
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const [message, setMessage] = React.useState({
        show: false,
        severity: 'success',
        message: ''
    });
    const messageAlert = (severity, message) => {
        setMessage({
                ...message,
                show: true,
                severity: severity,
                message: message
            });
    }

    const [filters, setFilters] = useState(filtersInitValue);
    const [pageSize, setPageSize] = React.useState(20);
    const [rows, setRows] = React.useState([]);
    const checkFilters = (filters) => {
        if (!filters) return false;

        if (filters.patient_id && filters.patient_id.length<3) {
            messageAlert('error', 'Patient ID is too short (Min 3 characters allowed...)')
            return false;
        }

        if (filters.patient_name && filters.patient_name.length<3) {
            messageAlert('error', 'Patient Name is too short (Min 3 characters allowed...)')
            return false;
        }

        if (filters.description && filters.description.length<3) {
            messageAlert('error', 'Study Description is too short (Min 3 characters allowed...)')
            return false;
        }

        if (filters.accession_number && filters.accession_number.length<3) {
            messageAlert('error', 'Accession Number is too short (Min 3 characters allowed...)')
            return false;
        }

        if (filters.referring_physician && filters.referring_physician.length<3) {
            messageAlert('error', 'Referring Physician is too short (Min 3 characters allowed...)')
            return false;
        }

        setMessage({...message, show: false})
        return true;
    }
    const searchStudies = async(values) => {
        setFilters(values);
        if (!checkFilters(values)) return;

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

    //Viewer
    const handleViewStudy = async (study) => {
        const response = await ViewersService.getURL(study.key);

        if (response.error) {
            messageAlert('error', "Impossible to open viewer: "+response.error);
            return;
        }

        //Open link in new tab
        window.open(response.items);
    }

    //Selection
    const [selectedRows, setSelectedRows] = useState([])


    //Download
    const [downloadOpen, setDownloadOpen] = useState(false)
    const [downloadProgress, setDownloadProgress] = useState(0)
    const [downloadMessage, setDownloadMessage] = useState("")
    const downloadStudies = async(type) => {
        //Init Download dialog
        setDownloadProgress(0);
        setDownloadMessage("Creating ZIP File");
        setDownloadOpen(true);

        //Start Download
        let response = await StudiesService.prepareDownload(type, selectedRows);
        if (response.error) {
            console.log(response.error);
            return;
        }
        if (!response.items.id) return;

        //Waiting zip creation
        let download_id = response.items.id;
        let file_name = response.items.name;
        let finished = false;
        while (!finished) {
            response = await StudiesService.statusDownload(download_id);
            if (response.error) {
                console.log(response.error);
                return;
            }

            setDownloadProgress(response.items.percent);
            if (response.items.percent===100) {
                finished = true;
                continue;
            }
            await timeout(1000);
        }

        //Download
        setDownloadProgress(0);
        setDownloadMessage("Downloading file");
        StudiesService
            .download(download_id,
            {
                responseType: 'blob',
                onDownloadProgress : progressEvent => {
                    const percentage = Math.round((progressEvent.loaded / progressEvent.total)*100);
                    setDownloadProgress(percentage);
                    if (percentage === 100) {
                        setDownloadMessage("Download Completed");

                        setTimeout(() => {
                            setDownloadOpen(false);
                        }, 1000);
                    }
                }
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file_name+".zip");
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);

                setSelectedRows([]);

                setTimeout(() => {
                    setDownloadOpen(false);
                }, 1000);
            });
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
    const columns = [
        {
            field: "patient_full",
            headerName: t("patient"),
            flex: 3,
            maxWidth: 250,
            //resizable: true,
            encodeHtml: false,
            renderCell: (params) => {
                return <div
                    style={{lineHeight: "normal"}}>{params.row.p_name || ''} ({params.row.p_id || ''})<br/>{params.row.p_birthdate || ''}
                </div>
            }
        },
        {
            field: "study_full",
            headerName: t('study'),
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
        },
        {
            flex: 2,
            field: 'st_ref_physician',
            headerName: t('referring_physician')
        },
        {
            field: "report",
            headerName: t('report'),
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
        },
        {
            field: "permissions",
            headerName: t('permissions'),
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
        },
        /*{
            flex: 2,
            field: 'st_accession_number',
            headerName: t('accession_number'),
            hide: true
        },
        {
            flex: 2,
            field: 'st_modalities',
            headerName: t('modality'),
        },
        {
            flex: 2,
            field: 'st_date',
            headerName: t('date')
        },
        {
            flex: 2,
            field: 'st_description',
            headerName: t('description'),
        },
        {
            flex: 2,
            field: 'st_ref_physician',
            headerName: t('referring_physician')
        },
        {
            flex: 1,
            field: 'noi',
            headerName: t('noi'),
            renderCell: (params) => {
                return <div style={{ lineHeight: "normal" }}>{params.row.nb_series || ''} serie(s)<br/>{params.row.nb_images || ''} image(s)</div>;
            }
        }*/
    ];

    if (privileges.tables[props.page].actions_rows.length !== 0) {
        columns.push(
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) =>
                    privileges.tables[props.page].actions_rows.map((action) => {
                        if (action ==='view') {
                            return <GridActionsCellItem
                                icon={<VisibilityIcon/>}
                                label="View Study"
                                onClick={() => handleViewStudy(params.row)}
                            />
                        }
                        else if (action ==='info') {
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
            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>

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
                    autoHeight={true}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10,20,50]}
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

            <DownloadStudies
                isOpen={downloadOpen}
                progress={downloadProgress}
                message={downloadMessage}
            />
        </>
    )
}

export default TableLocalStudies;
