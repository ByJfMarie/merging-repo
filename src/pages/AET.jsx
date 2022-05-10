import React, {useState, useRef} from 'react';
import { Divider, Typography, Container, Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../services/Translation";
import CustomTable from '../components/CustomTable';
import CustomFilters from '../components/CustomFilters';
import CustomStatusTable from '../components/CustomStatusTable';
import CustomButton from '../components/CustomButton';
import AuthService from "../services/api/auth.service";
import QRService from "../services/api/queryRetrieve.service";

export default function AET() {
  /** THEME */
  const theme = useTheme();

  const priviledges = AuthService.getCurrentUser().priviledges;

  const useStyles = makeStyles({
    root: {
      "& .MuiFilledInput-underline:after": {
        borderBottomColor: theme.palette.input.borderBottom
      },
      "& .MuiInputBase-root.Mui-focused": {
        boxShadow: '0px 0px 5px 2px rgba(45, 180, 235,0.60)'
      }
    }
  })

  const classes = useStyles();

  const [currentAET, setCurrentAET] = React.useState("");
  const [aets, setAets] = React.useState([]);
  const loadAETs = async() => {
    //Load aet list
    const response = await QRService.listAet(true, false, false);
    if (response.error) {
      console.log(response.error);
      return;
    }

    Object.keys(response.items).map((row, i) => {
      aets.push(response.items[row]);
    })
    setAets([...aets], aets)
  }

  const filtersInitValue = {
    patient_id: "",
    patient_name: "",
    study: "",
    accession_number: "",
    status: "",
    birthdate: "",
    aet: "",
    description: "",
    referring_physician: "",
    modality: [],
    showDeleted: false,
    date_preset: '*',
    from: "",
    to: "",
  };
  const [filters, setFilters] = useState(filtersInitValue);
  const [rows, setRows] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowsData, setSelectedRowsData] = useState([])

  const setTableSelection = (rowsId, rowsData) => {
    setSelectedRows(rowsId);
    setSelectedRowsData(rowsData);
  }

  const queryStudies = async(values) => {
    setFilters(values);

    /** RESET RESULT */
    const rows = []

    if (currentAET === '') {
      setRows(rows);
      return;
    }

    const response = await QRService.query(currentAET, values);
    if (response.error) {
      console.log(response.error);
      //window.location.href = "/login";
      return;
    }

    Object.keys(response.items).map((row, i) => {
      rows.push(response.items[row]);
    })
    setRows([...rows], rows)
  }


  const retrieveStudies = async(move_aet) => {
      if (currentAET === '') return;
      const response = await QRService.retrieve(currentAET, move_aet, selectedRowsData);
      if (response.error) {
          console.log(response.error);
          return;
      }

      setSelectedRows([]);
      setSelectedRowsData([]);
      refreshOrders();
  }

  React.useEffect(() => {
    loadAETs()
  }, []);

  React.useEffect(() => {
    queryStudies(filters);
  }, [currentAET]);


  //Status
  const [rowsStatus, setRowsStatus] = useState([]);
  const refreshOrders = async() => {
    const response = await QRService.getOrders({});

    if (response.error) {
      console.log(response.error);
      return;
    }

    if (response.items==null) return;

    let tmp = [];
    response.items.map((row, i) => {
      tmp.push(row);
    })
    setRowsStatus(tmp);
  }
  React.useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="false" style={{ display: "flex", margin : 0, padding : 0, justifyContent: 'space-between' }}>
        
        <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main, width : "300px", marginTop : "auto" }} > {t('remote_aet')} </Typography>

        <FormControl className={classes.root} variant="filled"  style={{width : "300px"}}>
          <InputLabel id="aet" >AET</InputLabel>
          <Select
            labelId="aet"
            id="aet"
            value={currentAET}
            onChange={(e) => { setCurrentAET(e.target.value); queryStudies(filters); }}
          >

            {aets &&
            aets.map((aet) => (
                <MenuItem
                    key={aet.key}
                    value={aet.title}
                >
                  {aet.description}
                </MenuItem>
            ))}

          </Select>
        </FormControl>

      </Container>

      <Container style={{ padding: 0 }}>
        <Grid container spacing={2} style={{ marginBottom: '15px' }} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={12} md={6}>

          </Grid>
        </Grid>

      </Container>

      <Divider style={{ marginBottom: theme.spacing(2) }} />

      <CustomFilters
          {...priviledges}
          initialValues={filtersInitValue}
          searchFunction={queryStudies}
          page="aet"
      />

      <CustomTable
          rows={rows}
          selectedRows={selectedRows}
          selectionHandler={setTableSelection}
          {...priviledges}
          page="aet"
      />

      <CustomButton
          {...priviledges}
          retrieveFunction={retrieveStudies}
          page="aet"
      />
      
      <CustomStatusTable
          {...priviledges}
          page="aet"
          rows={rowsStatus}
          autoRefresh={false}
          refresh={refreshOrders}
      />

    </React.Fragment>
  );
}