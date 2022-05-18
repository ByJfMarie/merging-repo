import * as React from 'react';
import {Button, Menu, MenuItem, Grid, IconButton} from "@mui/material";
import t from "../../services/Translation";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AETService from "../../services/api/aet.service";

const ForwardButton = (props) => {

    const theme = useTheme();
    const useStyles = makeStyles({
        buttonForward: {
            [theme.breakpoints.down('sm')]: {
                display: "none !important"
            },
            backgroundColor: theme.palette.button.background + "!important"
        }
    });
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [aets, setAets] = React.useState([]);
    const loadAETs = async() => {
        //Load aet list
        const response = await AETService.search(false, false, true);
        if (response.error) {
            console.log(response.error);
            return;
        }

        Object.keys(response.items).map((row, i) => {
            aets.push(response.items[row]);
        })
        setAets([...aets], aets)
    }

    const handleForward = async (move_aet) => {
        props.forwardFunction(move_aet);
        setAnchorEl(null);
    }

    React.useEffect(() => {
        loadAETs()
    }, []);

    return (
        <>
            {aets.length > 1 &&
                <>
                    <Button variant="outlined" size="medium" className={classes.buttonForward} onClick={handleClick}>
                        {t('forward')}
                        <ArrowDropDownIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            aets.map((aet) => {
                                return (<MenuItem key={aet.key} onClick={() => {handleForward(aet.key)}}>{aet.description}</MenuItem>);
                            })
                        }

                    </Menu>
                </>
            }

            {aets.length==1 &&
                <>
                    <Button
                        key={aets[0].key}
                        className={classes.buttonForward}
                        variant="outlined"
                        size="medium"
                        color="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {handleForward(aets[0].key)}}
                    >
                        {t('forward')}
                    </Button>
                </>
            }
        </>



    )
}

export default ForwardButton;