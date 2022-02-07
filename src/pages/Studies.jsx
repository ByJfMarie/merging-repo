import React, {useState} from 'react';
import {Divider, Typography, Button} from "@mui/material";
import {useTheme} from '@emotion/react';
import t from "../services/Translation";
import CustomTable from '../components/CustomTable';
import CustomFilters from '../components/CustomFilters';
import CustomButton from '../components/CustomButton';

import StudiesService from '../services/api/studies.service';
import AuthService from "../services/api/auth.service";

export default function Studies() {

    const priviledges = AuthService.getCurrentUser().priviledges;

    /** THEME */
    const theme = useTheme();

    const [rows, setRows] = useState([])

    const searchStudies = async e => {
        /** RESET RESULT */
        const rows = []

        const response = await StudiesService.searchStudies({});
        if (response.error) {
            console.log(response.error);
            //window.location.href = "/login";
            return;
        }

        Object.keys(response.items).map((row, i) => {
            rows.push({
                id: response.items[row].key,
                study: response.items[row].st_accession_number,
                patient_name: response.items[row].p_name,
                report: 'PDF',
                permission: 'perm'
            })
        })
        setRows([...rows], rows)
    }

    /** TABLE CONTENT */
    // var rows;
    // switch (localStorage.getItem('userRole')) {
    //   case 'administrator':
    //     rows = [
    //       { id: 1, patient_id: '157685934', patient_name: 'Theo Langlois', report: 'PDF', permission: 'perm' },
    //       { id: 2, patient_id: '946577235', patient_name: 'Lorry Kiavué', report: 'PDF', permission: 'perm' },
    //     ]
    //     break;
    //   case 'patient':
    //     rows = [
    //       { id: 1, acc_num: '01125545', date: '01/09/2021', description: "Shoulder", modality: 'DX', facility: 'Perennity Hospital', report: 'PDF' },
    //       { id: 2, acc_num: '15454823', date: '27/05/2020', description: "Crane", modality: 'MRI', facility: 'Perennity Hospital', report: 'PDF' },
    //     ]
    //     break;
    //   case 'doctor':
    //     rows = [
    //       { id: 1, patient_name: 'Theo', patient_id: '157685934', birthdate: "01/09/2001" },
    //       { id: 2, patient_name: 'Lorry', patient_id: '946577235', birthdate: "26/05/1987" },
    //     ]
    //     break;
    //   case 'radiologist':
    //     rows = [
    //       { id: 1, patient_name: 'Theo', patient_id: '157685934', birthdate: "01/09/2001" },
    //       { id: 2, patient_name: 'Lorry', patient_id: '946577235', birthdate: "26/05/1987" },
    //     ]
    //     break;
    //   default:
    //     rows = [
    //       { id: 1, patient_name: 'Please go to "/login" and choose a role' },
    //     ]
    // }

    return (
        <React.Fragment>
            <Typography variant="h4"
                        style={{textAlign: 'left', color: theme.palette.primary.main}}> {t('studies')} </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <CustomFilters {...priviledges} page="studies"/>

            <Button onClick={searchStudies} variant="contained" color="error">SEARCH TEST</Button>

            <CustomTable rows={rows} {...priviledges} page="studies" key={rows}/>

            <CustomButton {...priviledges} page="studies"/>

        </React.Fragment>
    );
}