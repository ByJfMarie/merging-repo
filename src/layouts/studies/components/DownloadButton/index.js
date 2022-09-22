import * as React from 'react';
import PryButtonSelect from "../../../../components/PryTable/PryButtonSelect";
import DownloadIcon from '@mui/icons-material/Download';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../../translations/i18n";

const Index = (props) => {
    const { t } = useTranslation('common');

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
            icon={<DownloadIcon fontSize="small" />}
            label={t('buttons.download')}
            options={options}
            handleAction={handleDownload}
            disabled={props.actionDisabled}
        />
    )
}

export default Index;