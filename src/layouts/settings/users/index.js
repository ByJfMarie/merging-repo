import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import UsersService from "../../../services/api/users.service";
import DialogResetPassword from "./DialogResetPassword";
import {IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import LockResetIcon from '@mui/icons-material/LockReset';
import {useState} from "react";
import AlertDialog from "../../../components/AlertDialog";
import {useSnackbar} from "notistack";

/** Translation */
import { useTranslation } from 'react-i18next';


const Index = (props) => {
    const { t } = useTranslation('users');

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

    const handleUserStatus = async (row) => {
        row.status = !row.status;

        let response = await UsersService.editUser(row.login, row);
        if (response.error) {
            enqueueSnackbar(t("messages.save_user.error", {error: response.error}), {variant: 'error'});
            return;
        }

        refreshUsers(props.filters);
        enqueueSnackbar(t("messages.save_user.success"), {variant: 'success'});
    }

    const [resetPasswordUser, setResetPasswordUser] = React.useState(null);
    const [resetPasswordOpen, setResetPasswordOpen] = React.useState(false);
    const handleResetPassword = async (row) => {
        setResetPasswordUser(row);
        setResetPasswordOpen(true);
    }

    const handleEdit = async (row) => {
        props.editUser(row);
    }

    //Delete
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [dialogDeleteUser, setDialogDeleteUser] = useState(null);
    const handleCloseDeleteDialog = () => {
        setDialogDeleteOpen(false);
    }
    const handleDelete = (user) => {
        setDialogDeleteUser(user);
        setDialogDeleteOpen(true);
    }
    const handleConfirmDeleteDialog = async (user) => {
        setDialogDeleteOpen(false);
        const response = await UsersService.deleteUser(user.login);

        if (response.error) {
            enqueueSnackbar(t("messages.delete_user.error", {user: user.login, error: response.error}), {variant: 'error'});
            return;
        }

        refreshUsers(props.filters);
        enqueueSnackbar(t("messages.delete_user.success", {user: user.login}), {variant: 'success'});
    }

    const column = [
        {
            field: "login",
            headerName: t("table.header.login"),
            flex: 1,
            minWidth: 110,
            description: "Login",
            headerAlign: "left",
        },
        {
            field: "name",
            headerName: t("table.header.name"),
            flex: 1,
            minWidth: 110,
            description: "Name",
            headerAlign: "left",
            renderCell: (params) => {
                return <div style={{ lineHeight: "normal" }}>{params.row.title?t("fields.title_value."+params.row.title):""} {params.row.first_name || ''} {params.row.last_name || ''}</div>;
            }
        },
        {
            field: "mail",
            headerName: t("table.header.mail"),
            flex: 1,
            minWidth: 110,
            description: "Email",
            headerAlign: "left",
        },
        {
            field: "role",
            headerName: t("table.header.role"),
            flex: 1,
            minWidth: 110,
            description: "Role",
            headerAlign: "left",
        },
        {
            field: "status",
            headerName: t("table.header.active"),
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

                if (params.row.status) {
                    actions.push(<GridActionsCellItem
                        icon={<CloseIcon color="error"/>}
                        label={t("table.menu.deactivate")}
                        onClick={() => handleUserStatus(params.row)}
                        showInMenu
                    />);
                } else {
                    actions.push(<GridActionsCellItem
                        icon={<CheckIcon color="success"/>}
                        label={t("table.menu.activate")}
                        onClick={() => handleUserStatus(params.row)}
                        showInMenu
                    />);
                }

                actions.push(<GridActionsCellItem
                    icon={<LockResetIcon/>}
                    label={t("table.menu.reset_password")}
                    onClick={() => handleResetPassword(params.row)}
                    showInMenu
                />);

                actions.push(<GridActionsCellItem
                    icon={<EditIcon/>}
                    label={t("table.menu.edit")}
                    onClick={() => handleEdit(params.row)}
                    showInMenu
                />);

                actions.push(<GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label={t("table.menu.delete")}
                    color="error"
                    onClick={() => handleDelete(params.row)}
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

            <DialogResetPassword
                open={resetPasswordOpen}
                setOpen={setResetPasswordOpen}
                user={resetPasswordUser}
            />

            <AlertDialog
                open={dialogDeleteOpen}
                title={t("dialog_delete.title")}
                text={t("dialog_delete.text")}
                data={dialogDeleteUser}
                buttonCancel={t("dialog_delete.actions.cancel")}
                buttonConfirm={t("dialog_delete.actions.delete")}
                functionCancel={handleCloseDeleteDialog}
                functionConfirm={handleConfirmDeleteDialog}
            />
        </React.Fragment>
    )
}
export default Index