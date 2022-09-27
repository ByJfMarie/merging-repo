import {Alert, Box, IconButton, Paper, Snackbar} from "@mui/material";
import { useTheme } from '@emotion/react';
import * as React from 'react';
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {useState} from "react";
import ThumbnailCell from "./components/ThumbnailTableCell";
import ReportCell from "./components/ReportTableCell";
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableLocalStudiesFilter from "./TableLocalStudiesFilter";
import StudiesService from "../../services/api/studies.service";
import ForwardingService from "../../services/api/forwarding.service";
import ViewersService from "../../services/api/viewers.service";
import CustomDialogAddPermission from "./CustomDialogAddPermission";
import CustomDialogStudyInfo from "./CustomDialogStudyInfo";
import DialogSharing from './DialogSharing';
import TableLocalStudiesActions from "./TableLocalStudiesActions";
import DownloadStudies from "./DownloadStudies";
import UserContext from "../../components/UserContext";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";
import AlertDialog from "../../components/AlertDialog";
import TransferService from "../../services/api/transfer.service";

function StudiesLayout(props) {
    const { t } = useTranslation('common');

    /** User & privileges */
    const { privileges } = React.useContext(UserContext);

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
    const [isLoading, setLoading] = React.useState(false);
    const checkFilters = (filters) => {
        if (!filters) return false;

        if (filters.patient_id && filters.patient_id.length<3) {
            messageAlert('error', t("msg_error.patientID_too_short"))
            return false;
        }

        if (filters.patient_name && filters.patient_name.length<3) {
            messageAlert('error', t("msg_error.patientName_too_short"))
            return false;
        }

        if (filters.description && filters.description.length<3) {
            messageAlert('error', t("msg_error.studyDesc_too_short"))
            return false;
        }

        if (filters.accession_number && filters.accession_number.length<3) {
            messageAlert('error', t("msg_error.accession_too_short"))
            return false;
        }

        if (filters.referring_physician && filters.referring_physician.length<3) {
            messageAlert('error', t("msg_error.refPhys_too_short"))
            return false;
        }

        setMessage({...message, show: false})
        return true;
    }
    const searchStudies = async(values) => {
        setFilters(values);
        if (!checkFilters(values)) return;

        setLoading(true);
        const response = await StudiesService.searchStudies(values);
        if (response.items) setRows(response.items);
        setLoading(false);
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
    const handleViewStudy = (study, viewer_id) => {
        ViewersService.getURL(study.key, viewer_id).then((response) => {
                if (response.error) {
                    messageAlert('error', t("msg_error.open_viewer", {error: response.error}));
                    return;
                }

                //Open link in new tab
                window.open(response.items);
            }
        );
    }

    //Delete
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [dialogDeleteStudy, setDialogDeleteStudy] = useState(null);
    const handleCloseDeleteDialog = () => {
        setDialogDeleteOpen(false);
    }
    const handleDelete = (study) => {
        setDialogDeleteStudy(study);
        setDialogDeleteOpen(true);
    }
    const handleConfirmDeleteDialog = async (study) => {
        setDialogDeleteOpen(false);
        const response = await StudiesService.delete(study.st_uid);

        if (response.error) {
            messageAlert('error', t("msg_error.delete_study", {patient: study.p_name, description: study.st_description, error:response.error}));
            return;
        }

        messageAlert('info', t("msg_info.delete_study", {patient: study.p_name, description: study.st_description}));
    }

    //Selection
    const [selectedRows, setSelectedRows] = useState([])


    //Download
    const [downloadOpen, setDownloadOpen] = useState(false)
    const [downloadProgress, setDownloadProgress] = useState(0)
    const [downloadMessage, setDownloadMessage] = useState("")
    const downloadStudies = async(type) => {
        if (!selectedRows || selectedRows.length<=0) {
            messageAlert('error', t("msg_error.study_no_selection"));
            return;
        }

        //Init Download dialog
        setDownloadProgress(0);
        setDownloadMessage(t("msg_info.creating_zip"));
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
        setDownloadMessage(t("msg_info.downloading"));
        StudiesService
            .download(download_id,
            {
                responseType: 'blob',
                onDownloadProgress : progressEvent => {
                    const percentage = Math.round((progressEvent.loaded / progressEvent.total)*100);
                    setDownloadProgress(percentage);
                    if (percentage === 100) {
                        setDownloadMessage(t("msg_info.download_completed"));

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

        if (!selectedRows || selectedRows.length<=0) {
            messageAlert('error', t("msg_error.study_no_selection"));
            return;
        }

        const response = await ForwardingService.forward(aet, selectedRows);
        if (response.error) {
            messageAlert('error', t("msg_error.forward_error", {error: response.error}));
            return;
        }

        messageAlert("success", t("msg_info.forward_success"))

        setSelectedRows([]);
    };

    //Transfer
    const transferStudies = async(site) => {
        if (!selectedRows || selectedRows.length<=0) {
            messageAlert('error', t("msg_error.study_no_selection"));
            return;
        }

        const response = await TransferService.transfer(selectedRows, site);
        if (response.error) {
            messageAlert('error', t("msg_error.transfer_error", {error: response.error}));
            return;
        }

        messageAlert("success", t("msg_info.transfer_success"))

        setSelectedRows([]);
    };

    //Sharing
    const [sharingDialogOpen, setSharingDialogOpen] = useState(false);
    const sharingStudies  = async(studies, values) => {
        if (!studies || studies.length<=0) {
            messageAlert('error', t("msg_error.study_no_selection"));
            return;
        }

        const response = await StudiesService.share(studies, values.share_to, values.comments, values.valid_until);
        if (response.error) {
            messageAlert('error', t("msg_error.share_error", {error: response.error}));
            return;
        }

        messageAlert("success", t("msg_info.share_success"));
        setSelectedRows([]);
        setSharingDialogOpen(false);
    };

    //Media
    const mediaStudies = async() => {
        console.log("Media "+selectedRows);
    };

    //Columns Comparator


    //Create Columns
    const columns = [];
    if (privileges.tables[props.page].columns && privileges.tables[props.page].columns.length !== 0) {
        if (privileges.tables[props.page].columns.includes("patient_full")) {
            columns.push(
                {
                    field: "patient_full",
                    headerName: t("tables_header.patient"),
                    valueGetter: (params) => params.row.p_name,
                    flex: 2,
                    minWidth: 150,
                    maxWidth: 250,
                    //resizable: true,
                    encodeHtml: false,
                    renderCell: (params) => {
                        return <div
                            style={{lineHeight: "normal"}}>{params.row.p_name || ''}<br/>{params.row.p_id || ''}<br/>{params.row.p_birthdate_formatted || ''}
                        </div>
                    },
                }
            );
        }

        if (privileges.tables[props.page].columns.includes("study_full")) {
            columns.push(
                {
                    field: "study_full",
                    headerName: t('tables_header.study'),
                    valueGetter: (params) => params.row.st_date && new Date(params.row.st_date),
                    flex: 3,
                    minWidth: 350,
                    maxWidth: 450,
                    encodeHtml: false,
                    renderCell: (params) => {
                        return <div style={{
                            display: "flex",
                            alignItems: "center !important",
                            lineHeight: "normal",
                            maxHeight: "100%"
                        }}>
                            <ThumbnailCell
                                study={params.row}
                                size={50}
                            />
                            <Box style={{paddingLeft: '15px'}}>
                                {params.row.st_date_formatted + " - " + params.row.st_accession_number + " - " + params.row.st_modalities}<br/>
                                {params.row.st_description}<br/>
                                {params.row.nb_series + " serie(s) - " + params.row.nb_images + " image(s)"}
                            </Box>
                        </div>
                    }
                }
            )
        }

        if (privileges.tables[props.page].columns.includes("st_ref_physician")) {
            columns.push(
                {
                    flex: 1,
                    minWidth: 180,
                    field: 'st_ref_physician',
                    headerName: t('tables_header.referring_physician')
                }
            );
        }

        if (privileges.tables[props.page].columns.includes("report")) {
            columns.push(
                {
                    field: "report",
                    headerName: t('tables_header.report'),
                    flex: 1,
                    minWidth: 150,
                    maxWidth: 200,
                    encodeHtml: false,
                    renderCell: (params) => {
                        return (
                            <div style={{display: "flex", alignItems: "center !important", lineHeight: "normal"}}>
                                <ReportCell
                                    study={params.row}
                                />
                            </div>
                        )
                    },
                    sortable: false
                }
            );
        }

        if (privileges.tables[props.page].columns.includes("permissions")) {
            columns.push(
                {
                    field: "permissions",
                    headerName: t('tables_header.assignations'),
                    flex: 2,
                    minWidth: 150,
                    maxWidth: 200,
                    encodeHtml: false,
                    renderCell: (params) => {
                        return (
                            <div style={{display: "flex", alignItems: "center", lineHeight: "normal"}}>
                                {
                                    (params.row.nb_shares>0)
                                        ? <IconButton><PersonIcon fontSize="small"/></IconButton>
                                        : <IconButton><PersonOffIcon fontSize="small"/></IconButton>
                                }

                                {
                                    (params.row.nb_shares>0)?(params.row.nb_shares+" physician(s)"):"No physicians"
                                }
                            </div>
                        )
                    },
                    sortable: false
                }
            );
        }
    }

    if (privileges.tables[props.page].actions_rows.length !== 0) {
        columns.push(
            {
                field: 'actions',
                type: 'actions',
                minWidth: 80,
                getActions: (params) => {

                    let actions = [];

                    if (privileges.tables[props.page].actions_rows.includes('view')) {
                        privileges.viewers.map((key, index) => {
                            if (index === 0) {
                                actions.push(<GridActionsCellItem
                                    icon={<VisibilityIcon/>}
                                    label="View Study"
                                    onClick={() => handleViewStudy(params.row, key)}
                                />);
                            }

                            let viewer_name = "";
                            if (key === 'pry-plugin-meddream') viewer_name = "Meddream";
                            else if(key === 'pry') viewer_name = "Perennity";

                            actions.push(<GridActionsCellItem
                                icon={<VisibilityIcon/>}
                                label={"View Study ("+viewer_name+")"}
                                onClick={() => handleViewStudy(params.row, key)}
                                showInMenu
                            />);
                        })
                    }

                    if (privileges.tables[props.page].actions_rows.includes('info')) {
                        actions.push(<GridActionsCellItem
                            icon={<InfoIcon/>}
                            label="Study Info"
                            onClick={() => handleDialogStudyOpen(params.row)}
                            showInMenu
                        />);
                    }

                    if (privileges.tables[props.page].actions_rows.includes('login_sheet')) {
                        actions.push(<GridActionsCellItem
                            icon={<ContactPageIcon/>}
                            label="Login Sheet"
                            onClick={() => handleActionLoginSheet(params.row.key)}
                            showInMenu
                        />);
                    }

                    if (privileges.tables[props.page].actions_rows.includes('permissions')) {
                        actions.push(<GridActionsCellItem
                            icon={<LockIcon/>}
                            label="Set Permissions"
                            onClick={() => handleDialogPermissionsOpen(params.row.key)}
                            showInMenu
                        />);
                    }

                    if (privileges.tables[props.page].actions_rows.includes('delete')) {
                        actions.push(<GridActionsCellItem
                            icon={<DeleteForeverIcon/>}
                            label="Delete"
                            onClick={() => handleDelete(params.row)}
                            showInMenu
                        />);
                    }

                    return actions;
                }
            });
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

            <div component={Paper} style={{ display: 'flex', marginTop: theme.spacing(4), marginBottom: theme.spacing(1), backgroundColor: theme.palette.table.head }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        loading={isLoading}
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
                        disableColumnMenu={true}
                        getRowClassName={(params) => `storage-status-${params.row.storage_status}`}
                    />
                </div>
            </div>

            <TableLocalStudiesActions
                page="studies"
                downloadFunction={downloadStudies}
                forwardFunction={forwardStudies}
                transferFunction={transferStudies}
                sharingFunction={() => {setSharingDialogOpen(true);}}
                mediaFunction={mediaStudies}
                actionDisabled={selectedRows!=null?(selectedRows.length<=0):true}
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

            <DialogSharing
                open={sharingDialogOpen}
                studies={selectedRows}
                handleCloseDialog={() => {setSharingDialogOpen(false)}}
                handleShareDialog={sharingStudies}
            />

            <DownloadStudies
                isOpen={downloadOpen}
                progress={downloadProgress}
                message={downloadMessage}
            />

            <AlertDialog
                open={dialogDeleteOpen}
                title={t("confirm.delete_title")}
                text={t("confirm.delete_study")}
                data={dialogDeleteStudy}
                buttonCancel={t("buttons.cancel")}
                buttonConfirm={t("buttons.delete")}
                functionCancel={handleCloseDeleteDialog}
                functionConfirm={handleConfirmDeleteDialog}
            />
        </>
    )
}

export default StudiesLayout;
