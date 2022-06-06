import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem, GridRenderCellParams} from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import Chip, {ChipProps} from "@mui/material/Chip";
import t from "../../services/Translation";
import {Tooltip} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import QRService from "../../services/api/queryRetrieve.service";
import AuthService from "../../services/api/auth.service";

/** STATUS CHIP (ERROR / SUCCESS) */
const statusComponent = (params) => {

    return (
        <>
            {
                params.value === 0 && (
                    <Chip
                        variant="filled"
                        size="small"
                        icon= {<AccessTimeIcon style={{fill: '#fff'}}/>}
                        label="Waiting"
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
                        label= "Retrieving"
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
                        label= "Completed"
                        color= "success"
                    />
                )
            }

            {
                params.value === 3 && (
                    <Tooltip title={params.row.error}>
                        <Chip
                            variant="filled"
                            size="small"
                            icon= {<ErrorIcon style={{fill: '#fff'}}/>}
                            label= "Error"
                            color= "error"
                        />
                    </Tooltip>
                )
            }
        </>
    );
}

const TableTransferStatus = (props) => {

    const priviledges = AuthService.getCurrentUser().priviledges;

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
        const response = await QRService.getOrders({});

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
        let autoRefresh = false;
        if (autoRefresh) {
            const interval = setInterval(() => {
                refreshOrders();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, []);

    const handleRetry = async(id) => {
        const response = await QRService.retryOrders(id);

        if (response.error) {
            console.log(response.error);
            return;
        }

        props.refresh();
    }

    const handleCancel = async (id) => {
        const response = await QRService.cancelOrders(id);

        if (response.error) {
            console.log(response.error);
            return;
        }

        props.refresh();
    }

    const column = [
        {
            field: 'p_name',
            headerName: t("patient"),
            flex: 2,
            minWidth: 200
        },
        {
            field: 'st_description',
            headerName: t("study"),
            flex: 3,
            minWidth: 200
        },
        {
            field: "status",
            headerName: t("status"),
            flex: 1,
            minWidth: 110,
            description: "Status",
            headerAlign: "left",
            renderCell: (params) => {
                return statusComponent(params);
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => {

                let actions = [];
                if (params.row.status === 3) {
                    actions.push(<GridActionsCellItem
                        icon={<ReplayIcon/>}
                        label="Retry"
                        onClick={() => handleRetry(params.row.id)}
                        showInMenu
                    />);
                }
                if (params.row.status === 0 || params.row.status === 1 || params.row.status === 3) {
                    actions.push(<GridActionsCellItem
                        icon={<CancelIcon/>}
                        label="Cancel"
                        onClick={() => handleCancel(params.row.id)}
                        showInMenu
                    />);
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
                />
            </div>
        </React.Fragment>
    )
}
export default TableTransferStatus;