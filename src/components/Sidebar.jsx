import React, {useContext} from 'react';
import { Link, NavLink } from "react-router-dom";
import "../translations/i18n";
import { useTranslation } from 'react-i18next';

import AuthService from "../services/api/auth.service";
import UserContext from "./UserContext";
import UserStorage from "../services/storage/user.storage";



function Sidebar (props)  {
    const { t } = useTranslation('common');


    
    /** User & privileges */
    // const [privileges, setPrivileges] = React.useState();
    // setPrivileges(props.privileges);
    // console.log(props.privileges);
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


    // React.useEffect(() => {
    //     loadPrivileges();   
    // }, [])

    return (
        <div className="h-full w-64 md:w-20 lg:w-64 bg-white  py-6 mr-4 rounded-md shadow flex-col items-center hidden desktop:flex dark:bg-[#0e1627]">
            <img src="/Perennity.png" alt="" className="h-8 md:h-5" />
            <div className="h-full w-full flex flex-col px-3 pt-8">

                {/* Local Studies */}
                {privileges.pages.indexOf('studies') !== -1 && (
                    <NavLink to={'/studies'} className="flex items-center text-gray-800 justify-start px-4 py-3  cursor-pointer group hover:text-primary dark:text-gray-300 dark:hover:text-primary" exact activeClassName='bg-primary text-white dark:text-white dark:hover:text-white rounded-md hover:text-white' >
                        {/* <img src="/images/sidebar/studies.png" alt="" className="w-6 h-6 mr-4" /> */}
                        <i class="fi fi-rr-book-alt text-xl mr-4 w-6 h-6 "></i>
                        <h1 className="text-center font-montserrat  font-semibold text-sm lg:text-[13px] ">{t('titles.studies')}</h1>
                    </NavLink>
                )}
                
                {/* Remote Server */}
                {privileges.pages.indexOf('aet') !== -1 && (
                    <NavLink to={'/aet'} className="flex items-center justify-start px-4 py-3 cursor-pointer group hover:text-primary text-gray-800 dark:text-gray-200 dark:hover:text-primary" exact  activeClassName='bg-primary text-white rounded-md  dark:text-white dark:hover:text-white hover:text-white'>
                        {/* <img src="/images/sidebar/servers.png" alt="" className="w-5 h-5 mr-4" /> */}
                        <i class="fi fi-rr-database text-xl mr-4 w-6 h-6"></i>
                        <h1 className="text-center font-montserrat  font-semibold text-sm  lg:text-[13px]">{t('titles.remote_aet')}</h1>
                    </NavLink>
                )}

                {/* Forwarding */}
                {privileges.pages.indexOf('forwarding') !== -1 && (
                    <NavLink to={'/forwarding'} className="flex items-center text-gray-800 justify-start px-4 py-3   hover:text-primary cursor-pointer group dark:text-gray-200 dark:hover:text-primary"  exact activeClassName='bg-primary text-white   dark:text-white dark:hover:text-white rounded-md hover:text-white' >
                        {/* <img src="/images/sidebar/forward.png" alt="" className="w-5 h-5 mr-4" /> */}
                        <i class="fi fi-rr-forward text-xl  mr-4 w-6 h-6"></i>
                        <h1 className="text-center font-montserrat  font-semibold text-sm  lg:text-[13px] ">{t('titles.forwarding')}</h1>
                    </NavLink>
                )}

                {/* Transfer */}
                {privileges.pages.indexOf('transfer') !== -1 && (
                    <NavLink to={'/transfer'} className="flex items-center justify-start text-gray-800 px-4 py-3  group-hover:text-primary cursor-pointer group dark:text-gray-200 dark:hover:text-primary" exact activeClassName='bg-primary   dark:text-white dark:hover:text-white text-white rounded-md'>
                        {/* <img src="/images/sidebar/transfer.png" alt="" className="w-5 h-5 mr-4" /> */}
                        <i class="fi fi-rr-data-transfer text-xl mr-4 w-6 h-6"></i>
                        <h1 className="text-center font-montserrat  font-semibold text-sm  lg:text-[13px] ">{t('titles.transfer')}</h1>
                    </NavLink>
                )}

                <div className="divider w-full border-t border-gray-400 my-8"></div>
                
                {/* Settings */}
                {privileges.pages.indexOf('settings') !== -1 && (
                    <div onClick={() => {showSettings()}} className="flex items-center text-gray-800 justify-start px-4 py-3 group-hover:text-primary cursor-pointer group dark:text-gray-200 dark:hover:text-primary" exact activeClassName='bg-primary   dark:text-white dark:hover:text-white text-white rounded-md'>
                        {/* <img src="/images/sidebar/studies.png" alt="" className="w-6 h-6 mr-4" /> */}
                        <i class="fi fi-rr-settings-sliders text-xl  mr-4 w-6 h-6 "></i>
                        <h1 className="text-center font-montserrat  font-semibold text-sm  lg:text-[13px] ">{t('menu.settings')}</h1>
                    </div>
                )}

                <div style={{display : `${settingsOpen}`}} id='settingsMenu'>

                    <div className="flex flex-col items-start pl-6 my-2 overflow-hidden" id='settingsMenu' >
                        <NavLink to={'/site'} className=" flex items-center text-gray-600 h-10 justify-start  cursor-pointer group dark:text-gray-400" exact activeClassName='text-[#2db4eb] dark:text-[#2db4eb]'>
                            <div className="border-l border-gray-200 h-full w-1"></div>
                            <h1 className="text-center font-montserrat my-3 mx-2  text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.site')}</h1>
                        </NavLink>
                        <NavLink to={'/users'} className=" flex items-center text-gray-600 h-10 justify-start  cursor-pointer group dark:text-gray-400" exact activeClassName='text-[#2db4eb] dark:text-[#2db4eb]'>
                            <div className="border-l border-gray-200 h-full w-1"></div>
                            <h1 className="text-center font-montserrat my-3 mx-2  text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.users')}</h1>
                        </NavLink>
                        <NavLink to={'/roles'} className="flex items-center text-gray-600 h-10 justify-start  cursor-pointer group dark:text-gray-400" exact activeClassName='text-[#2db4eb] dark:text-[#2db4eb]'>
                            <div className="border-l border-gray-200 h-full w-1"></div>
                            <h1 className="text-center font-montserrat  my-3 mx-2  text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.roles_perm')}</h1>
                        </NavLink>
                        <NavLink to={'/emailing'} className="flex items-center text-gray-600 h-10 justify-start  cursor-pointer group dark:text-gray-400" exact activeClassName='text-[#2db4eb] dark:text-[#2db4eb]'>
                            <div className="border-l border-gray-200 h-full w-1"></div>
                            <h1 className="text-center font-montserrat my-3 mx-2   text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.emailing')}</h1>
                        </NavLink>
                        <NavLink to={'/system'} className=" flex items-center text-gray-600 h-10 justify-start  cursor-pointer group dark:text-gray-400" exact activeClassName='text-[#2db4eb] dark:text-[#2db4eb]'>
                            <div className="border-l border-gray-200 h-full w-1"></div>
                            <h1 className="text-center font-montserrat  my-3 mx-2  text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.system')}</h1>
                        </NavLink>
                        <NavLink to={'/license'} className="flex items-center text-gray-600 h-10 justify-start  cursor-pointer group dark:text-gray-400" exact activeClassName='text-[#2db4eb] dark:text-[#2db4eb]'>
                            <div className="border-l border-gray-200 h-full w-1"></div>
                            <h1 className="text-center font-montserrat  my-3 mx-2  text-sm lg:text-[12px] group-hover:text-primary">{t('menuSettings.license')}</h1>
                        </NavLink>
                    </div>
                </div>

                {/* Logs */}
                {privileges.pages.indexOf('logs') !== -1 && (
                    <NavLink to={'/logs'} className="flex items-center text-gray-800 justify-start px-4 py-3 cursor-pointer group dark:text-gray-200  group-hover:text-primary dark:hover:text-primary" exact activeClassName='bg-primary  dark:text-white dark:hover:text-white text-white rounded-md'>
                        {/* <img src="/images/sidebar/servers.png" alt="" className="w-5 h-5 mr-4" /> */}
                        <i class="fi fi-rr-document text-xl  mr-4 w-6 h-6"></i>
                        <h1 className="text-center font-montserrat  font-semibold text-sm  lg:text-[13px] ">Logs</h1>
                    </NavLink>
                )}

            </div>
            <h1 className='text-gray-600 md:text-xs md:text-center text-sm'>{t('menu.copyright')}</h1>
        </div>
    );
};

export default Sidebar;