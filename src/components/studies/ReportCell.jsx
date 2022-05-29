import * as React from 'react';
import {IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import StudiesService from "../../services/api/studies.service";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";

const ReportCell = (props) => {

    const [reports, setReports] = useState({})

    const loadReports = async (study_uid) => {
        const response = await StudiesService.getReports(study_uid);

        if (response.error) {
            console.log(response.error);
            //window.location.href = "/login";
            return;
        }

        setReports(response.items);
    }

    const handleDownloadReport = async (key) => {
        const rsp = await StudiesService.openReport(key);
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
    }

    useEffect(() => {
        loadReports(props.study_uid);
    }, [props]);

    return (
            Object.values(reports).map((report) => {
                return (<IconButton key={report.key} onClick={() => handleDownloadReport(report.key)}><PictureAsPdfRoundedIcon fontSize="small"/></IconButton>);
            })
    )
}

export default ReportCell;