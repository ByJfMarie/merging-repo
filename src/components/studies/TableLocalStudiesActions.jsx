import * as React from 'react';
import { Button, Menu, MenuItem, Grid } from "@mui/material";
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import AuthService from "../../services/api/auth.service";
import DownloadButton from "./DownloadButton";
import ForwardButton from "./ForwardButton";

const TableLocalStudiesActions = (props) => {

    const priviledges = AuthService.getCurrentUser().priviledges;

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
                    {priviledges.privileges.pages[props.page].searchTable.actionsTable.includes('download') && (
                        <DownloadButton
                            key='download'
                            downloadFunction={props.downloadFunction}
                        />
                    )}
                </Grid>
                <Grid item sm={8} xs={12} className={classes.right} style={{ display: "flex" }} >
                    {  // eslint-disable-next-line 
                        priviledges.privileges.pages[props.page].searchTable.actionsTable.map((value, key) => {
                            if (value === "forward") {
                                return (
                                    <ForwardButton
                                        key={value}
                                        forwardFunction={props.forwardFunction}
                                    />
                                )
                            }
                            /*else if (value === "transfer") {
                                return (
                                    <Button
                                        key={value}
                                        className={classes.buttonMain}
                                        variant="outlined"
                                        size="medium"
                                        color="primary"
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => {props.transferFunction();}}
                                    >
                                        {t(value)}
                                    </Button>
                                )
                            }
                            else if (value === "media") {
                                return (
                                    <Button
                                        key={value}
                                        className={classes.buttonMain}
                                        variant="outlined"
                                        size="medium"
                                        color="primary"
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => {props.mediaFunction();}}
                                    >
                                        {t(value)}
                                    </Button>
                                )
                            }*/
                        })}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default TableLocalStudiesActions;