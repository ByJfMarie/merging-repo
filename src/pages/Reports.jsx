import React from 'react';

/** Translation */
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import "../translations/i18n";
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Typography, Divider,Button } from '@mui/material';
import {useTheme} from '@emotion/react';
import { Link } from 'react-router-dom';

const Reports = () => {
    const { t } = useTranslation('common');

    const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

    let { studyId } = useParams();

    const EditorComponent = () => <Editor />
    const theme = useTheme();

    return (
        <div>
            <Typography variant="h4"
                        style={{textAlign: 'left', color: theme.palette.primary.main}}> {t('reports.title')} </Typography>
            <Divider style={{marginBottom: theme.spacing(2)}}/>
            <div className="w-full py-2">

                <button>
                    <Link to={'/editReports/grosfp'} className='flex items-center px-4 py-2 shadow bg-primary text-white font-montserrat font-medium rounded-lg hover:brightness-95'>
                        <i class="fi fi-rr-plus mt-1 mr-2 text-sm"></i>
                        <h1 className='text-sm'>Add Report</h1>
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Reports;

