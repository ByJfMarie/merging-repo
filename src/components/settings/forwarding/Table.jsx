import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem, GridRenderCellParams} from "@mui/x-data-grid";
import ForwardingService from "../../../services/api/forwarding.service";
import {Grid, IconButton, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

/** STATUS CHIP (ERROR / SUCCESS) */

const TableForwarding = (props) => {

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

    const [pageSize, setPageSize] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    const refresh = async() => {
        const response = await ForwardingService.getRules();

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
        refresh();
    }, [props.forceRefresh]);

    const handleEdit = async (row) => {
        props.edit(row);
    }

    const handleDelete = async (id) => {
        const response = await ForwardingService.deleteRule(id);

        if (response.error) {
            console.log(response.error);
            return;
        }

        refresh();
    }

    const column = [
        {
            field: "aet_condition",
            headerName: "AET Condition",
            flex: 3,
            minWidth: 110,
            description: "Login",
            headerAlign: "left"
        },
        {
            field: "value",
            headerName: "Forward To",
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
                    rowsPerPageOptions={[5,10,20]}
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
export default TableForwarding;