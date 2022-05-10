import React, {useState} from 'react';
import {Divider, Typography} from "@mui/material";
import {useTheme} from '@emotion/react';
import t from "../services/Translation";
import CustomTable from '../components/CustomTable';
import CustomFilters from '../components/CustomFilters';
import CustomButton from '../components/CustomButton';
import CustomDialogStudyInfo from '../components/CustomDialogStudyInfo';

import StudiesService from '../services/api/studies.service';
import AuthService from "../services/api/auth.service";
import CustomDialogAddPermission from "../components/CustomDialogAddPermission";

export default function Studies() {

    const priviledges = AuthService.getCurrentUser().priviledges;

    /** THEME */
    const theme = useTheme();

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

    const searchStudies = async(values) => {
        setFilters(values);

        /** RESET RESULT */
        const rows = []

        const response = await StudiesService.searchStudies(values);
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

    //Selection
    const [selectedRows, setSelectedRows] = useState([])
    const setTableSelection = (rows) => {
        setSelectedRows(rows);
    }

    // Manage Dialog Study Info
    const [dialogStudyOpen, setDialogStudyOpen] = React.useState(false)
    const [dialogStudy, setDialogStudy] = useState(null);
    const handleDialogStudyOpen = (study) => {
        setDialogStudyOpen(true)
        setDialogStudy(study)
    }
    const handleDialogStudyClose = () => {
        setDialogStudyOpen(false)
        setDialogStudy(null)
    }

    //Login Sheet
    const handleActionLoginSheet = async (key) => {
        const rsp = await StudiesService.openLoginSheet(key);
        if (rsp && rsp.data && rsp.data.size) {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [rsp.data],
                {type: 'application/pdf'});

            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);

            //Open the URL on new Window
            window.open(fileURL);
        }
    };

    // Manage Dialog Add Permission
    const [dialogPermissionsOpen, setDialogPermissionsOpen] = React.useState(false)
    const [dialogPermissions, setDialogPermissions] = useState(null);
    const handleDialogPermissionsOpen = (study) => {
        setDialogPermissionsOpen(true)
        setDialogPermissions(study)
    }
    const handleDialogPermissionsClose = () => {
        setDialogPermissionsOpen(false)
        setDialogPermissions(null)
        searchStudies(filters);
    }

    return (
        <React.Fragment>
            <Typography variant="h4"
                        style={{textAlign: 'left', color: theme.palette.primary.main}}> {t('studies')} </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <CustomFilters
                {...priviledges}
                initialValues={filtersInitValue}
                searchFunction={searchStudies}
                page="studies"
            />

            <CustomTable
                rows={rows}
                {...priviledges}
                page="studies"
                key={rows}
                selectionHandler={setTableSelection}
                handleOpenDialogStudy={handleDialogStudyOpen}
                handleLoginSheet={handleActionLoginSheet}
                handleOpenDialogPermissions={handleDialogPermissionsOpen}
            />

            <CustomButton
                {...priviledges}
                page="studies"
            />

            <CustomDialogStudyInfo
                open={dialogStudyOpen}
                handleOpenDialog={handleDialogStudyOpen}
                handleCloseDialog={handleDialogStudyClose}
                study={dialogStudy}
            />

            <CustomDialogAddPermission
                open={dialogPermissionsOpen}
                handleOpenDialog={handleDialogPermissionsOpen}
                handleCloseDialog={handleDialogPermissionsClose}
                study={dialogPermissions}
            />

        </React.Fragment>
    );
}