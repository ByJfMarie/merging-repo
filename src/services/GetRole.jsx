import React, { useEffect } from 'react';
import privilegesAdmin from "../assets/json/privilegesAdmin.json";
import privilegesPatient from "../assets/json/privilegesPatient.json";
import privilegesDoctor from "../assets/json/privilegesDoctor.json";
import privilegesRadiologist from "../assets/json/privilegesRadiologist.json";

export default function GetRole() {
    const [privileges, setPrivileges] = React.useState();
    useEffect(() => {

        switch (localStorage.getItem('userRole')) {
            case 'admin':
                setPrivileges(privilegesAdmin)
                break;
            case 'patient':
                setPrivileges(privilegesPatient)
                break;
            case 'doctor':
                setPrivileges(privilegesDoctor)
                break;
            case 'radiologist':
                setPrivileges(privilegesRadiologist)
                break;
            default:
                setPrivileges(privilegesRadiologist)
        }
    }, []);

    return { 
        privileges
     }
}