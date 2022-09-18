import * as React from 'react';
import { Button, Menu, MenuItem, Grid } from "@mui/material";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RetrieveButton from "./RetrieveButton";
import UserContext from "../../components/UserContext";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";

const TableRemoteStudiesActions = (props) => {
    const { t } = useTranslation('common');

    /** User & privileges */
    const { privileges } = React.useContext(UserContext);

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
        buttonRetrieve: {
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
                    {privileges.tables[props.page].actions.includes('download') && (
                        <>
                            <Button
                                variant="outlined"
                                size="medium"
                                className={classes.buttonRetrieve}
                                onClick={handleClick}
                                disabled={props.actionDisabled}
                            >
                                {t('buttons.download')}
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
                        privileges.tables[props.page].actions.map((value, key) => {
                            if (value === "retrieve") {
                                return (
                                    <RetrieveButton
                                        key={"buttons."+value}
                                        retrieveFunction={props.retrieveFunction}
                                        actionDisabled={props.actionDisabled}
                                    />
                                )
                            }
                            else if (value !== "download") {
                                return (
                                    <Button
                                        key={value}
                                        className={classes.buttonMain}
                                        variant="outlined"
                                        size="medium"
                                        color="primary"
                                        style={{ marginLeft: "10px" }}
                                        disabled={props.actionDisabled}
                                    >
                                        {t("buttons."+value)}
                                    </Button>)
                            }
                        })}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default TableRemoteStudiesActions