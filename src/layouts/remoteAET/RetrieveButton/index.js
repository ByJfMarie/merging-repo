import * as React from 'react';
import {MenuItem} from "@mui/material";
import t from "../../../services/Translation";
import AETService from "../../../services/api/aet.service";
import PryButtonSelect from "../../../components/PryTable/PryButtonSelect";

const Index = (props) => {

    const [options, setOptions] = React.useState([]);
    const loadAETs = async() => {
        //Load aet list
        const response = await AETService.search(true, false, false);
        if (response.error) {
            console.log(response.error);
            return;
        }

        const items = response.items.map(aet => ({
            name: aet.key,
            label: aet.description
        }));
        setOptions(items);
    }

    const handleRetrieve = async (move_aet) => {
        props.retrieveFunction(move_aet);
    }

    React.useEffect(() => {
        loadAETs()
    }, []);

    return (
        <PryButtonSelect
            label={t('retrieve')}
            options={options}
            handleAction={handleRetrieve}
        />
    )
}

export default Index;