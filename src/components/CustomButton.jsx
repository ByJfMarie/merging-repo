import * as React from 'react';
import { Button, Menu, MenuItem, Grid } from "@mui/material";
import t from "../services/Translation";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RetrieveButton from "./RetrieveButton";

const CustomButton = (props) => {

    /** STYLE AND CLASSES */
    const theme = useTheme();
    const useStyles = makeStyles({
        left: {
            [theme.breakpoints.down('sm')]: {
                justifyContent: "center"
            },
            [theme.breakpoints.up('sm')]: {
                justifyContent: "flex-start"
            },
        },

        right: {
            [theme.breakpoints.down('sm')]: {
                justifyContent: "center"
            },
            [theme.breakpoints.up('sm')]: {
                justifyContent: "flex-end"
            },
        },

        buttonMain: {
            backgroundColor: theme.palette.button.background + "!important"
        },
        buttonDownload: {
            [theme.breakpoints.down('sm')]: {
                display: "none !important"
            },
            backgroundColor: theme.palette.button.background + "!important"
        }
    });
    const classes = useStyles();

    /** DOWNLOAD BUTTON */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12} className={classes.left} style={{ display: "flex" }}>
                    {props.privileges.pages[props.page].searchTable.actionsTable.includes('download') && (
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
                                <MenuItem onClick={handleClose}>JPEG</MenuItem>
                                <MenuItem onClick={handleClose}>JPEG Overlay</MenuItem>
                                <MenuItem onClick={handleClose}>DICOM Files</MenuItem>
                            </Menu>
                        </>
                    )}
                </Grid>
                <Grid item sm={8} xs={12} className={classes.right} style={{ display: "flex" }} >
                    {  // eslint-disable-next-line 
                        props.privileges.pages[props.page].searchTable.actionsTable.map((value, key) => {
                            if (value === "retrieve") {
                                return (
                                    /*<Button
                                        key={value}
                                        className={classes.buttonMain}
                                        variant="outlined"
                                        size="medium"
                                        color="primary"
                                        style={{ marginLeft: "10px" }}
                                        onClick={props.retrieveFunction}
                                    >
                                        {t(value)}
                                    </Button>*/
                                    <RetrieveButton
                                        key={value}
                                        retrieveFunction={props.retrieveFunction}
                                    />
                                )
                            }
                            else if (value !== "download") {
                                return (
                                    <Button key={value} className={classes.buttonMain} variant="outlined" size="medium" color="primary" style={{ marginLeft: "10px" }}>
                                        {t(value)}
                                    </Button>)
                            }
                        })}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default CustomButton