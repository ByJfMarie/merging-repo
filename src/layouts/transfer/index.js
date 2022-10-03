import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Box, Grid, Tooltip} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TransferService from "../../services/api/transfer.service";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";

/** STATUS CHIP (ERROR / SUCCESS) */

const TransferStatusLayout = (props) => {

    const { t } = useTranslation('common');
    //const { privileges } = React.useContext(UserContext);

    const LocalstatusComponent = (row) => {

        if (row.tr_direction!==0) return null;

        let statusIcon = "";
        switch (row.tr_status) {
            case 0: //Wait
            case 1: //Ready
                statusIcon = <PauseIcon color="warning" fontSize="small"/>;
            case 2: //Sending
            case 3: //Receiving
                statusIcon = <PlayArrowIcon color="primary" fontSize="small"/>;
                break;
            case 4: //Done
                statusIcon = <UploadIcon color="success" fontSize="small"/>;
                break;
            case 100: //Error
                statusIcon = <Tooltip title={row.tr_message}><ReportProblemIcon color="error" fontSize="small"/></Tooltip>;
                break;
        }

        let remoteStatusIcon = "";
        switch (row.tr_remote_status) {
            case 0: //Wait
            case 1: //Ready
                remoteStatusIcon = <PauseIcon color="warning" fontSize="small"/>;
                break;
            case 2: //Sending
            case 3: //Receiving
                remoteStatusIcon = <PlayArrowIcon color="primary" fontSize="small"/>;
                break;
            case 4: //Done
                remoteStatusIcon = <DownloadIcon color="success" fontSize="small"/>;
                break;
            case 100: //Error
                remoteStatusIcon = <Tooltip title={row.tr_message}><ReportProblemIcon color="error" fontSize="small"/></Tooltip>;
                break;
        }

        return (
            <Grid container direction="row" alignItems="center">
                <Grid item xs="auto">{statusIcon}</Grid>
                <Grid item xs="auto">{row.tr_status_str + ' to ' + row.tr_site_id_alias}</Grid>
                <Box width="100%"/>
                <Grid item xs="auto">{remoteStatusIcon}</Grid>
                <Grid item xs="auto"> {'Remote Status: ' + row.tr_remote_status_str}</Grid>
                <Grid item xs={12} pl={'4px'}>{row.tr_last_try_formatted?row.tr_last_try_formatted:''}</Grid>
            </Grid>
        )
    }

    const RemoteStatusComponent = (row) => {
        if (row.tr_direction!==1) return null;

        let statusIcon = "";
        switch (row.tr_status) {
            case 0: //Wait
            case 1: //Ready
                statusIcon = <PauseIcon color="warning" fontSize="small"/>;
                break;
            case 2: //Sending
            case 3: //Receiving
                statusIcon = <PlayArrowIcon color="primary" fontSize="small"/>;
                break;
            case 4: //Done
                statusIcon = <DownloadIcon color="success" fontSize="small"/>;
                break;
            case 100: //Error
                statusIcon = <Tooltip title={row.tr_message}><ReportProblemIcon color="error" fontSize="small"/></Tooltip>;
                break;
        }

        return (
            <Grid container direction="row" alignItems="center">
                <Grid item xs="auto" mr={0.5}>{statusIcon}</Grid>
                <Grid item xs="auto">{row.tr_status_str + ' from ' + (row.tr_transfer_site_alias?row.tr_transfer_site_alias:row.tr_transfer_site_id)}</Grid>
                <Box width="100%"/>
                <Grid item xs={12} pl={'4px'}>{row.tr_last_try_formatted?row.tr_last_try_formatted:''}</Grid>
            </Grid>
        )
    }

    /** THEME AND CSS */
    const theme = useTheme();
    const useStyles = makeStyles({
        hover: {
            "&:hover": {
                transition: '0.3s ',
                backgroundColor: theme.palette.table.head + "! important"
            },
            backgroundColor: theme.palette.table.body + "! important",
        },
    });
    const classes = useStyles();

    const [pageSize, setPageSize] = React.useState(20);
    const [rows, setRows] = React.useState([]);

    const refreshOrders = async(filters) => {
        const response = await TransferService.getOrders(filters);

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;

        let tmp = [];
        response.items.map((row, i) => {
            tmp.push(row);
        })
        setRows(tmp);
    }

    React.useEffect(() => {
        refreshOrders(props.filters);
    }, [props.filters]);

    React.useEffect(() => {
        if (props.autoRefresh) {
            const interval = setInterval(() => {
                refreshOrders();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [props]);

    const handleRetry = async(row) => {
        const response = await TransferService.retryOrders(row.st_uid, row.tr_site_id);

        if (response.error) {
            console.log(response.error);
            return;
        }

        props.refresh();
    }

    const handleCancel = async (row) => {
        const response = await TransferService.cancelOrders(row.st_uid, row.tr_site_id);

        if (response.error) {
            console.log(response.error);
            return;
        }

        props.refresh();
    }

    const column = [
        {
            field: "status",
            headerName: t("tables_header.status"),
            flex: 1,
            minWidth: 200,
            encodeHtml: false,
            renderCell: (params) => {
                return <>
                    {params.row.tr_direction===0 ? LocalstatusComponent(params.row) : RemoteStatusComponent(params.row)}
                </>

            }
        },
        {
            field: 'patient',
            headerName: t("tables_header.patient"),
            flex: 1,
            minWidth: 150,
            maxWidth: 250,
            encodeHtml: false,
            renderCell: (params) => {
                return <div
                    style={{lineHeight: "normal"}}>{params.row.p_name || ''} ({params.row.p_id || ''})<br/>{params.row.p_birthdate_formatted || ''} - {params.row.p_sex || ''}
                </div>
            }
        },
        {
            field: 'study',
            headerName: t("tables_header.study"),
            flex: 1,
            minWidth: 350,
            maxWidth: 450,
            encodeHtml: false,
            renderCell: (params) => {
                return <div
                    style={{lineHeight: "normal"}}>{params.row.st_description || ''} - {params.row.st_accession_number || ''}<br/>{params.row.tr_calling_aet || ''}@{params.row.tr_called_aet || ''}<br />{params.row.st_date_formatted || ''}
                </div>
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => {

                let actions = [];
                switch (params.row.tr_status) {
                    case 0: //Wait
                    case 1: //Ready
                    case 2: //Sending
                    case 3: //Receiving
                        actions.push(<GridActionsCellItem
                            icon={<CancelIcon/>}
                            label={t("buttons.cancel")}
                            onClick={() => handleCancel(params.row)}
                            showInMenu
                        />);
                        break;
                    case 4: //Done
                    case 100: //Error
                        actions.push(<GridActionsCellItem
                            icon={<ReplayIcon/>}
                            label={t("buttons.retry")}
                            onClick={() => handleRetry(params.row)}
                            showInMenu
                        />);
                        break;
                }
                return actions;
            }
        }
    ];

    return (
        <React.Fragment>
            <div style={{width: '100%'}}>
                <DataGrid
                    className={classes.hover}
                    style={{marginTop: '25px'}}
                    autoWidth={true}
                    autoHeight={true}
                    rowHeight={80}
                    rows={rows}
                    columns={column}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10,20,50]}
                    sx={{
                        '& .MuiDataGrid-row:hover': {
                            transition: '0.3s ',
                            backgroundColor: theme.palette.table.hover,
                        },
                        '& .MuiDataGrid-row.Mui-selected': {
                            transition: '0.3s ',
                            backgroundColor: theme.palette.table.hover,
                        },
                        '& .MuiDataGrid-row.Mui-selected:hover': {
                            transition: '0.3s ',
                            backgroundColor: theme.palette.table.hoverSelected,
                        },
                    }}
                    disableColumnMenu={true}
                />
            </div>
        </React.Fragment>
    )
}
export default TransferStatusLayout;