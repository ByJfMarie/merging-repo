import * as React from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import t from "../../services/Translation";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
    buttonDownload: {
        backgroundColor: theme.palette.button.background + "!important"
    }
}));

const DownloadButton = (props) => {

    const theme = useTheme();
    const classes = useStyles(theme);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDownload = async (type) => {
        props.downloadFunction(type);
        setAnchorEl(null);
    }

    return (
            <>
                <Button variant="outlined" size="medium" className={classes.buttonDownload} onClick={handleClick}>
                    {t('download')}
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
                    <MenuItem onClick={() => {handleDownload("jpg");}}>JPEG</MenuItem>
                    <MenuItem onClick={() => {handleDownload("jpg-overlay");}}>JPEG Overlay</MenuItem>
                    <MenuItem onClick={() => {handleDownload("dcm");}}>DICOM Files</MenuItem>
                </Menu>
            </>
    )
}

export default DownloadButton;