import React from 'react';
import AuthService from "../services/api/auth.service";
import "../translations/i18n";
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
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

    console.log(getEasterImage());

    return (
        <div>
            <div className="w-full bottom-1 bg-white flex items-center justify-between rounded shadow py-4 px-8 dark:bg-[#0e1627]" onClick={() => {clickedOnBackground("back")}}>
                <h1 className='text-primary font-montserrat font-semibold text-lg hidden desktop:block dark:text-primary' onClick={() => {clickedOnBackground("text")}}> {t('navbar.mip')}</h1>
                <div style={{ display: `${openIcon}` }}  onClick={() => {showMenu()}}><i class="fi fi-sr-menu-burger block  desktop:hidden dark:text-gray-200"></i></div>
                <div style={{ display: `${closeIcon}` }}  onClick={() => {showMenu()}}><i class="fi fi-sr-cross block desktop:hidden dark:text-gray-200"></i></div>
                <div className="flex items-center">
                    <h1 className='font-montserrat text-sm text-gray-800 font-medium mr-4 dark:text-gray-200 hidden tablet:block'>{t('navbar.welcome')} <span className='font-bold text-primary'><UserName></UserName></span></h1>
                    <Link style={{ display: `${easterEggClose}` }} to={'/profile'}><i className="fi fi-rr-user mr-4 dark:text-gray-200 text-xl text-gray-800 hover:text-primary dark:hover:text-primary"></i></Link>
                    <Link style={{ display: `${easterEggOpen}` }} to={'/profile'}><img src={`${getEasterImage()}`} className="fi fi-tr-hockey-mask mr-4 w-6 dark:text-gray-200 text-xl text-gray-800 hover:text-primary dark:hover:text-primary" /></Link>
                    <i class="fi fi-rr-interrogation mr-4 dark:text-gray-200 text-xl text-gray-800 hover:text-primary dark:hover:text-primary cursor-pointer"></i>
                    <i  onClick={() => { handleLogoutClick() }} class="fi fi-rr-sign-out-alt cursor-pointer dark:text-gray-200 text-xl text-gray-800 hover:text-primary dark:hover:text-primary"></i>
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
                <NavLink to={'/logs'} className="flex items-center text-gray-800 justify-start px-4 py-3 cursor-pointer group dark:text-gray-300" exact activeClassName='bg-primary text-white rounded-md'>
                    {/* <img src="/images/sidebar/servers.png" alt="" className="w-5 h-5 mr-4" /> */}
                    <i class="fi fi-rr-document text-xl  mr-4 w-6 h-6 group-hover:text-primary"></i>
                    <h1 className="text-center font-montserrat  font-semibold text-sm  desktop:text-[11px]  group-hover:text-primary">Logs</h1>
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;