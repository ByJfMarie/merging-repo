import * as React from 'react';
import t from "../../../../services/Translation";
import AETService from "../../../../services/api/aet.service";
import PryButtonSelect from "../../../../components/PryTable/PryButtonSelect";

const Index = (props) => {

    const [options, setOptions] = React.useState([]);
    const loadAETs = async() => {
        //Load aet list
        const response = await AETService.search(false, false, true);
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

    const handleForward = async (move_aet) => {
        props.forwardFunction(move_aet);
    }

    React.useEffect(() => {
        loadAETs()
    }, []);

    return (
        <PryButtonSelect
            label={t('forward')}
            options={options}
            handleAction={handleForward}
        />
    )
}

export default Index;