import * as React from 'react';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';
import Chip, { ChipProps } from "@mui/material/Chip";
import t from "../services/Translation";

/** STATUS CHIP (ERROR / SUCCESS) */
function getChipProps(params: GridRenderCellParams): ChipProps {
  if (params.value === "ERROR") {
    return {
      // icon: <WarningIcon style={{ fill: '#6b0000' }} />,
      icon: <ErrorIcon style={{ fill: '#fff' }} />, 
      label: params.value,
      style: {
        backgroundColor: '#FF5252',
        color: '#fff' 
      }
    };
  } else {
    return {
      // icon: <CheckCircleIcon style={{ fill: "#054a01" }} />,
      icon: <CheckCircleIcon style={{ fill: '#fff' }} />,
      label: params.value,
      style: {
        backgroundColor: '#26C36A',
        color: '#fff' 
      }
    };
  }
}

const CustomStatusTable = (props) => {
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

  React.useEffect(() => {
  }, [props])

  const column = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status", 
      flex: 1,
      minWidth: 110,
      description: "Status",
      headerAlign: "left",
      renderCell: (params) => {
        return <Chip variant="filled" size="small" {...getChipProps(params)} />;
      }
    }
  ];

      props.settings[props.page].statusTable.columns.map((row) => (
      column.push({ "field": row, "headerName": t(row), "flex": 1, "minWidth": 200})
    ))
 
 
  const rows = [
    { id: 1, status: "ERROR", patient_name: "Lorry", description: "ACC634281 | Serie 1 | Loc (Right)", called_aet: "KPServer" },
    { id: 2, status: "SUCCESS", patient_name: "Theo", description: "ACC634281 | Serie 3 | Cor", called_aet: "KPServer" }
  ]; 

  return (
    <React.Fragment>
      <div style={{ width: '100%' }}>
        <DataGrid
          className={classes.hover}
          style={{ marginTop: '25px' }}
          autoWidth={true}
          autoHeight={true}
          rows={rows}
          columns={column}
          pageSize={10}
          rowsPrPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
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
export default CustomStatusTable