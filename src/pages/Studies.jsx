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

    const [rows, setRows] = useState([])

    const searchStudies = async(values) => {
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
    }

    return (
        <React.Fragment>
            <Typography variant="h4"
                        style={{textAlign: 'left', color: theme.palette.primary.main}}> {t('studies')} </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>

            <CustomFilters {...priviledges} searchFunction={searchStudies} page="studies"/>

            <CustomTable rows={rows} {...priviledges} page="studies" key={rows} handleOpenDialogStudy={handleDialogStudyOpen} handleOpenDialogPermissions={handleDialogPermissionsOpen}/>

            <CustomButton {...priviledges} page="studies"/>

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