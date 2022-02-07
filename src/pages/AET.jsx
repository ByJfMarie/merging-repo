import React from 'react';
import { Divider, Typography, Container, Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../services/Translation";
import CustomTable from '../components/CustomTable';
import CustomFilters from '../components/CustomFilters';
import CustomStatusTable from '../components/CustomStatusTable';
import CustomButton from '../components/CustomButton';
import AuthService from "../services/api/auth.service";

export default function AET() {
  /** THEME */
  const theme = useTheme();

  const priviledges = AuthService.getCurrentUser().priviledges;

  /** TABLE CONTENT */
  var rows;
  switch (AuthService.getCurrentUser().role) {
    case 'administrator':
      rows = [
        { id: 1, patient_id: '157685934', patient_name: 'Theo Langlois', modality: "DX", description: "Shoulder", date: '01/09/2021', refering: 'Doctor Y', access: 'lorem', repot: 'PDF', permission: 'perm', noi: 5 },
        { id: 2, patient_id: '946577235', patient_name: 'Lorry Kiavué', modality: "MRI", description: "Shoulder", date: '01/09/2021', refering: 'Doctor X', access: 'lorem', report: 'PDF', permission: 'perm', noi: 3 },
      ]
      break;
    case 'patient':
      rows = [
        { id: 1, acc_num: '01125545', date: '01/09/2021', description: "Shoulder", modality: 'DX', facility: 'Perennity Hospital', report: 'PDF' },
        { id: 2, acc_num: '15454823', date: '27/05/2020', description: "Crane", modality: 'MRI', facility: 'Perennity Hospital', report: 'PDF' },
      ]
      break;
    case 'doctor':
      rows = [
        { id: 1, patient_name: 'Theo', patient_id: '157685934', birthdate: "01/09/2001" },
        { id: 2, patient_name: 'Lorry', patient_id: '946577235', birthdate: "26/05/1987" },
      ]
      break;
    case 'radiologist':
      rows = [
        { id: 1, patient_name: 'Theo', patient_id: '157685934', birthdate: "01/09/2001" },
        { id: 2, patient_name: 'Lorry', patient_id: '946577235', birthdate: "26/05/1987" },
      ]
      break;
    default:
      rows = [
        { id: 1, patient_name: 'Please go to "/login" and choose a role' },
      ]
  }

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

  return (
    <React.Fragment>
      <Container maxWidth="false" style={{ display: "flex", margin : 0, padding : 0, justifyContent: 'space-between' }}>
        
        <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main, width : "300px", marginTop : "auto" }} > {t('remote_aet')} </Typography>

        <FormControl className={classes.root} variant="filled"  style={{width : "300px"}}>
          <InputLabel shrink="true" id="aet" >AET</InputLabel>
          <Select
            labelId="aet"
            id="aet"
          //value={values.aet}
          //onChange={(e) => { setValues({ ...values, aet: e.target.value }) }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={10}>In Progress</MenuItem>
            <MenuItem value={20}>Download Locally</MenuItem>
            <MenuItem value={30}>Download Remotely</MenuItem>
            <MenuItem value={30}>Error</MenuItem>
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

      <CustomFilters {...priviledges} page="aet" />

      <CustomTable rows={rows} {...priviledges} page="aet" />

      <CustomButton {...priviledges} page="aet"/>
      
      <CustomStatusTable {...priviledges} page="aet"/>

    </React.Fragment>
  );
}