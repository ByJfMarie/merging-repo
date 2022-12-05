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
import {useSnackbar} from "notistack";

/** Translation */
import { useTranslation } from 'react-i18next';

const TableAets = (props) => {
    const { t } = useTranslation('system');

    const { enqueueSnackbar } = useSnackbar();

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
        const response = await AETService.all();

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
            enqueueSnackbar(t("messages.echo_aet.error", {aet: row.id, error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.echo_aet.success", {aet: row.id}), {variant: 'success'});
    }

    const handleEdit = async (row) => {
        props.edit(row);
    }

    const handleDelete = async (id) => {
        const response = await AETService.deleteAET(id);

        if (response.error) {
            enqueueSnackbar(t("messages.delete_aet.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.delete_aet.success"), {variant: 'success'});
        refresh();
    }

    const column = [
        {
            field: "aet",
            headerName: t("tab_remote_servers.table.header.aet"),
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
            headerName: t("tab_remote_servers.table.header.host"),
            flex: 2,
            minWidth: 110,
            description: "Name",
            headerAlign: "left"
        },
        {
            field: "port",
            headerName: t("tab_remote_servers.table.header.port"),
            flex: 1,
            minWidth: 110,
            description: "Email",
            headerAlign: "left",
        },
        {
            field: "capabilities",
            headerName: t("tab_remote_servers.table.header.capabilities"),
            flex: 8,
            minWidth: 110,
            description: "Role",
            headerAlign: "left",
            renderCell: (params) => {
                return (
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                {
                                    (params.row.qr)
                                        ? (<Typography ><IconButton><CheckIcon color="success" fontSize="small"/></IconButton>{t("tab_remote_servers.dialog_add_edit.capabilities.query")}</Typography>)
                                        : (<Typography ><IconButton><ClearIcon color="error" fontSize="small"/></IconButton>{t("tab_remote_servers.dialog_add_edit.capabilities.query")}</Typography>)
                                }
                            </Grid>
                            <Grid item xs={4}>
                                {
                                    (params.row.store)
                                        ? (<Typography ><IconButton><CheckIcon color="success" fontSize="small"/></IconButton>{t("tab_remote_servers.dialog_add_edit.capabilities.retrieve")}</Typography>)
                                        : (<Typography ><IconButton><ClearIcon color="error" fontSize="small"/></IconButton>{t("tab_remote_servers.dialog_add_edit.capabilities.retrieve")}</Typography>)
                                }
                            </Grid>
                            <Grid item xs={4}>
                                {
                                    (params.row.forward)
                                        ? (<Typography><IconButton><CheckIcon color="success" fontSize="small"/></IconButton>{t("tab_remote_servers.dialog_add_edit.capabilities.forward")}</Typography>)
                                        : (<Typography><IconButton><ClearIcon color="error" fontSize="small"/></IconButton>{t("tab_remote_servers.dialog_add_edit.capabilities.forward")}</Typography>)
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
                    label={t("tab_remote_servers.table.menu.echo")}
                    onClick={() => handleEcho(params.row)}
                    showInMenu
                />);

                actions.push(<GridActionsCellItem
                    icon={<EditIcon/>}
                    label={t("tab_remote_servers.table.menu.edit")}
                    onClick={() => handleEdit(params.row)}
                    showInMenu
                />);

                actions.push(<GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label={t("tab_remote_servers.table.menu.delete")}
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
                    disableColumnMenu={true}
                />
            </div>
        </React.Fragment>
    )
}
export default TableAets