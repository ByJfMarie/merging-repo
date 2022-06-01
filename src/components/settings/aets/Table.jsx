import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import AETService from "../../../services/api/aet.service";
import {Grid, IconButton, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

/** STATUS CHIP (ERROR / SUCCESS) */

const TableAets = (props) => {

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

    const [pageSize, setPageSize] = React.useState(10);
    const [rows, setRows] = React.useState([]);

    const refresh = async() => {
        const response = await AETService.getAETs();

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        setRows(response.items);
    }

    React.useEffect(() => {
        refresh();
    }, [props.forceRefresh]);

    const handleEcho = async (row) => {
        const response = await AETService.echoAET(row.id);

        if (response.error) {
            props.alertMessage({
                show: true,
                severity: "error",
                message: "Impossible to make an ECHO: "+response.error
            });
            return;
        }

        props.alertMessage({
            show: true,
            severity: "success",
            message: "ECHO successful!"
        });
    }

    const handleEdit = async (row) => {
        props.edit(row);
    }

    const handleDelete = async (id) => {
        const response = await AETService.deleteAET(id);

        if (response.error) {
            props.alertMessage({
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        refresh();
        props.alertMessage({
            show: true,
            severity: "success",
            message: "User has been successfully deleted!"
        });
    }

    const column = [
        {
            field: "aet",
            headerName: "AET",
            flex: 3,
            minWidth: 110,
            description: "Login",
            headerAlign: "left",
            renderCell: (params) => {
                return <div style={{ lineHeight: "normal" }}>{params.row.title || ''} <br/> {params.row.description}</div>;
            }
        },
        {
            field: "ip",
            headerName: "IP Address",
            flex: 2,
            minWidth: 110,
            description: "Name",
            headerAlign: "left"
        },
        {
            field: "port",
            headerName: "Port",
            flex: 1,
            minWidth: 110,
            description: "Email",
            headerAlign: "left",
        },
        {
            field: "capabilities",
            headerName: "Capabilities",
            flex: 8,
            minWidth: 110,
            description: "Role",
            headerAlign: "left",
            renderCell: (params) => {
                return (
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                {
                                    (params.row.store)
                                        ? (<Typography ><IconButton><CheckIcon color="success" fontSize="small"/></IconButton>Store</Typography>)
                                        : (<Typography ><IconButton><ClearIcon color="error" fontSize="small"/></IconButton>Store</Typography>)
                                }
                            </Grid>
                            <Grid item xs={4}>
                                {
                                    (params.row.forward)
                                        ? (<Typography><IconButton><CheckIcon color="success" fontSize="small"/></IconButton>Forward</Typography>)
                                        : (<Typography><IconButton><ClearIcon color="error" fontSize="small"/></IconButton>Forward</Typography>)
                                }
                            </Grid>
                            <Grid item xs={4}>
                                {
                                    (params.row.qr)
                                        ? (<Typography ><IconButton><CheckIcon color="success" fontSize="small"/></IconButton>Q/R</Typography>)
                                        : (<Typography ><IconButton><ClearIcon color="error" fontSize="small"/></IconButton>Q/R</Typography>)
                                }
                            </Grid>
                        </Grid>
                )
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => {
                let actions = [];

                actions.push(<GridActionsCellItem
                    icon={<SyncAltIcon/>}
                    label="Echo"
                    onClick={() => handleEcho(params.row)}
                    showInMenu
                />);

                actions.push(<GridActionsCellItem
                    icon={<EditIcon/>}
                    label="Edit"
                    onClick={() => handleEdit(params.row)}
                    showInMenu
                />);

                actions.push(<GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                    showInMenu
                />);

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
                    pagination
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
export default TableAets