import * as React from 'react';
import {MenuItem, Select} from "@mui/material";
import AETService from "../../services/api/aet.service";

const QueryAETSelect = (props) => {

    const [aets, setAets] = React.useState([]);
    const loadAETs = async() => {
        //Load aet list
        const response = await AETService.search(true, false, false);
        if (response.error) {
            console.log(response.error);
            return;
        }

        Object.keys(response.items).map((row, i) => {
            aets.push(response.items[row]);
        })
        setAets([...aets], aets)
    }
    React.useEffect(() => {
        loadAETs()
    }, []);

    return (
        <Select
            labelId="aet"
            id="aet"
            value={props.currentAet}
            onChange={(e) => { props.setCurrentAET(e.target.value) }}
        >

            {aets &&
            aets.map((aet) => (
                <MenuItem
                    key={aet.key}
                    value={aet.title}
                >
                    {aet.description}
                </MenuItem>
            ))}

        </Select>
    )
}

export default QueryAETSelect;