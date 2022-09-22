import {Button, Menu, MenuItem} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import * as React from "react";
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";

function PryButtonSelect({icon, label, options, handleAction, disabled, children}) {

    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        button: {
            backgroundColor: theme.palette.button.background + "!important"
        }
    }));

    const classes = useStyles(theme);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {
                options.length > 0 &&

                <>
                    <Button
                        variant="outlined"
                        size="medium"
                        className={classes.button}
                        onClick={handleClick}
                        disabled={disabled}
                    >
                        {icon}
                        {label}
                        <ArrowDropDownIcon/>
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
                            options.map((option) => (
                                <MenuItem key={option.name} onClick={() => {handleClose(); handleAction(option.name);}}>
                                    {option.label}
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </>
            }

            {
                /*options.length===1 &&

                <Button
                    key={options[0].name}
                    className={classes.button}
                    variant="outlined"
                    size="medium"
                    color="primary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleAction(options[0].name)}
                >
                    {options[0].label}
                </Button>*/
            }
        </>
    );
}

export default PryButtonSelect;