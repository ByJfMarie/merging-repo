import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import UsersService from "../../../services/api/users.service";
import {Alert, IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/** STATUS CHIP (ERROR / SUCCESS) */

const TableUsers = (props) => {

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

    const refreshUsers = async(filters) => {
        const response = await UsersService.getUsers(filters);

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        setRows(response.items);
    }

    React.useEffect(() => {
        refreshUsers(props.filters);
    }, [props.forceRefresh, props.filters]);

    const handleEdit = async (row) => {
        props.editUser(row);
    }

    const handleDelete = async (id) => {
        const response = await UsersService.deleteUser(id);

        if (response.error) {
            props.alertMessage({
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        refreshUsers(props.filters);
        props.alertMessage({
            show: true,
            severity: "success",
            message: "User has been successfully deleted!"
        });
    }

    const column = [
        {
            field: "login",
            headerName: "Login",
            flex: 1,
            minWidth: 110,
            description: "Login",
            headerAlign: "left",
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 110,
            description: "Name",
            headerAlign: "left",
            renderCell: (params) => {
                return <div style={{ lineHeight: "normal" }}>{params.row.title || ''} {params.row.first_name || ''} {params.row.last_name || ''}</div>;
            }
        },
        {
            field: "mail",
            headerName: "Email",
            flex: 1,
            minWidth: 110,
            description: "Email",
            headerAlign: "left",
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            minWidth: 110,
            description: "Role",
            headerAlign: "left",
        },
        {
            field: "status",
            headerName: "Active",
            flex: 1,
            minWidth: 110,
            description: "Status",
            headerAlign: "left",
            renderCell: (params) => {
                return (
                    <div style={{display: "flex", alignItems: "center !important", lineHeight: "normal"}}>
                        {
                            (params.row.status)
                                ? (<IconButton><CheckIcon color="success" fontSize="small"/></IconButton>)
                                : ""
                        }
                    </div>
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
export default TableUsers