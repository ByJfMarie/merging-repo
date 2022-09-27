import * as React from 'react';
import {IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import StudiesService from "../../../../services/api/studies.service";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";

const Index = (props) => {

    const [reports, setReports] = useState({})

    const loadReports = async (study) => {
        if (study.storage_status==="offline") return;

        const response = await StudiesService.getReports(study.st_uid);
        if (response.error) {
            console.log(response.error);
            //window.location.href = "/login";
            return;
        }

        setReports(response.items);
    }

    const handleDownloadReport = async (path) => {
        const rsp = await StudiesService.openReport(path);
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
        loadReports(props.study);
    }, [props.study.st_uid]);

    return (
            Object.values(reports).map((report) => {
                return (<IconButton key={report.key} onClick={() => handleDownloadReport(report.path)}><PictureAsPdfRoundedIcon fontSize="small"/></IconButton>);
            })
    )
}

export default Index;