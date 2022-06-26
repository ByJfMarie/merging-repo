import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid} from "@mui/x-data-grid";
import t from "../../services/Translation";
import LogsService from "../../services/api/logs.service";
import UserContext from "../UserContext";

const TableLogs = (props) => {

    const { privileges } = React.useContext(UserContext);

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

    const refreshLogs = async() => {
        const response = await LogsService.search({});

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
        if (props.autoRefresh) {
            const interval = setInterval(() => {
                refreshLogs();
            }, 5000);
            return () => clearInterval(interval);
        } else refreshLogs();
    }, []);

    const column = [
        {
            field: 'file_name',
            headerName: t("file"),
            flex: 2,
            minWidth: 200
        },
        {
            field: 'date',
            headerName: t("date"),
            flex: 3,
            minWidth: 200
        },
        {
            field: 'size',
            headerName: t("size"),
            flex: 3,
            minWidth: 200
        },
        {
            field: 'size',
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
export default TableLogs;