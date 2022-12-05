import * as React from 'react';
import PryButtonSelect from "../../../../components/PryTable/PryButtonSelect";
import DownloadIcon from '@mui/icons-material/Download';

/** Translation */
import { useTranslation } from 'react-i18next';

const Index = (props) => {
    const { t } = useTranslation('common');

    const options = [
        {
            name: 'jpg',
            label: t("buttons.download_jpeg")
        },
        {
            name: 'jpg-overlay',
            label: t("buttons.download_jpeg_overlay")
        },
        {
            name: 'dcm',
            label: t("buttons.download_dicom")
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