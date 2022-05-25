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

/** STATUS CHIP (ERROR / SUCCESS) */

const TableRetrievingStatus = (props) => {

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
                    params.value === 100 && (
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

    const [rows, setRows] = React.useState(props.rows);
    React.useEffect(() => {
        setRows(props.rows);

        if (props.autoRefresh) {
            const interval = setInterval(() => {
                props.refresh();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [props.rows]);

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
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 110,
            description: "Status",
            headerAlign: "left",
            renderCell: (params) => {
                return statusComponent(params);
            }
        }
    ];

    props.settings[props.page].statusTable.columns.map((row) => {
        if (row === 'patient') {
            column.push(
                {
                    "field": 'p_name',
                    "headerName": t(row),
                    "flex": 2,
                    "minWidth": 200
                })
        }
        else if (row === 'description') {
            column.push(
                {
                    "field": 'st_description',
                    "headerName": t(row),
                    "flex": 3,
                    "minWidth": 200
                })
        }
        else if (row === 'aet') {
            column.push(
                {
                    "field": 'aet',
                    "headerName": t(row),
                    "flex": 2,
                    "minWidth": 200,
                    renderCell: (params) => {
                        return <div style={{ lineHeight: "normal" }}>{params.row.called_aet || ''} to {params.row.move_aet || ''} </div>;
                    }
                })
        }
        else if (row === "noi") {
            column.push(
                {
                    "field": 'noi',
                    "headerName": t(row),
                    "flex": 1,
                    "minWidth": 200,
                    renderCell: (params) => {
                        return <div style={{ lineHeight: "normal" }}>{params.row.nb_images_sent} / {params.row.nb_images} images</div>;
                    }
                })
        }
    });

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
    );

    return (
        rows &&
        <React.Fragment>
            <div style={{width: '100%'}}>
                <DataGrid
                    className={classes.hover}
                    style={{marginTop: '25px'}}
                    autoWidth={true}
                    autoHeight={true}
                    rows={rows}
                    columns={column}
                    pageSize={10}
                    rowsPrPageOptions={[10]}
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
export default TableRetrievingStatus