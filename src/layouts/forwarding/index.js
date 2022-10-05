import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import Chip from "@mui/material/Chip";
import {Tooltip} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import ForwardingService from "../../services/api/forwarding.service";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";

/** STATUS CHIP (ERROR / SUCCESS) */

const ForwardingLayout = (props) => {
    const { t } = useTranslation('common');

    //const[privileges] = React.useState(UserStorage.getPrivileges());

    const statusComponent = (params) => {

        return (
            <>
                {
                    params.value === 0 && (
                        <Chip
                            variant="filled"
                            size="small"
                            icon= {<AccessTimeIcon style={{fill: '#fff'}}/>}
                            label={t("status.waiting")}
                            //color: "default"
                        />
                    )
                }

                {
                    params.value === 1 && (
                        <Chip
                            variant="filled"
                            size="small"
                            icon= {<DownloadIcon style={{fill: '#fff'}}/>}
                            label={t("status.forwarding")}
                            color= "info"
                        />
                    )
                }

                {
                    params.value === 2 && (
                        <Chip
                            variant="filled"
                            size="small"
                            icon= {<CheckCircleIcon style={{fill: '#fff'}}/>}
                            label={t("status.completed")}
                            color= "success"
                        />
                    )
                }

                {
                    params.value === 100 && (
                        <Tooltip title={params.row.error}>
                            <Chip
                                variant="filled"
                                size="small"
                                icon= {<ErrorIcon style={{fill: '#fff'}}/>}
                                label={t("status.error")}
                                color= "error"
                            />
                        </Tooltip>
                    )
                }
            </>
        );
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

    const refreshOrders = async() => {
        const response = await ForwardingService.getOrders({});

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
        refreshOrders();
    }, []);

    React.useEffect(() => {
        if (props.autoRefresh) {
            const interval = setInterval(() => {
                refreshOrders();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [props]);

    const handleRetry = async(study_uid, called_aet) => {
        const response = await ForwardingService.retryOrders(study_uid, called_aet);

        if (response.error) {
            console.log(response.error);
            return;
        }

        refreshOrders();
    }

    const handleCancel = async (study_uid, called_aet) => {
        const response = await ForwardingService.cancelOrders(study_uid, called_aet);

        if (response.error) {
            console.log(response.error);
            return;
        }

        refreshOrders();
    }

    const column = [
        {
            field: "status",
            headerName: t("tables_header.status"),
            flex: 1,
            minWidth: 110,
            description: "Status",
            headerAlign: "left",
            renderCell: (params) => {
                return statusComponent(params);
            }
        },
        {
            "field": 'creation_date_formatted',
            "headerName": t("tables_header.creation_date"),
            "flex": 2,
            "minWidth": 200
        },
        {
            "field": 'p_name',
            "headerName": t("tables_header.patient"),
            "flex": 2,
            "minWidth": 200
        },
        {
            "field": 'st_description',
            "headerName": t("tables_header.description"),
            "flex": 3,
            "minWidth": 200
        },
        {
            "field": 'aet',
            "headerName": t("tables_header.aet"),
            "flex": 2,
            "minWidth": 200,
            renderCell: (params) => {
                return <div style={{ lineHeight: "normal" }}>{params.row.called_aet || ''} </div>;
            }
        },
        {
            "field": 'noi',
            "headerName": t("tables_header.noi"),
            "flex": 1,
            "minWidth": 200,
            renderCell: (params) => {
                if (params.row.nb_images<=0) return;
                return <div style={{ lineHeight: "normal" }}>{params.row.nb_images_sent} / {params.row.nb_images} images</div>;
            }
        }
    ];


    column.push(
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => {

                let actions = [];
                if (params.row.status === 100) {
                    actions.push(<GridActionsCellItem
                        icon={<ReplayIcon/>}
                        label={t("buttons.retry")}
                        onClick={() => handleRetry(params.row.study_uid, params.row.called_aet)}
                        showInMenu
                    />);
                }
                if (params.row.status === 0 || params.row.status === 1 || params.row.status === 100) {
                    actions.push(<GridActionsCellItem
                        icon={<CancelIcon/>}
                        label={t("buttons.cancel")}
                        onClick={() => handleCancel(params.row.study_uid, params.row.called_aet)}
                        showInMenu
                    />);
                }
                if (params.row.status === 2) {
                    actions.push(<GridActionsCellItem
                        icon={<CancelIcon/>}
                        label={t("buttons.delete")}
                        onClick={() => handleCancel(params.row.study_uid, params.row.called_aet)}
                        showInMenu
                    />);
                }
                return actions;
            }
        }
    );

    return (
        <React.Fragment>
            <div style={{width: '100%'}}>
                <DataGrid
                    className={classes.hover}
                    style={{marginTop: '25px'}}
                    autoWidth={true}
                    autoHeight={true}
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
export default ForwardingLayout;