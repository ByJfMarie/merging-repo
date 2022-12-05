import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import ForwardingService from "../../../services/api/forwarding.service";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSnackbar} from "notistack";

/** Translation */
import { useTranslation } from 'react-i18next';

const TableForwarding = (props) => {
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
        const response = await ForwardingService.getRules();

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

    const handleEdit = async (row) => {
        props.edit(row);
    }

    const handleDelete = async (id) => {
        const response = await ForwardingService.deleteRule(id);

        if (response.error) {
            enqueueSnackbar(t("messages.delete_forwarding.error", {error: response.error}), {variant: 'error'});
            return;
        }

        enqueueSnackbar(t("messages.delete_forwarding.success"), {variant: 'success'});
        refresh();
    }

    const column = [
        {
            field: "aet_condition",
            headerName: t("tab_forwarding.table.header.aet_condition"),
            flex: 3,
            minWidth: 110,
            description: "Login",
            headerAlign: "left"
        },
        {
            field: "value",
            headerName: t("tab_forwarding.table.header.forward_to"),
            flex: 2,
            minWidth: 110,
            description: "Name",
            headerAlign: "left"
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => {
                let actions = [];

                actions.push(<GridActionsCellItem
                    icon={<EditIcon/>}
                    label={t("tab_forwarding.table.menu.edit")}
                    onClick={() => handleEdit(params.row)}
                    showInMenu
                />);

                actions.push(<GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label={t("tab_forwarding.table.menu.delete")}
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
export default TableForwarding;