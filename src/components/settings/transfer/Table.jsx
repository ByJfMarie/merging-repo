import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import TransferService from "../../../services/api/transfer.service";
import {Box, Chip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/** STATUS CHIP (ERROR / SUCCESS) */

const TableTransferRules = (props) => {

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
        const response = await TransferService.getRules();

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
        const response = await TransferService.deleteRule(id);

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
            field: "ae_title",
            headerName: "AET Condition",
            flex: 3,
            minWidth: 110,
            description: "Login",
            headerAlign: "left",
        },
        {
            field: "destinations",
            headerName: "Destination(s)",
            flex: 2,
            minWidth: 110,
            description: "Name",
            headerAlign: "left",
            renderCell: (params) => {
                return (
                    <div style={{ lineHeight: "normal" }}>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {
                            params.row.destinations.map((key) =>
                                <Chip key={key} label={props.remoteSites[key] || key}/>
                            )
                        }
                        </Box>
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
export default TableTransferRules;