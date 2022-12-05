import React, {useContext} from 'react';
import { Link, NavLink } from "react-router-dom";
import "../translations/i18n";
import { useTranslation } from 'react-i18next';

const Dropdown = (props) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [Display, setDisplay] = React.useState("none");
    const { t } = useTranslation('common');

    const showDropdown = () => {
        if (isOpen === false) {
            setDisplay("block")
        }else(
            setDisplay("none")
        )
        setIsOpen(!isOpen);
    }

    const data = props.data;

    return (
        <div>
            <div onClick={() => {showDropdown()}} className="flex items-center text-gray-800 justify-start px-4 py-3 group-hover:text-primary cursor-pointer group dark:text-gray-200 dark:hover:text-primary" exact activeClassName='bg-primary   dark:text-white dark:hover:text-white text-white rounded-md'>
                {/* <img src="/images/sidebar/studies.png" alt="" className="w-6 h-6 mr-4" /> */}
                <i  className={props.icon + " text-xl  mr-4 w-6 h-6"}></i>
                <h1 className="text-center font-montserrat  font-semibold text-sm  lg:text-[13px] ">{props.title}</h1>
            </div>
            

            <div style={{display : `${Display}`}} id='settingsMenu'>

                <div className="flex flex-col items-start pl-6 my-2 overflow-hidden" id='settingsMenu' >
                    {data.map((item, index) => (
                        <button onClick={() => {props.addTextOnReportEdit(item.value)}} className="border-l border-gray-200 pl-3 flex items-center text-gray-600 justify-start py-3  cursor-pointer group dark:text-gray-400" exact activeClassName='text-[#2db4eb] dark:text-[#2db4eb]'>
                            <h1 className="text-center font-montserrat   text-sm lg:text-[12px] group-hover:text-primary">{item.label}</h1>
                        </button>   
                    ))}
                    
                </div>
                
            </div>
            
        </div>
    );
};

export default Dropdown;