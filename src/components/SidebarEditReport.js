import React from 'react';
import "../translations/i18n";
import { useTranslation } from 'react-i18next';

import Dropdown from './Dropdown';


function SidebarEditReport (props)  {
    const { t } = useTranslation('common');

    const privileges = props.privileges;

    function goTo(location) {
        window.location.href = location;
    }          

    const [settingsOpen, setSettingsOpen] = React.useState("none");
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
    
    const showSettings = () => {
        if (isSettingsOpen === false) {
            setSettingsOpen("block")
        }else(
            setSettingsOpen("none")
        )
        setIsSettingsOpen(!isSettingsOpen);
    }

    const patientDropdown = [
        {
            label: "Patient Name",
            value: "Florianne Lefebvre"
        },
        {
            label: "Patient Birth date",
            value: "01/01/2000"
        },
        {
            label: "Patient Sex",
            value: "Female"
        },
        {
            label: "Patient Age",
            value: "20"
        },
        {
            label: "Patient ID",
            value: "123456789"
        }
    ]
    
    const studyDropdown = [
        {
            label: "Study date",
            value: "01/01/2000"
        },
        {
            label: "Study time",
            value: "12:00"
        },
        {
            label: "Study ID",
            value: "123456789"
        },
        {
            label: "Study description",
            value: "Study description"
        }
    ]

    const seriesDropdown = [
        {
            label: "Series date",
            value: "01/01/2000"
        },
        {
            label: "Series time",
            value: "12:00"
        },
        {
            label: "Series Description",
            value: "Series Description"
        },
        {
            label: "Series Number",
            value: "1"
        },
        {
            label: "Series Instance UID",
            value: "UID"
        }
    ]

    const physicianDropdown = []

    const institutionDropdown = [
        {
            label: "Company Name",
            value: "Company Name"
        },
        {
            label: "Company Address",
            value: "Company Address"
        },
        {
            label: "Company Phone",
            value: "Company Phone"
        },
        {
            label: "Company Email",
            value: "Company Email"
        },
        {
            label: "Company Website",
            value: "Company Website"
        },
        {
            label: "Company ZIP",
            value: "Company ZIP"
        }
    ]

    const modalityDropdown = [
        {
            label: "Modality",
            value: "Modality"
        }
    ]

    const additionalDropdown = []
        




    return (
        <div className="h-full w-64 md:w-20 lg:w-64 py-6 mr-4 rounded-md border border-gray-150 flex-col items-center hidden desktop:flex">
            <h1 className='text-primary text-lg font-medium mb-4'>Report Editor</h1>
            <h1 className='bg-transparent text-sm font-medium text-gray-600 dark:text-gray-200'>Version :
                <select name="" id="" defaultValue={1} className='bg-[#f1f5f9] dark:bg-primary rounded-2xl text-sm  text-gray-400 dark:text-gray-200 mb-4 ml-2 cursor-pointer pl-2'>
                    <option value="1" >V.1.57.4</option>
                    <option value="2">V.1.57.5</option>
                    <option value="3">V.1.57.6</option>
                </select>
            </h1>
            <div className="w-4/5 border-t border-gray-200 mb-8"></div>
            <div className="h-full w-full flex flex-col px-3 overflow-y-auto ">

                
                
                <Dropdown title='Patient' icon='fi fi-rr-user' addTextOnReportEdit={props.addTextOnReportEdit} data={patientDropdown}></Dropdown>
                <Dropdown title='Study' icon='fi fi-rr-book-alt' addTextOnReportEdit={props.addTextOnReportEdit} data={studyDropdown}></Dropdown>
                <Dropdown title='Series' icon='fi fi-rr-folder' addTextOnReportEdit={props.addTextOnReportEdit} data={seriesDropdown}></Dropdown>
                <Dropdown title='Physician' icon='fi fi-rr-stethoscope'  addTextOnReportEdit={props.addTextOnReportEdit} data={physicianDropdown}></Dropdown>
                <Dropdown title='Institution' icon='fi fi-rr-building' addTextOnReportEdit={props.addTextOnReportEdit} data={institutionDropdown}></Dropdown>
                <Dropdown title='Modality' icon='fi fi-rr-pulse' addTextOnReportEdit={props.addTextOnReportEdit} data={modalityDropdown}></Dropdown>
                <Dropdown title='Additional' icon='fi fi-rr-add' addTextOnReportEdit={props.addTextOnReportEdit} data={additionalDropdown}></Dropdown>
               


            </div>
        </div>
    );
};

export default SidebarEditReport;