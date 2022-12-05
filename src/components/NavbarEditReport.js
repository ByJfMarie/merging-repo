import React from 'react';
import AuthService from "../services/api/auth.service";
import "../translations/i18n";
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from "react-router-dom";
import StudiesService from '../services/api/studies.service';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';



const NavbarEditReport = (props) => {
    const { t } = useTranslation('common');
    const user = props.user;
 

    const UserName = function () {
        if (!user) return <>{"Hello"}</>;
        if (user.last_name) return <>{user.title}+" "+{user.last_name}+" "+{user.first_name}</>;
        return <>{user.first_name}</>;
    }

    const privileges = props.privileges;


    function goTo(location) {
        window.location.href = location;
    }

    const [settingsOpen, setSettingsOpen] = React.useState("none");
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState("none");
    const [openIcon, setOpenIcon] = React.useState("block");
    const [closeIcon, setCloseIcon] = React.useState("none");
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [easterEggOpen, setEasterEggOpen] = React.useState("none");
    const [easterEggClose, setEasterEggClose] = React.useState("block");

    const [clickOnBackground, setClickOnBackground] = React.useState(0);
    const [clickOnText, setClickOnText] = React.useState(0);

const showMenu = () => {
    if (isMenuOpen === false) {
        setMenuOpen("block");
        setOpenIcon("none");
        setCloseIcon("block");
    } else {
        setMenuOpen("none");
        setOpenIcon("block");
        setCloseIcon("none");
    }
    setIsMenuOpen(!isMenuOpen);
}

const showEasterEgg = () => {
    if (easterEggOpen === "none") {
        setEasterEggOpen("block");
        setEasterEggClose("none");
    } else {
        setEasterEggOpen("none");
        setEasterEggClose("block");
    }
}

const clickedOnBackground = (item) => {
    console.log(item);
    if(item === "back"){
        setClickOnBackground(clickOnBackground + 1);
    }else{
        setClickOnText(clickOnText + 1);
    }

    if (clickOnBackground === 6 && clickOnText === 2) {
        showEasterEgg();
    }
}


    const showSettings = () => {
        if (isSettingsOpen === false) {
            setSettingsOpen("block");
            
        } else {
            setSettingsOpen("none");
            
        }
        setIsSettingsOpen(!isSettingsOpen);
    }

    const handleLogoutClick = () => {
        AuthService.logout();
    };

    const getEasterImage = () => {

        var date = new Date();
        var month = date.getMonth();

        switch (month) {
            case 0:
                return "/images/easterEgg/January.png";
            case 1:
                return "/images/easterEgg/February.png";
            case 2:
                return "/images/easterEgg/Flag.png";
            case 3:
                return "/images/easterEgg/April.png";
            case 4:
                return "/images/easterEgg/Flag.png";
            case 5:
                return "/images/easterEgg/Flag.png";
            case 6:
                return "/images/easterEgg/Summer.png";
            case 7:
                return "/images/easterEgg/Summer.png";
            case 8:
                return "/images/easterEgg/Flag.png";
            case 9:
                return "/images/easterEgg/October.png";
            case 10:
                return "/images/easterEgg/Flag.png";
            case 11:
                return "/images/easterEgg/December.png";
            default:
                return "/images/easterEgg/Flag.png";
        }

    }

    const saveReport = () => {
        console.log(props.contentState);
        const response = StudiesService.saveReport('12345', '6789', JSON.stringify(convertToRaw(props.contentState)));
        console.log(response);
    }

    return (
        <div>
            <div className="w-full bottom-1 bg-white flex items-center justify-between rounded shadow py-4 px-8 dark:bg-[#0e1627]" onClick={() => {clickedOnBackground("back")}}>
                {/* <select name="" id="" defaultValue={1} className='bg-transparent text-base text-gray-800'>
                    <option value="1" >V.1.57.4</option>
                    <option value="2">V.1.57.5</option>
                    <option value="3">V.1.57.6</option>
                </select> */}
                <img src="/Perennity.png" alt="" className="h-8 md:h-5" />
                <h1 className='text-primary font-montserrat font-medium text-xl hidden desktop:block dark:text-primary capitalize ' onClick={() => {clickedOnBackground("text")}}>Report Cancer Mme.Delarue</h1>
                
                <div className="">
                    <button className='rounded-md border border-primary text-primary  px-3 py-1 text font-medium mr-2' onClick={() => {window.close()}}>Cancel</button>
                    <button className='rounded-md  border bg-primary border-primary text-white px-3 py-1 text font-medium' onClick={() => {saveReport()}}>Save</button>
                </div>

            </div>

            <div style={{ display: `${menuOpen}` }}  className="w-full bottom-1 bg-white rounded shadow py-4 px-8 mt-1 dark:bg-[#0e1627] ">
                <NavLink to={'/studies'} className="flex items-center text-gray-800 justify-start px-4 py-3  cursor-pointer group hover:text-primary dark:text-gray-300 " exact activeClassName='bg-primary text-white rounded-md hover:text-white' >
                    {/* <img src="/images/sidebar/studies.png" alt="" className="w-6 h-6 mr-4" /> */}
                    <i class="fi fi-rr-book-alt text-xl mr-4 w-6 dark:text-gray-300 "></i>
                    <h1 className="text-center font-montserrat  font-semibold text-sm desktop:text-[11px] ">{t('titles.studies')}</h1>
                </NavLink>
                <NavLink to={'/aet'} className="flex items-center justify-start px-4 py-3 cursor-pointer group text-gray-800 dark:text-gray-300" exact activeClassName='bg-primary text-white rounded-md'>
                    {/* <img src="/images/sidebar/servers.png" alt="" className="w-5 h-5 mr-4" /> */}
                    <i class="fi fi-rr-database text-xl mr-4 w-6 h-6 group-hover:text-primary"></i>
                    <h1 className="text-center font-montserrat  font-semibold text-sm  desktop:text-[11px]  group-hover:text-primary">{t('titles.remote_aet')}</h1>
                </NavLink>
                <NavLink to={'/forwarding'} className="flex items-center text-gray-800 justify-start px-4 py-3 dark:text-gray-300 cursor-pointer group" exact activeClassName='bg-primary text-white rounded-md' >
                    {/* <img src="/images/sidebar/forward.png" alt="" className="w-5 h-5 mr-4" /> */}
                    <i class="fi fi-rr-forward text-xl  mr-4 w-6 h-6 group-hover:text-primary"></i>
                    <h1 className="text-center font-montserrat  font-semibold text-sm  desktop:text-[11px]  group-hover:text-primary">{t('titles.forwarding')}</h1>
                </NavLink>
                <NavLink to={'/transfer'} className="flex items-center justify-start text-gray-800 px-4 py-3   dark:text-gray-300 cursor-pointer group" exact activeClassName='bg-primary text-white rounded-md'>
                    {/* <img src="/images/sidebar/transfer.png" alt="" className="w-5 h-5 mr-4" /> */}
                    <i class="fi fi-rr-data-transfer text-xl mr-4 w-6 h-6 group-hover:text-primary"></i>
                    <h1 className="text-center font-montserrat  font-semibold text-sm  desktop:text-[11px]  group-hover:text-primary">{t('titles.transfer')}</h1>
                </NavLink>
               
                <div className="divider w-full border-t border-gray-400 my-8"></div>
                <div onClick={() => { showSettings() }} className="flex items-center text-gray-800 justify-start px-4 py-3  cursor-pointer group dark:text-gray-300" exact activeClassName='bg-primary text-white rounded-md'>
                    {/* <img src="/images/sidebar/studies.png" alt="" className="w-6 h-6 mr-4" /> */}
                    <i class="fi fi-rr-settings-sliders text-xl  mr-4 w-6 h-6 group-hover:text-primary"></i>
                    <h1 className="text-center font-montserrat  font-semibold text-sm  desktop:text-[11px]  group-hover:text-primary">{t('menu.settings')}</h1>
                </div>
                <div style={{ display: `${settingsOpen}` }} id='settingsMenu'>

                    <div className="flex flex-col items-start pl-6 my-2 overflow-hidden" id='settingsMenu' >
                        <NavLink to={'/site'} className="border-l border-gray-200 pl-3 flex items-center text-gray-600 justify-start py-3  cursor-pointer group dark:text-gray-400" exact activeClassName='text-[#2db4eb]'>
                            <h1 className="text-center font-montserrat  font-semibold text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.site')}</h1>
                        </NavLink>
                        <NavLink to={'/users'} className="border-l border-gray-200 pl-3 flex items-center text-gray-600 justify-start py-3  cursor-pointer group dark:text-gray-400  " exact activeClassName='text-[#2db4eb]'>
                            <h1 className="text-center font-montserrat  font-semibold text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.users')}</h1>
                        </NavLink>
                        <NavLink to={'/roles'} className="border-l border-gray-200 pl-3 flex items-center text-gray-600 justify-start py-3  cursor-pointer group  dark:text-gray-400 " exact activeClassName='text-[#2db4eb]'>
                            <h1 className="text-center font-montserrat  font-semibold text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.roles_perm')}</h1>
                        </NavLink>
                        <NavLink to={'/emailing'} className="border-l border-gray-200 pl-3 flex items-center text-gray-600 justify-start py-3  cursor-pointer group  dark:text-gray-400" exact activeClassName='text-[#2db4eb]'>
                            <h1 className="text-center font-montserrat  font-semibold text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.emailing')}</h1>
                        </NavLink>
                        <NavLink to={'/system'} className="border-l border-gray-200 pl-3 flex items-center text-gray-600 justify-start py-3  cursor-pointer group  dark:text-gray-400 " exact activeClassName='text-[#2db4eb]'>
                            <h1 className="text-center font-montserrat  font-semibold text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.system')}</h1>
                        </NavLink>
                        <NavLink to={'/license'} className="border-l border-gray-200 pl-3 flex items-center text-gray-600 justify-start py-3  cursor-pointer group  dark:text-gray-400 " exact activeClassName='text-[#2db4eb]'>
                            <h1 className="text-center font-montserrat  font-semibold text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.license')}</h1>
                        </NavLink>
                    </div>

                </div>
                <NavLink to={'/logs'} className="flex items-center text-gray-800 justify-start px-4 py-3 cursor-pointer group dark:text-gray-300" exact activeClassName='bg-primary text-white rounded-md'>
                    {/* <img src="/images/sidebar/servers.png" alt="" className="w-5 h-5 mr-4" /> */}
                    <i class="fi fi-rr-document text-xl  mr-4 w-6 h-6 group-hover:text-primary"></i>
                    <h1 className="text-center font-montserrat  font-semibold text-sm  desktop:text-[11px]  group-hover:text-primary">Logs</h1>
                </NavLink>
            </div>
        </div>
    );
};

export default NavbarEditReport;