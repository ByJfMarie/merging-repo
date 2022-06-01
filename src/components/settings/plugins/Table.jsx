import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import ForwardingService from "../../../services/api/forwarding.service";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/** STATUS CHIP (ERROR / SUCCESS) */

const TablePlugins = (props) => {

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

    const [rows, setRows] = React.useState([
        {'key':'meddream', 'id':'meddream', 'name':"Meddream Viewer", 'version': "7.6.0", 'type': "DICOM Viewer"},
        {'key':'perennity', 'id':'meddream', 'name':"Perennity Viewer", 'version': "7.6.0", 'type': "DICOM Viewer"}
        ]);

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
        //refresh();
    }, [props.forceRefresh]);

    /** HEADERS AND ROWS FOR THE TABLE */
    const headers = ['name', 'version', 'type', 'vide'];
    const column = [
        {
            field: "name",
            headerName: "Name",
            flex: 3,
            minWidth: 110,
            description: "Login",
            headerAlign: "left"
        },
        {
            field: "version",
            headerName: "Version",
            flex: 2,
            minWidth: 110,
            description: "Name",
            headerAlign: "left"
        },
        {
            field: "type",
            headerName: "Type",
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
                    pageSize={10}
                    rowsPerPageOptions={[10]}
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
export default TablePlugins;