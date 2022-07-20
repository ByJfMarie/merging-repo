import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import t from "../../services/Translation";
import LogsService from "../../services/api/logs.service";
import UserContext from "../UserContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {Box, Card, CardContent, Divider, Grid, TextField} from "@mui/material";
import moment from "moment";

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

    const refreshLogs = async(filters) => {
        const response = await LogsService.search(filters);

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
                refreshLogs(filters);
            }, 5000);
            return () => clearInterval(interval);
        } else refreshLogs(filters);
    }, []);

    //View Log
    const handleActionView = async (key) => {
        const rsp = await LogsService.download(key);
        if (rsp && rsp.data && rsp.data.size) {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [rsp.data],
                {type: 'text/plain'});

            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);

            //Open the URL on new Window
            window.open(fileURL);
        }
    };

    //Download Log
    const handleActionDownload = async (key) => {
        const rsp = await LogsService.download(key);
        if (rsp && rsp.data && rsp.data.size) {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [rsp.data],
                {type: 'text/plain'});

            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);

            //Download - Click on url
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', key);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(fileURL);
        }
    };

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
            minWidth: 200,
            renderCell: (params) => {
                return params.row.formatted_size;
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => {

                let actions = [];

                actions.push(<GridActionsCellItem
                    icon={<VisibilityIcon/>}
                    label={"View"}
                    onClick={() => handleActionView(params.row.key)}
                />);

                actions.push(<GridActionsCellItem
                    icon={<DownloadIcon/>}
                    label={"Download"}
                    onClick={() => handleActionDownload(params.row.key)}
                />);

                return actions;
            }
        }
    ];

    const [filters, setFilters] = React.useState({
        date: new Date(),
        name: ""
    });
    const handleFiltersChange = (id, value) => {
        if (id==='date') {
            if (value && !moment(value).isValid()) return;
        }

        let tmp = {...filters, [id]:value};
        setFilters(tmp);
        refreshLogs(tmp);
    }

    return (
        <React.Fragment>
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                <CardContent>
                    <Box sx={{p:2 ,flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Date desktop"
                                        inputFormat="MM/dd/yyyy"
                                        value={filters.date}
                                        onChange={(date, keyboardInputValue) => {
                                            if (keyboardInputValue && keyboardInputValue.length>0 && keyboardInputValue.length<10) return;
                                            handleFiltersChange("date", date);}
                                        }
                                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} variant="standard" {...params} />}
                                        clearable={true}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label={"Name"}
                                    variant="standard"
                                    value={filters.name}
                                    onChange={(e) => {handleFiltersChange("name", e.target.value);}}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

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
                    disableColumnMenu={true}
                />
            </div>
        </React.Fragment>
    )
}
export default TableLogs;