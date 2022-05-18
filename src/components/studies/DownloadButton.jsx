import * as React from 'react';
import {Button, Menu, MenuItem, Grid, IconButton} from "@mui/material";
import t from "../../services/Translation";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DownloadButton = (props) => {

    const theme = useTheme();
    const useStyles = makeStyles({
        buttonDownload: {
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
                    <MenuItem onClick={() => {props.downloadFunction("jpeg");}}>JPEG</MenuItem>
                    <MenuItem onClick={() => {props.downloadFunction("jpeg-overlay");}}>JPEG Overlay</MenuItem>
                    <MenuItem onClick={() => {props.downloadFunction("dicom");}}>DICOM Files</MenuItem>
                </Menu>
            </>
    )
}

export default DownloadButton;