import * as React from 'react';
import AETService from "../../../services/api/aet.service";
import PryButtonSelect from "../../../components/PryTable/PryButtonSelect";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../translations/i18n";

const Index = (props) => {
    const { t } = useTranslation('common');

    const [options, setOptions] = React.useState([]);
    const loadAETs = async() => {
        //Load aet list
        const response = await AETService.search(false, true, false);
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
            label={t('buttons.retrieve')}
            options={options}
            handleAction={handleRetrieve}
            disabled={props.actionDisabled}
        />
    )
}

export default Index;