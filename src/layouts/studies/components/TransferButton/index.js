import * as React from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import t from "../../../../services/Translation";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TransferService from "../../../../services/api/transfer.service";
import PryButtonSelect from "../../../../components/PryTable/PryButtonSelect";

const Index = (props) => {

    const [options, setOptions] = React.useState([]);
    const loadRemoteSites = async() => {
        //Load aet list
        const response = await TransferService.getRemoteSites();
        if (response.error) {
            console.log(response.error);
            return;
        }

        const items = response.items.map(site => ({
            name: site.key,
            label: site.value
        }));
        setOptions(items);
    }

    const handleTransfer = async (site) => {
        props.transferFunction(site);
    }

    React.useEffect(() => {
        loadRemoteSites()
    }, []);

    return (
        <PryButtonSelect
            label={t('transfer')}
            options={options}
            handleAction={handleTransfer}
        />
    )
}

export default Index;