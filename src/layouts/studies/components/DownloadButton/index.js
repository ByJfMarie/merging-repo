import * as React from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import t from "../../../../services/Translation";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PryButtonSelect from "../../../../components/PryTable/PryButtonSelect";

const Index = (props) => {

    const options = [
        {
            name: 'jpg',
            label: 'JPEG'
        },
        {
            name: 'jpg-overlay',
            label: 'JPEG Overlay'
        },
        {
            name: 'dcm',
            label: 'DICOM Files'
        }
    ];

    const handleDownload = async (type) => {
        props.downloadFunction(type);
    }

    return (
        <PryButtonSelect
            label={t('download')}
            options={options}
            handleAction={handleDownload}
        />
    )
}

export default Index;