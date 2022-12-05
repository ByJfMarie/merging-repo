import * as React from 'react';
import PryButtonSelect from "../../../../components/PryTable/PryButtonSelect";
import DownloadIcon from '@mui/icons-material/Download';

/** Translation */
import { useTranslation } from 'react-i18next';

const Index = (props) => {
    const { t } = useTranslation('local_studies');

    const options = [
        {
            name: 'jpg',
            label: t("table.actions.download.jpeg")
        },
        {
            name: 'jpg-overlay',
            label: t("table.actions.download.jpeg_overlay")
        },
        {
            name: 'dcm',
            label: t("table.actions.download.dicom")
        }
    ];

    const handleDownload = async (type) => {
        props.downloadFunction(type);
    }

    return (
        <PryButtonSelect
            icon={<DownloadIcon fontSize="small" />}
            label={t('table.actions.download.name')}
            options={options}
            handleAction={handleDownload}
            disabled={props.actionDisabled}
        />
    )
}

export default Index;