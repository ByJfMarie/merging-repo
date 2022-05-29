import * as React from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import t from "../../services/Translation";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TransferService from "../../services/api/transfer.service";

const TransferButton = (props) => {

    const theme = useTheme();
    const useStyles = makeStyles({
        buttonForward: {
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

    const [remoteSites, setRemoteSites] = React.useState([]);
    const loadRemoteSites = async() => {
        //Load aet list
        const response = await TransferService.getRemoteSites();
        if (response.error) {
            console.log(response.error);
            return;
        }

        setRemoteSites(Object.entries(response.items));
    }

    const handleTransfer = async (site) => {
        props.transferFunction(site);
        setAnchorEl(null);
    }

    React.useEffect(() => {
        loadRemoteSites()
    }, []);

    return (
        <>
            {remoteSites.length > 1 &&
                <>
                    <Button variant="outlined" size="medium" className={classes.buttonForward} onClick={handleClick}>
                        {t('transfer')}
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
                            remoteSites.map(([key, value]) => {
                                return (<MenuItem key={key} onClick={() => {handleTransfer(key)}}>{value}</MenuItem>);
                            })
                        }

                    </Menu>
                </>
            }

            {remoteSites.length===1 &&
                <>
                    <Button
                        key={remoteSites[0].key}
                        className={classes.buttonForward}
                        variant="outlined"
                        size="medium"
                        color="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {handleTransfer(remoteSites[0].key)}}
                    >
                        {t('transfer')}
                    </Button>
                </>
            }
        </>



    )
}

export default TransferButton;