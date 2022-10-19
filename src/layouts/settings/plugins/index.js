import * as React from 'react';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import PluginsService from "../../../services/api/plugins.service";
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/** Translation */
import { useTranslation } from 'react-i18next';

const TablePlugins = (props) => {
    const { t } = useTranslation('settings');

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

    const [rows, setRows] = React.useState([]);

    const refresh = async(forceRefresh) => {
        const response = await PluginsService.list(forceRefresh);

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        setRows(response.items);
    }

    React.useEffect(() => {
        refresh(true);
    }, [props.forceRefresh]);

    const handleInstall = async(id) => {
        const response = await PluginsService.install(id);

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        refresh(true);

        props.alertMessage({
            show: true,
            severity: "success",
            message: "Plugin successfully installed!"
        });
    }

    const handleUninstall = async(id) => {
        const response = await PluginsService.uninstall(id);

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        refresh(true);

        props.alertMessage({
            show: true,
            severity: "success",
            message: "Plugin successfully uninstalled!"
        });
    }

    const handleDelete = async(id) => {
        const response = await PluginsService.delete(id);

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items==null) return;
        refresh(true);

        props.alertMessage({
            show: true,
            severity: "success",
            message: "Plugin successfully deleted!"
        });
    }

    /** HEADERS AND ROWS FOR THE TABLE */
    //const headers = ['name', 'version', 'type', 'vide'];
    const column = [
        {
            field: "name",
            headerName: t("tables_header.name"),
            flex: 3,
            minWidth: 110,
            description: "Login",
            headerAlign: "left"
        },
        {
            field: "version",
            headerName: t("tables_header.version"),
            flex: 2,
            minWidth: 110,
            description: "Name",
            headerAlign: "left"
        },
        {
            field: "type",
            headerName: t("tables_header.type"),
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
                if (params.row.installed) {
                    actions.push(<GridActionsCellItem
                        icon={<FileDownloadOffIcon/>}
                        label={t("buttons.uninstall")}
                        onClick={() => handleUninstall(params.row.id)}
                        showInMenu
                    />);
                    actions.push(<GridActionsCellItem
                        icon={<DeleteForeverIcon/>}
                        label={t("buttons.delete")}
                        onClick={() => handleDelete(params.row.id)}
                        showInMenu
                    />);
                } else {
                    actions.push(<GridActionsCellItem
                        icon={<DownloadIcon/>}
                        label={t("buttons.install")}
                        onClick={() => handleInstall(params.row.id)}
                        showInMenu
                    />);
                }

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
                    disableColumnMenu={true}
                />
            </div>
        </React.Fragment>
    )
}
export default TablePlugins;