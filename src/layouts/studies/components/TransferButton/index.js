import * as React from 'react';
import TransferService from "../../../../services/api/transfer.service";
import PryButtonSelect from "../../../../components/PryTable/PryButtonSelect";
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

/** Translation */
import { useTranslation } from 'react-i18next';

const Index = (props) => {
    const { t } = useTranslation('common');

    const [options, setOptions] = React.useState([]);
    const loadRemoteSites = async() => {
        //Load aet list
        const response = await TransferService.getRemoteSites();
        if (response.error) {
            console.log(response.error);
            return;
        }

        const items = Object.keys(response.items).map((key, i) => ({
            name: key,
            label: response.items[key]
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
            icon={<ConnectingAirportsIcon fontSize="small" />}
            label={t('buttons.transfer')}
            options={options}
            handleAction={handleTransfer}
            disabled={props.actionDisabled}
        />
    )
}

export default Index;