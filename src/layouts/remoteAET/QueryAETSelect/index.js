import * as React from 'react';
import {MenuItem, Select} from "@mui/material";
import AETService from "../../../services/api/aet.service";

const Index = (props) => {

    const [aets, setAets] = React.useState([]);
    const loadAETs = async() => {
        //Load aet list
        const response = await AETService.search(props.queryRetrieve || false, props.store || false, props.forward || false);
        if (response.error) {
            console.log(response.error);
            return;
        }

        setAets(response.items);

        //Select first aet
        if (response.items.length>=1) {
            props.setCurrentAET(response.items[0].title);
        }
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

export default Index;