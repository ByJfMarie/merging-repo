import * as React from 'react';
import AETService from "../../../../services/api/aet.service";
import PryButtonSelect from "../../../../components/PryTable/PryButtonSelect";
import FastForwardIcon from '@mui/icons-material/FastForward';

/** Translation */
import { useTranslation } from 'react-i18next';

const Index = (props) => {
    const { t } = useTranslation('common');

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
            icon={<FastForwardIcon fontSize="small"/>}
            label={t('buttons.forward')}
            options={options}
            handleAction={handleForward}
            disabled={props.actionDisabled}
        />
    )
}

export default Index;