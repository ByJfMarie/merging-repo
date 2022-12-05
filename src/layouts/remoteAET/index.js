import {Box, Paper} from "@mui/material";
import { useTheme } from '@emotion/react';
import * as React from 'react';
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LockIcon from '@mui/icons-material/Lock';
import TableRemoteStudiesFilter from "./TableRemoteStudiesFilter";
import TableRemoteStudiesActions from "./TableRemoteStudiesActions";
import {useState} from "react";
import QRService from "../../services/api/queryRetrieve.service";
import UserContext from "../../components/UserContext";
import {useSnackbar} from "notistack";

/** Translation */
import { useTranslation } from 'react-i18next';

function Index(props) {
    const { t } = useTranslation(['remote_servers', 'study_filter']);

    const { enqueueSnackbar } = useSnackbar();

    /** THEME AND CSS */
    const theme = useTheme();

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

    /* FILTERS */
    const [filters, setFilters] = useState(filtersInitValue);
    const [pageSize, setPageSize] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const checkFilters = (aet, filters) => {
        if (!filters) return false;

        if (filters.patient_id && filters.patient_id.length<3) {
            enqueueSnackbar(t("messages.patientID_too_short", {ns: 'study_filter'}), {variant: 'error'});
            return false;
        }

        if (filters.patient_name && filters.patient_name.length<3) {
            enqueueSnackbar(t("messages.patientName_too_short", {ns: 'study_filter'}), {variant: 'error'});
            return false;
        }

        if (filters.description && filters.description.length<3) {
            enqueueSnackbar(t("messages.studyDesc_too_short", {ns: 'study_filter'}), {variant: 'error'});
            return false;
        }

        if (filters.accession_number && filters.accession_number.length<3) {
            enqueueSnackbar(t("messages.accession_too_short", {ns: 'study_filter'}), {variant: 'error'});
            return false;
        }

        if (filters.referring_physician && filters.referring_physician.length<3) {
            enqueueSnackbar(t("messages.refPhys_too_short", {ns: 'study_filter'}), {variant: 'error'});
            return false;
        }

        //if Aet && all is empty => error
        if (aet) {
            let empty = true;
            if (filters.patient_id) empty = false;
            if (filters.patient_name) empty = false;
            if (filters.accession_number) empty = false;
            if (filters.birthdate) empty = false;
            if (filters.description) empty = false;
            if (filters.referring_physician) empty = false;
            if (filters.modality.length>0) empty = false;
            if (filters.from) empty = false;
            if (filters.to) empty = false;

            if(empty) {
                enqueueSnackbar(t("messages.query_no_criteria", {ns: 'study_filter'}), {variant: 'error'});
                return false;
            }
        }
        return true;
    }

    const queryStudies = async (filt) => {
        setFilters(filt);

        /** RESET RESULT */
        const rows = [];

        if (props.currentAET === '') {
            enqueueSnackbar(t("messages.query_no_aet", {ns: 'study_filter'}), {variant: 'error'});
            setRows(rows);
            return;
        }

        if (!checkFilters(props.currentAET, filt)) return;

        setLoading(true);
        const response = await QRService.query(props.currentAET, filt);
        if (response.items) setRows(response.items);
        setLoading(false);
    }

    const retrieveStudies = async (move_aet) => {
        if (props.currentAET === '') return;
        const response = await QRService.retrieve(props.currentAET, move_aet, selectedRowsData);
        if (response.error) {
            console.log(response.error);
            return;
        }

        setSelectedRows([]);
        setSelectedRowsData([]);
        props.actiontrigger();
    }

    //Selection
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowsData, setSelectedRowsData] = useState([]);

    //Create Columns
    const columns = [
        {
            field: "patient_full",
            headerName: t("table.header.patient"),
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
            }
        },
        {
            field: "study_full",
            headerName: t('table.header.study'),
            valueGetter: (params) => params.row.st_date,
            flex: 3,
            minWidth: 350,
            maxWidth: 800,
            encodeHtml: false,
            renderCell: (params) => {
                return <div style={{display: "flex", alignItems: "center !important", lineHeight: "normal"}}>
                    <Box>
                        {params.row.st_date+" - "+params.row.st_accession_number+" - "+params.row.st_modalities}<br/>
                        {params.row.st_description}<br/>
                        {params.row.nb_series+" serie(s) - "+params.row.nb_images+" image(s)"}
                    </Box>
                </div>
            }
        },
        {
            flex: 1,
            minWidth: 180,
            field: 'st_ref_physician',
            headerName: t('table.header.referring_physician')
        },
    ];




    /*priviledges.settings[props.page].searchTable.columns.map((row) => {

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
                        <Box style={{paddingLeft: '15px'}}>
                            {params.row.st_date+" - "+params.row.st_accession_number+" - "+params.row.st_modalities}<br/>
                            {params.row.st_description}<br/>
                            {params.row.nb_series+" serie(s) - "+params.row.nb_images+" image(s)"}
                        </Box>
                    </div>
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
        return true;
    });*/

    if (privileges.tables[props.page].actions_rows) {
        columns.push(
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) =>
                    privileges.tables[props.page].actions_rows.map((action) => {

                        if (action ==='info') {
                            return <GridActionsCellItem
                                icon={<InfoIcon/>}
                                label={t("buttons.study_info")}
                                onClick={() => props.handleOpenDialogStudy(params.row)}
                                showInMenu
                            />
                        }
                        else if (action === 'login_sheet') {
                            return <GridActionsCellItem
                                icon={<ContactPageIcon/>}
                                label={t("buttons.login_sheet")}
                                onClick={() => props.handleLoginSheet(params.row.key)}
                                showInMenu
                            />
                        }
                        else if (action === 'permissions') {
                            return <GridActionsCellItem
                                icon={<LockIcon/>}
                                label={t("buttons.set_permissions")}
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
        <>
            <TableRemoteStudiesFilter
                initialValues={filtersInitValue}
                searchFunction={queryStudies}
                page="aet"
            />

            <div component={Paper} style={{ display: 'flex', marginTop: theme.spacing(4), marginBottom: theme.spacing(1), backgroundColor: theme.palette.table.head }}>
                <div style={{ flexGrow: 1 }}>
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
                        disableSelectionOnClick
                        selectionModel={selectedRows}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = rows.filter((row) =>
                                selectedIDs.has(row.key.toString())
                            );
                            setSelectedRows(ids);
                            setSelectedRowsData(selectedRowData);
                        }}
                        loading={isLoading}
                        disableColumnMenu={true}
                    />
                </div>
            </div>

            <TableRemoteStudiesActions
                page={props.page}
                retrieveFunction={retrieveStudies}
                actionDisabled={selectedRows!=null?(selectedRows.length<=0):true}
            />
        </>
    )
}

export default Index;
